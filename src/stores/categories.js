import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useCategories = defineStore("categories", {
  state: () => ({
    categories: {},
    categoriesList: [],
    loading: false,
  }),
  getters: {
    getCategories: (state) => state.categories,
    getCategoriesList: (state) => state.categoriesList,
    getLoading: (state) => state.loading,
  },
  actions: {
    setCategories(payload) {
      this.categories = payload;
    },
    async getApiCategories() {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const config = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .get("/api/categorias", config)
          .then((response) => {
            console.log(response.data);
            this.categoriesList = response.data;
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
        this.loading = false;
      }
    },
    async getCategoriesById(categories_id) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const config = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .get("/api/categorias/" + categories_id, config)
          .then((response) => {
            console.log(response);
            this.categories = response.data;
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
        this.loading = false;
      }
    },
    async createCategory(data) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const formData = new FormData();
      if (data.nombre) {
        formData.set("nombre", data.nombre);
      }

      const config = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .post("/api/categorias", formData, config)
          .then((response) => {
            console.log(response);
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
        this.loading = false;
      }
    },
    async editCategories(id) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const config = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      const formData = new FormData();
      if (this.categories) {
        formData.set("nombre", this.categories.nombre);
      }

      try {
        await api
          .patch("/api/categorias/" + id, formData, config)
          .then((response) => {
            console.log(response);
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
        this.loading = false;
      }
    },
    async deleteCategory(categories_id) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const config = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .delete("/api/categorias/" + categories_id, config)
          .then((response) => {
            console.log(response);
            this.loading = false;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
        this.loading = false;
      }
    },
  },
});
