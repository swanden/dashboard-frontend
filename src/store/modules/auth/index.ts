import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { AuthState, User, UserData } from "@/store/modules/auth/types";
import { RootState } from '@/store/types';
import axios from "@/axios";

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const state: AuthState = {
    user: JSON.parse(<string>localStorage.getItem('user')),
    email: JSON.parse(<string>localStorage.getItem('email'))
};

const getters: GetterTree<AuthState, RootState> = {
    isLoggedIn(state): boolean {
        return !!state.user;
    },
    getEmail(state): string|undefined|null {
        return state.email;
    },
    isAdmin(state): boolean {
        return !!state?.user?.roles?.includes('ROLE_ADMIN');
    }
};

const mutations: MutationTree<AuthState> = {
    login(state, user: User): void {
        state.user = user;
    },
    logout(state): void {
        state.user = null;
    },
    setEmail(state, email: string): void {
        state.email = email;
    }
};

const actions: ActionTree<AuthState, RootState> = {
    async login(context, data: UserData) {
        context.commit('logout');

        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
        params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
        params.append('username', data.username);
        params.append('password', data.password);

        try {
            const user: User = await axios.post('/token', params, config);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
            user.roles = await axios.get('/profile/role');
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('email', JSON.stringify(data.username));
            context.commit('login', user);
            context.commit('setEmail', data.username);

            return user;
        } catch (error) {
            context.commit('logout');
            context.commit('setEmail', null);
            localStorage.removeItem('user');
            localStorage.removeItem('email');

            return Promise.reject(error);
        }
    },
    async logout(context) {
        context.commit('logout');
        context.commit('setEmail', null);
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        delete axios.defaults.headers.common['Authorization'];

        return Promise.resolve();
    },
    async refresh(context) {
        if (context.state.user) {
            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('client_id', process.env.VUE_APP_OAUTH_CLIENT);
            params.append('client_secret', process.env.VUE_APP_OAUTH_SECRET);
            params.append('refresh_token', context.state.user.refresh_token);

            delete axios.defaults.headers.common['Authorization'];

            try {
                const user: User = await axios.post('/token', params, config);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
                user.roles = await axios.get('/profile/role');
                localStorage.setItem('user', JSON.stringify(user));
                context.commit('login', user);

                return user;
            } catch (error) {
                await context.dispatch('logout');

                return Promise.reject(error);
            }
        }

        return Promise.resolve();
    }
};

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};


