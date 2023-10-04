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
              Informacion del recurso de descarga
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Nombre de la sección:</b> {{ downloadSelected.name }}
            </div>
          </q-item-section>
        </q-item>
        <div class="text-h6">
          <b>Recursos de la sección:</b>
        </div>
        <q-list bordered separator>
          <q-item
            v-for="(resource, key) in downloadSelected.resources"
            :key="key"
          >
            <q-item-section avatar top>
              <q-avatar icon="download" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <b>Nombre del recurso: </b> {{ resource.name }} |
                <b>Fecha de creacion: </b> {{ resource.created_at }}
              </q-item-label>
              <q-item-label caption>
                <b>URL: </b> {{ resource.url }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { useRouter } from "vue-router";

export default {
  name: "DownloadsInfo",
  props: ["download_id"],
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const downloadSelected = computed(() => store.getDownload);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      downloadSelected,
      loading,
    };
  },
  mounted() {
    if (this.download_id) {
      this.getDownload(this.download_id);
    } else {
      this.router.push({ path: "/downloads" });
    }
  },
  methods: {
    async getDownload(download_id) {
      await this.store.getDownloadById(download_id);
    },
  },
};
</script>
