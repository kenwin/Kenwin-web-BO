import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useNews = defineStore("news", {
  state: () => ({
    news: {},
    newsList: [],
    loading: false,
  }),
  getters: {
    getNews: (state) => state.news,
    getNewsList: (state) => state.newsList,
    getLoading: (state) => state.loading,
  },
  actions: {
    async getApiNews() {
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
          .get("/api/noticias", config)
          .then((response) => {
            console.log(response.data);
            this.newsList = response.data;
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
    async getNewsById(news_id) {
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
          .get("/api/noticias/" + news_id, config)
          .then((response) => {
            console.log(response);
            this.news = response.data;
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
    async createNews(data) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const formData = new FormData();
      if (data.epigrafe) {
        formData.set("epigrafe", data.epigrafe);
      }
      if (data.titulo) {
        formData.set("titulo", data.titulo);
      }
      if (data.subtitulo) {
        formData.set("subtitulo", data.subtitulo);
      }
      if (data.cuerpo) {
        formData.set("cuerpo", data.cuerpo);
      }
      if (data.autor) {
        formData.set("autor", data.autor);
      }
      if (data.image) {
        formData.set("image", data.image);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .post("/api/noticias", formData, config)
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
    async deleteNews(news_id) {
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
          .post("/api/noticias/delete/" + news_id, config)
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
