<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/downloads" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">
              Informacion del recurso para descargar
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Nombre del recurso:</b> {{ resourceSelected.name }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Fecha de creacion:</b>
              {{ formatDate(resourceSelected.created_at) }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6"><b>URL:</b> {{ resourceSelected.url }}</div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "DownloadsInfo",
  props: ["download_id"],
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const resourceSelected = computed(() => store.getResource);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      resourceSelected,
      loading,
    };
  },
  mounted() {
    if (this.download_id) {
      this.getResourceId(this.download_id);
    } else {
      this.router.push({ path: "/downloads" });
    }
  },
  methods: {
    async getResourceId(download_id) {
      await this.store.getResourceById(download_id);
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
