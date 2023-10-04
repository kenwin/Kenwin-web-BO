import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useDownloads = defineStore("downloads", {
  state: () => ({
    download: {},
    downloadsList: [],
    loading: false,
  }),
  getters: {
    getDownload: (state) => state.download,
    getDownloadsList: (state) => state.downloadsList,
    getLoading: (state) => state.loading,
  },
  actions: {
    async getApiDownloads() {
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
          .get("/api/downloads", getConfig)
          .then((response) => {
            console.log(response.data);
            this.downloadsList = response.data;
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
    async getDownloadById(download_id) {
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
          .get("/api/downloads/" + download_id, getConfig)
          .then((response) => {
            console.log(response);
            this.download = response.data[0];
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
    async createSection(data) {
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

      const formData = new FormData();
      if (data.name) {
        formData.set("name", data.name);
      }
      if (data.active) {
        formData.set("active", data.active == "Activo" ? 1 : 0);
      }

      try {
        await api
          .post("/api/downloads", formData, config)
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
    async createResource(data) {
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

      const formData = new FormData();
      if (data.name) {
        formData.set("name", data.name);
      }
      if (data.public) {
        formData.set("public", data.public.id);
      }
      if (data.section) {
        formData.set("id_folder", data.section.id);
      }
      if (data.data) {
        formData.set("file", data.data);
      }

      try {
        await api
          .post("/api/downloads/create_resource", formData, config)
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
