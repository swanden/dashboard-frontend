<template>
  <v-container>
    <v-row>
      <v-col align="center">

        <v-card
          elevation="2"
        >
          <!--          <v-card-title>Profile</v-card-title>-->
          <v-toolbar
            color="primary"
            dark
            dense
            flat
          >
            <v-toolbar-title class="text-body-2">
              Profile
            </v-toolbar-title>
          </v-toolbar>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <th>Name</th>
                <td>
                  {{ name }}
                  <v-btn
                    class="ma-2"
                    small
                    outlined
                    color="primary"
                    @click="dialog = !dialog"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{{ created }}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>
                  <RoleBadge
                    :role="role"
                  ></RoleBadge>
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  <StatusBadge
                    :status="status"
                  ></StatusBadge>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>


        <v-dialog
          v-model="dialog"
          persistent
          max-width="300px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Name</span>
            </v-card-title>

            <v-form v-model="valid" ref="form" @submit.prevent="changeName">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Firstname*"
                        v-model="form.first"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        label="Lastname*"
                        v-model="form.last"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid"
                  type="submit"
                >
                  Save
                </v-btn>

                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-form>

          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/axios';
import notification from '@/mixins/notification';
import StatusBadge from "@/components/users/StatusBadge";
import RoleBadge from "@/components/users/RoleBadge";

export default {
  name: "Profile",
  components: {
    StatusBadge,
    RoleBadge
  },
  mixins: [notification],
  data: () => ({
    dialog: false,
    valid: false,
    form: {
      first: '',
      last: ''
    },
    rules: {
      required: value => !!value || 'Required.',
    },
    first: '',
    last: '',
    email: '',
    created: '',
    role: '',
    status: '',
  }),
  async mounted() {
    try {
      const data = await axios.get('/profile');

      if (!data) {
        return;
      }

      this.email = data.email;
      this.first = data.first;
      this.form.first = data.first;
      this.form.last = data.last;
      this.last = data.last;
      this.created = data.created;
      this.role = data.role;
      this.status = data.status;
    } catch (error) {
      this.showError(error);
    }
  },
  computed: {
    name() {
      return `${this.first} ${this.last}`;
    }
  },
  methods: {
    async changeName() {
      try {
        await axios.post('/profile/name', {
          first: this.form.first,
          last: this.form.last
        });

        this.first = this.form.first;
        this.last = this.form.last;

        this.dialog = !this.dialog;
      } catch(error) {
        this.showError(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
