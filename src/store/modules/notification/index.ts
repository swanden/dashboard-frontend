import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {NotificationData, NotificationState, SnackBarType} from "@/store/modules/notification/types";
import {RootState} from '@/store/types';

export const snackbarTimeout = 5000;

const state: NotificationState = {
    isShowSnackbar: false,
    snackbarText: '',
    snackbarType: SnackBarType.INFO,
    snackbarTimeout: snackbarTimeout,
    snackbarProps: {
        info: {
            btnColor: 'white',
            snackbarColor: ''
        },
        success: {
            btnColor: 'white',
            snackbarColor: 'success'
        },
        error: {
            btnColor: 'white',
            snackbarColor: 'error'
        },
    }
};

const getters: GetterTree<NotificationState, RootState> = {
    isShowSnackbar(state) {
        return state.isShowSnackbar;
    },
    snackbarText(state) {
        return state.snackbarText;
    },
    snackbarType(state) {
        return state.snackbarType;
    },
    snackbarProps(state) {
        return state.snackbarProps;
    },
    snackbarTimeout(state) {
        return state.snackbarTimeout;
    }
};

const mutations: MutationTree<NotificationState> = {
    setIsShowSnackBar(state, value: boolean) {
        state.isShowSnackbar = value;
    },
    showNotification(state, data: NotificationData) {
        state.snackbarType = data.type;
        state.snackbarText = data.msg;
        state.snackbarTimeout = data.timeout || snackbarTimeout;
        state.isShowSnackbar = true;
    }
};

const actions: ActionTree<NotificationState, RootState> = {
    setIsShowSnackBar(store, value: boolean) {
        store.commit('setIsShowSnackBar', value);
    },
    showNotification(store, data: NotificationData) {
        store.commit('showNotification', data);
    }
};

export const notification: Module<NotificationState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};