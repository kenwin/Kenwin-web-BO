<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">Listado de secciones de descargas</p>
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
                <b>Nombre de la seccion: </b> {{ download.name }}
                <b>Lenguaje: </b> {{ download.idioma == 'esp' ? 'ESPAÑOL' : 'PORTUGUÉS' }} |
                <b>Activo: </b> {{ download.active }} |
                <b>Fecha de creacion: </b>
                {{ formatDate(download.created_at) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/downloads/sections/info/' + download.id">
                      <q-item-section>Ver mas</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/downloads/sections/edit/' + download.id">
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteSection(download.id)">
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
    <q-page-sticky position="bottom-right" :offset="[70, 18]">
      <q-fab v-model="fabLeft" vertical-actions-align="right" color="green" icon="add" direction="up">
        <q-fab-action label-position="right" color="primary" icon="download" label="Crear recurso"
          :to="'downloads/resources/create'" />
        <q-fab-action label-position="right" color="primary" icon="download" label="Crear sección"
          :to="'downloads/sections/create'" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "DownloadsSection",
  setup() {
    const store = useDownloads();
    const downloadsList = computed(() => store.getDownloadsList);

    return {
      fabLeft: ref(false),
      store,
      downloadsList,
    };
  },
  async mounted() {
    await this.store.getApiDownloads();
  },
  methods: {
    async deleteSection(section_id) {
      await this.store.deleteSection(section_id);
      await this.store.getApiDownloads();
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
