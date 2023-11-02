<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/training" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">Editar capacitacion</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="trainingData.name" filled label="Nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="trainingData.date_start"
              filled
              label="Fecha de inicio"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="trainingData.date_end"
              filled
              label="Fecha de fin"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="trainingData.duration_description"
              filled
              label="Descripcion de la duracion"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="trainingData.description"
              filled
              type="textarea"
              label="Descripcion"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              @click="onSubmit()"
              color="green"
              label="Guardar capacitacion"
            />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useTraining } from "stores/training";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "TrainingEdit",
  props: ["training_id"],
  setup() {
    const store = useTraining();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      file: ref(null),
    };
  },
  data() {
    return {};
  },
  computed: {
    trainingData: {
      get() {
        return this.store.getTraining;
      },
      set(newValue) {
        this.store.setTraining(newValue);
      },
    },
  },
  mounted() {
    if (this.training_id) {
      this.getTraining(this.training_id);
    } else {
      this.router.push({ path: "/training" });
    }
  },
  methods: {
    async getTraining(training_id) {
      await this.store.getTrainingById(training_id);
    },
    async onSubmit() {
      await this.store.editTraining(this.training_id).then(() => {
        this.router.push({ path: "/training" });
      });
    },
  },
};
</script>
