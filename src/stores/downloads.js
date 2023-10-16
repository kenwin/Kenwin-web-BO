import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useDownloads = defineStore("downloads", {
  state: () => ({
    download: {},
    section: {},
    resource: {},
    downloadsList: [],
    loading: false,
  }),
  getters: {
    getDownload: (state) => state.download,
    getSection: (state) => state.section,
    getResource: (state) => state.resource,
    getDownloadsList: (state) => state.downloadsList,
    getLoading: (state) => state.loading,
  },
  actions: {
    setSection(payload) {
      this.section = payload;
    },
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
    async getSectionById(section_id) {
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
          .get("/api/downloads/" + section_id, getConfig)
          .then((response) => {
            console.log(response);
            this.section = response.data[0];
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
    async updateSection(id) {
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
      if (this.section) {
        formData.set("name", this.section.name);
      }
      if (this.section) {
        formData.set("active", this.section.active == "Activo" ? 1 : 0);
      }

      try {
        await api
          .post("/api/downloads/section/" + id, formData, config)
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
    async deleteSection(id) {
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
          .post("/api/downloads/delete/" + id, config)
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
    async getResourceById(resource_id) {
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
          .get("/api/downloads/resource/" + resource_id, getConfig)
          .then((response) => {
            console.log(response);
            this.resource = response.data[0];
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
    async deleteResource(id) {
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
          .post("/api/downloads/resource/delete/" + id, config)
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
