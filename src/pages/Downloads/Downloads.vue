<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">Listado de recursos de descargas</p>
      </div>
      <div v-if="downloadsList.length == 0" class="col-12">
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
          <q-item v-for="(download, key) in downloadsList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="download" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>Nombre de la seccion: </b> {{ download.name }} |
                <b>Activo: </b> {{ download.active }} |
                <b>Fecha de creacion: </b>
                {{ download.created_at }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                :to="'/downloads/info/' + download.id"
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="visibility"
              />
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

export default {
  name: "DownloadsSection",
  setup() {
    const store = useDownloads();
    const downloadsList = computed(() => store.getDownloadsList);

    return {
      store,
      downloadsList,
    };
  },
  async mounted() {
    await this.store.getApiDownloads();
  },
};
</script>
