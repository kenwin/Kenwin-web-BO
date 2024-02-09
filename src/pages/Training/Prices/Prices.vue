<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5"><b>Precios de:</b> {{ training.name }}</p>
      </div>
      <div v-if="false" class="col-12">
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
          <q-item v-for="(price, key) in trainingPrices" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="paid" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>Capacitacion de:</b> {{ price.country.nombre }}
              </q-item-label>
              <q-item-label>
                <b>Moneda:</b> {{ price.country_currency.code }}
              </q-item-label>
              <q-item-label>
                <b>Precio:</b> ${{ price.price }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/'">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 60px">{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/'">
                      <q-item-section>
                        <q-icon name='edit' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 60px">{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>
                        <q-icon name='delete' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 60px">{{ $t('delete') }}</q-item-section>
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
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "TrainingPriceSection",
  props: ["training_id"],
  setup() {
    const store = useTraining();
    const training = computed(() => store.getTraining);
    const trainingPrices = computed(() => store.getTrainingPrices);
    const router = useRouter();
    return {
      store,
      router,
      training,
      trainingPrices,
    };
  },
  async mounted() {
    console.log(this.training_id)
    if (this.training_id) {
      this.getTrainingPrice(this.training_id);
    } else {
      this.router.push({ path: "/training" });
    }
  },
  methods: {
    async getTrainingPrice(training_id) {
      await this.store.getTrainingPricesById(training_id);
      this.store.selectTraining(training_id);
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
