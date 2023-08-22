import { defineStore } from "pinia";
import { api } from 'boot/axios'

export const useContactForm = defineStore("contactForm", {
  state: () => ({
    formsList: [],
  }),
  getters: {
    getFormList: (state) => state.formsList,
  },
  actions: {
    async getFormsList() {
      /*
      const getConfig = {
        headers: {
          Authorization: 'Bearer ' + getters.getToken
        }
      }
      */
      try {
         await api.get('/api/contact')
          .then((response) => {
            console.log(response.data.data);
            this.formsList = response.data.data
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error
      }

      //this.formsList = dataForms
    },
  }
});
