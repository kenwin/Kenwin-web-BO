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
            ><div class="text-h5">
              {{$t('trainingInfo')}}
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('name') }}:</b> {{ trainingSelected.name }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('startDate') }}:</b>
              {{ formatDate(trainingSelected.date_start) || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('endDate') }}:</b>
              {{ formatDate(trainingSelected.date_end) || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('durationDescription') }}:</b>
              {{ trainingSelected.duration_description || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6"><b>{{ $t('description') }}:</b></div>
            <div class="text-h7" v-html="trainingSelected.description"></div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useTraining } from "stores/training";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "TrainingInfo",
  props: ["training_id"],
  setup() {
    const store = useTraining();
    const router = useRouter();
    const trainingSelected = computed(() => store.getTraining);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      trainingSelected,
      loading,
    };
  },
  computed: {
    imgUrl() {
      return "http://localhost:8000/images/news_images/";
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
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
