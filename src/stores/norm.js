import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useNorm = defineStore("norm", {
  state: () => ({
    norm: {},
    normNames: [],
    normList: [],
    loading: false,
  }),
  getters: {
    getNorm: (state) => state.norm,
    getNormNames: (state) => state.normNames,
    getNormList: (state) => state.normList,
    getLoading: (state) => state.loading,
  },
  actions: {
    setNorm(payload) {
      this.norm = payload;
    },
    selectNorm(norm_id) {
      this.norm = this.normList.filter((data) => {
        return data.id == norm_id
      })[0]
    },
    async getApiNorm() {
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
        await api.get("/api/norm_type", config)
          .then((response) => {
            console.log(response);
            this.normList = response.data;
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
    async getNormById(norm_id) {
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
          .get("/api/norm_type/" + norm_id, config)
          .then((response) => {
            console.log(response);
            this.norm = response.data;
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
    async createNorm(data) {
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
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .post("/api/norm_type", formData, config)
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
    async updateNorm(id) {
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
          .put("/api/norm_type/" + id, { nombre: this.norm.nombre }, config)
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
    async deleteNorm(id) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .post("/api/norm_type/delete/" + id, config)
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
