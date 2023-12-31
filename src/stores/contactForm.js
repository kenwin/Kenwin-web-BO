import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useContactForm = defineStore("contactForm", {
  state: () => ({
    form: {},
    formsList: [],
    loading: false,
  }),
  getters: {
    getForm: (state) => state.form,
    getFormList: (state) => state.formsList,
    getLoading: (state) => state.loading,
  },
  actions: {
    async getFormsList() {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const getConfig = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .get("/api/contact", getConfig)
          .then((response) => {
            console.log(response.data.data);
            this.formsList = response.data.data;
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
    async getFormById(form_id) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const getConfig = {
        headers: {
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .get("/api/contact/" + form_id, getConfig)
          .then((response) => {
            console.log(response);
            this.form = response.data.data;
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
