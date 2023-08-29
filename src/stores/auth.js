import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    accessToken: null,
    refresh_token: null,
  }),
  getters: {
    getToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refresh_token,
  },
  actions: {
    async logginUser(data) {
      if (data.email == "" || data.password == "") {
        console.log("Error");
        return;
      }

      const formData = new FormData();

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      formData.set("email", data.email);
      formData.set("password", data.password);
      try {
        await api
          .post("/api/login", formData, config)
          .then((response) => {
            console.log(response.data);
            this.user = response.data.data;
            this.accessToken = response.data.data.token;
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
      }
    },
    logoutUser() {
      this.user = null;
      this.accessToken = null;
      this.refresh_token = null;
      return;
    },
  },
});
