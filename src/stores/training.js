import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuth } from "stores/auth";

export const useTraining = defineStore("training", {
  state: () => ({
    training: {},
    trainingList: [],
    loading: false,
  }),
  getters: {
    getTraining: (state) => state.training,
    getTrainingList: (state) => state.trainingList,
    getLoading: (state) => state.loading,
  },
  actions: {
    setTraining(payload) {
      this.training = payload;
    },
    async getApiTraining() {
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
          .get("/api/training", config)
          .then((response) => {
            console.log(response.data);
            this.trainingList = response.data;
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
    async getTrainingById(training_id) {
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
          .get("/api/training/" + training_id, config)
          .then((response) => {
            console.log(response);
            this.training = response.data;
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
    async createTraining(data) {
      this.loading = true;
      const auth = useAuth();

      if (!auth.getToken) {
        console.log("Null token");
        return;
      }

      const formData = new FormData();
      if (data.name) {
        formData.set("name", data.name);
      }
      if (data.date_start) {
        formData.set("date_start", data.date_start);
      }
      if (data.date_end) {
        formData.set("date_end", data.date_end);
      }
      if (data.duration_description) {
        formData.set("duration_description", data.duration_description);
      }
      if (data.description) {
        formData.set("description", data.description);
      }

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + auth.getToken,
        },
      };

      try {
        await api
          .post("/api/training", formData, config)
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
    async editTraining(id) {
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
      if (this.training) {
        formData.set("name", this.training.name);
      }
      if (this.training) {
        formData.set("description", this.training.description);
      }
      if (this.training) {
        formData.set("date_start", this.training.date_start);
      }
      if (this.training) {
        formData.set("date_end", this.training.date_end);
      }
      if (this.training) {
        formData.set(
          "duration_description",
          this.training.duration_description
        );
      }

      try {
        await api
          .post("/api/training/" + id, formData, config)
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
    async deleteTraining(id) {
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
          .post("/api/training/delete/" + id, config)
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
