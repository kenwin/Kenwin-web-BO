<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">Listado de capacitaciones</p>
      </div>
      <div v-if="trainingList.length == 0" class="col-12">
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else class="col-12">
        <q-list bordered separator>
          <q-item v-for="(training, key) in trainingList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="feed" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>Nombre: </b> {{ training.name }} | <b>Fecha de creacion: </b>
                {{ formatDate(training.created_at) }}
              </q-item-label>
              <q-item-label caption lines="3">
                <b>Descripcion: </b> {{ training.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/training/info/' + training.id">
                      <q-item-section>Ver mas</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/training/edit/' + training.id">
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteTraining(training.id)">
                      <q-item-section>Borrar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :to="'news/create'" fab icon="add" color="green" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useTraining } from "stores/training";
import moment from "moment";

export default {
  name: "TrainingSection",
  setup() {
    const store = useTraining();
    const trainingList = computed(() => store.getTrainingList);

    return {
      store,
      trainingList,
    };
  },
  async mounted() {
    await this.store.getApiTraining();
  },
  methods: {
    async deleteTraining(training_id) {
      await this.store.deleteTraining(training_id);
      await this.store.getApiTraining();
    },
    formatDate(date) {
      return moment(String(date)).format("MM/DD/YYYY hh:mm");
    },
  },
};
</script>
