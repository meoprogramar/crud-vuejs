<template>
  <v-app>
    <v-app-bar app color="primary" dark>CRUD - Node.js + Vue.js</v-app-bar>

    <v-main>
      <v-form ref="form">
        <div class="flex-column-config">
          <v-card class="card-style my-12">
            <v-text-field
              v-model="editedItem.name"
              :rules="[v => !!v || 'Nome obrigatório']"
              label="Nome"
              required
            ></v-text-field>

            <v-text-field
              v-model="editedItem.phone"
              :rules="[v => !!v || 'Telefone obrigatório', v => /^\d+$/.test(v) || 'Telefone inválido']"
              maxlength="8"
              label="Telefone"
              required
            ></v-text-field>

            <v-btn color="primary" @click="saveItem" depressed>Salvar</v-btn>
          </v-card>

          <h2 class="text--secondary mb-2">Listagem de contatos</h2>
          <v-card class="card-style mb-2" v-for="item in items" :key="item.id">
            <p class="ma-0">
              <v-icon left small>mdi-account</v-icon>
              Nome: {{ item.name }}
            </p>
            <p class="ma-0">
              <v-icon left small>mdi-phone</v-icon>
              Telefone: {{ item.phone }}
            </p>
            <div class="flex-row-config mt-2">
              <v-btn fab x-small depressed dark @click="updateItem(item)">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="ml-3" color="error" fab x-small depressed @click="deleteItem(item)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-form>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data: () => ({
    items: [],

    editedItem: {}
  }),

  methods: {
    getItems() {
      axios
        .get("http://localhost:8081/contato")
        .then(res => (this.items = res.data));
    },

    deleteItem(item) {
      axios
        .delete(`http://localhost:8081/contato/${item.id}`)
        .then(this.getItems);
    },

    updateItem(item) {
      this.editedItem = Object.assign({}, item);
    },

    async saveItem() {
      if (this.validate()) {
        if (this.editedItem.id === undefined) {
          await axios.post("http://localhost:8081/contato", this.editedItem);
        } else {
          await axios.put(
            `http://localhost:8081/contato/${this.editedItem.id}`,
            this.editedItem
          );
        }
        this.editedItem = {};
        this.resetValidation();
        this.getItems();
      }
    },

    validate() {
      return this.$refs.form.validate();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },

  mounted() {
    this.getItems();
  }
};
</script>

<style  scoped>
.flex-column-config {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flex-row-config {
  display: flex;
  align-items: center;
}

.card-style {
  padding: 20px;
  width: 600px;
}
</style>
