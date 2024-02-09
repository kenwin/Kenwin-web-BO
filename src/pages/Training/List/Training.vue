<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('trainingList') }}</p>
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
                <b>{{ $t('name') }}: </b> {{ training.name }} | <b>{{ $t('creationDate') }}: </b>
                {{ formatDate(training.created_at) }}
              </q-item-label>
              <q-item-label caption lines="3">
                <b>{{ $t('description') }}: </b> {{ training.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/training/info/' + training.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/training/prices/' + training.id">
                      <q-item-section>
                        <q-icon name='paid' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('show_prices') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/training/edit/' + training.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteTraining(training.id)">
                      <q-item-section>
                        <q-icon name='delete' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('delete') }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-page-sticky position="top-right" :offset="[25, 8]">
      <q-btn :to="'training/create'" padding="sm" fab icon="add" color="green" />
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
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
