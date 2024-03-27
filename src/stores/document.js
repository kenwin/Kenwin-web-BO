import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useDocument = defineStore("document", {
  state: () => ({
    document: {},
    documentNames: [],
    documentList: [],
    loading: false,
  }),
  getters: {
    getDocument: (state) => state.document,
    getDocumentNames: (state) => state.documentNames,
    getDocumentList: (state) => state.documentList,
    getLoading: (state) => state.loading,
  },
  actions: {
    setDocument(payload) {
      this.document = payload;
    },
    selectDocument(document_id) {
      this.document = this.documentList.filter((data) => {
        return data.id == document_id
      })[0]
    },
    async getApiDocument() {
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
        await api.get("/api/document_type", config)
          .then((response) => {
            console.log(response.data);
            this.documentList = response.data;
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
    async getDocumentById(document_id) {
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
          .get("/api/document_type/" + document_id, config)
          .then((response) => {
            console.log(response);
            this.document = response.data;
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
    async createDocument(data) {
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
          .post("/api/document_type", formData, config)
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
    async updateDocument(id) {
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
          .put("/api/document_type/" + id, { nombre: this.document.nombre }, config)
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
    async deleteDocument(id) {
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
          .post("/api/document_type/delete/" + id, config)
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
