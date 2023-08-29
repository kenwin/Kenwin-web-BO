import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useContactForm = defineStore("contactForm", {
  state: () => ({
    formsList: [],
  }),
  getters: {
    getFormList: (state) => state.formsList,
  },
  actions: {
    async getFormsList() {
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
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
});
