<template>
  <v-container>
    <v-row>
      <v-col align="center">

        <v-data-table
          :headers="headers"
          :items="users"
          sort-by="calories"
          class="elevation-2"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Users</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    New User
                  </v-btn>
                </template>

                <v-card>
                  <v-form v-model="valid" ref="form" @submit.prevent="save">
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>

                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.firstname"
                              :rules="[rules.required]"
                              label="Firstname*"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.lastname"
                              :rules="[rules.required]"
                              label="Lastname*"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-select
                              :items="roles"
                              v-model="editedItem.role"
                              :rules="[rules.required]"
                              label="Role*"
                            ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="6"
                          >
                            <v-text-field
                              v-model="editedItem.email"
                              :rules="[rules.required, rules.email]"
                              label="Email*"
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
                        type="submit"
                      >
                        Save
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>

                  </v-form>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

          </template>
          <template v-slot:item.actions="{ item, index }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="item.status === 'Active'"
              small
              class="mr-2"
              @click="block(item, index)"
            >
              mdi-account-cancel
            </v-icon>
            <v-icon
              v-else-if="item.status === 'Blocked'"
              small
              class="mr-2"
              @click="unblock(item, index)"
            >
              mdi-account
            </v-icon>
<!--            <v-icon-->
<!--              small-->
<!--              @click="deleteItem(item)"-->
<!--            >-->
<!--              mdi-delete-->
<!--            </v-icon>-->
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>

          <template v-slot:item.name="{ item }">
            {{ `${item.firstname} ${item.lastname}` }}
          </template>

          <template v-slot:item.role="{ item }">
            <RoleBadge
              :role="item.role"
            >
            </RoleBadge>
          </template>

          <template v-slot:item.status="{ item }">
            <StatusBadge
              :status="item.status"
            >
            </StatusBadge>
          </template>

        </v-data-table>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mixins from 'vue-typed-mixins';
import axios from '@/axios';
import notification from "@/mixins/notification";
import RoleBadge, {roles} from "@/components/users/RoleBadge";
import StatusBadge, {statuses} from "@/components/users/StatusBadge";

export default mixins(notification).extend({
  name: "Users",
  components: {
    RoleBadge,
    StatusBadge
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
    roles: roles,
    statuses: statuses,
    headers: [
      {
        text: 'Name',
        align: 'start',
        // sortable: false,
        value: 'name',
      },
      {text: 'Email', value: 'email'},
      {text: 'Date', value: 'date'},
      {text: 'Role', value: 'role'},
      {text: 'Status', value: 'status'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      firstname: '',
      lastname: '',
      date: '',
      email: '',
      role: '',
      status: '',
    },
    defaultItem: {
      id: '',
      firstname: '',
      lastname: '',
      date: '',
      email: '',
      role: '',
      status: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    async initialize() {
      try {
        this.users = await axios.get('/users');
      } catch (error) {
        this.showError(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (!this.valid) {
        return;
      }

      if (this.editedIndex > -1) {
        try {
          await axios.post('/users/edit', {
            id: this.editedItem.id,
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            email: this.editedItem.email,
            role: this.editedItem.role
          });

          Object.assign(this.users[this.editedIndex], this.editedItem);
        } catch(error) {
          this.showError(error);
          return;
        }
      } else {
        try {
          const response = await axios.post('/users/create', {
            firstname: this.editedItem.firstname,
            lastname: this.editedItem.lastname,
            email: this.editedItem.email,
            role: this.editedItem.role
          });

          this.editedItem.id = response.id;
          this.editedItem.date = this.$moment().format("DD.MM.YYYY");
          this.editedItem.status = 'Active';
          this.users.push(this.editedItem);
        } catch(error) {
          this.showError(error);
          return;
        }
      }

      this.close()
    },

    async block(item, index) {
      try {
        await axios.post('/users/block', {
          id: item.id
        });
        this.users[index].status = 'Blocked';
      } catch (error) {
        this.showError(error);
      }
    },
    async unblock(item, index) {
      try {
        await axios.post('/users/activate', {
          id: item.id
        });
        this.users[index].status = 'Active';
      } catch (error) {
        this.showError(error);
      }
    },
  },
});
</script>

<style scoped>

</style>
