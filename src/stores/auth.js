import { defineStore } from "pinia";
import { api } from "boot/axios";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: {},
    accessToken: null,
    refresh_token: null,
    loading: false,
    lang: null
  }),
  getters: {
    getToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refresh_token,
    getLoading: (state) => state.loading,
    getLang: (state) => state.lang,
    getUser: (state) => state.user,
  },
  actions: {
    async logginUser(data) {
      this.loading = true;

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
            if (response.data.success) {
              this.user = response.data.data;
              this.accessToken = response.data.data.token;
              this.lang = response.data.data.lang
            }
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
        this.loading = false;
      } catch (error) {
        if (error) throw error;
      }
    },
    logoutUser() {
      this.user = null;
      this.accessToken = null;
      this.lang = null;
      this.refresh_token = null;
      return;
    },
    changeLanguage(lang) {
      this.lang = lang;
    },
    async updateLanguage(user_id, lang) {
      if (lang === "") {
        console.log("Error");
        return;
      }

      const formData = new FormData();

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      formData.set("lang", lang);
      formData.set("id", user_id);

      try {
        const response = await api.post("/api/user/update", formData, config);

        if (response.data.success) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error during updateLanguage:", error);
        return false;
      } finally {
        this.loading = false;
      }
    },
    async recoverPass(data) {
      this.loading = true;

      if (data.email == "") {
        throw new Error("email vacio");
      }

      const formData = new FormData();

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      formData.set("email", data.email);
      try {
        const response = await api.post("/api/forgot_password", formData, config);
        if (response.data.success) {
          this.$q.notify({
            type: "positive",
            message: this.$t('recoverSuccess')
          });
        } else {
          throw new Error("Error en sistema");
        }
        this.loading = false;
      } catch (error) {
        if (error) throw error;
      }
    },

  },
});
