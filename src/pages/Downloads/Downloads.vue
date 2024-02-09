<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('downloadSectionList') }}</p>
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
                <b>{{ $t('sectionName') }}: </b> {{ download.name }} |
                <b>{{ $t('creationDate') }}: </b>
                {{ formatDate(download.created_at) }}
                <q-chip color="primary" text-color="white" class="float-right">
                  <q-avatar>
                    <img :src="'icons/' + download.idioma + '.png'">
                  </q-avatar>
                  {{ download.idioma == 'esp' ? 'ESP' : 'POR' }}
                </q-chip>
                <q-badge :color="download.active ? 'green' : 'red'">
                  {{ download.active ? 'Activo' : 'Inactivo' }}
                </q-badge>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/downloads/sections/info/' + download.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 60px">{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/downloads/sections/edit/' + download.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 60px">{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteSection(download.id)">
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
      <q-fab v-model="fabLeft" vertical-actions-align="right" padding="sm" color="green" icon="add" direction="left">
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
