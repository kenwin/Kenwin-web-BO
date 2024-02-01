<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('downloadSectionList') }}</p>
        <hr/>
      </div>
  <div v-if="downloadsListEsp.length + downloadsListPor.length === 0" class="col-12">
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
    <div class="text-h6">
      <b>{{ $t('sectionOrderEsp') }}:</b>
    </div>
    <td>
      {{$t('drop')}} <q-icon name="keyboard_arrow_down" size="40px" color="primary" />
    </td>
    <q-list bordered separator>
      <q-item v-for="(download, key) in downloadsListEsp" :key="key" :download="download" class="drag"
        @dragstart="startDrag(key, downloadsListEsp)"
        @dragover.prevent
        @drop="handleDrop('esp')"
        :draggable="true"
        :style="{ opacity: draggingIndex === key ? '0.5' : '1' }"
        :data-index="key">

      <q-btn icon="swap_vert" flat color="primary" class="drag-handle" />

      <q-item-section avatar top>
        <q-avatar icon="download" color="primary" text-color="white" />
      </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{$t('sectionName')}}: </b> {{ download.name }} |
                <b>{{$t('creationDate')}}: </b>
                {{ formatDate(download.created_at) }}
                <q-chip color="primary" text-color="white" class="float-right">
                  <q-avatar>
                    <img :src="'icons/esp.png'">
                  </q-avatar>
                  ESP
                </q-chip>
                <q-badge :color="download.active ? 'green' : 'red'">
                  {{ download.active ? 'Activo' : 'Inactivo' }}
                </q-badge>
                <q-badge v-if="download.prioridad" color="blue" style="margin-left: 5px">
                  Prioridad: {{ download.prioridad }}
                </q-badge>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/downloads/sections/info/' + download.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/downloads/sections/edit/' + download.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteSection(download.id)">
                      <q-item-section>
                        <q-icon name='delete' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('delete') }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        <br>
        <hr/>

    <div class="text-h6">
      <b>{{ $t('sectionOrderPor') }}:</b>
    </div>
    <td>
      {{$t('drop')}} <q-icon name="keyboard_arrow_down" size="40px" color="primary" />
    </td>
    <q-list bordered separator>
      <q-item v-for="(download, key) in downloadsListPor" :key="key" :download="download" class="drag"
        @dragstart="startDrag(key, downloadsListPor)"
        @dragover.prevent
        @drop="handleDrop('por')"
        :draggable="true"
        :style="{ opacity: draggingIndex === key ? '0.5' : '1' }"
        :data-index="key">

      <q-btn icon="swap_vert" flat color="primary" class="drag-handle" />

      <q-item-section avatar top>
        <q-avatar icon="download" color="primary" text-color="white" />
      </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{$t('sectionName')}}: </b> {{ download.name }} |
                <b>{{$t('creationDate')}}: </b>
                {{ formatDate(download.created_at) }}
                <q-chip color="primary" text-color="white" class="float-right">
                  <q-avatar>
                    <img :src="'icons/por.png'">
                  </q-avatar>
                  POR
                </q-chip>
                <q-badge :color="download.active ? 'green' : 'red'">
                  {{ download.active ? 'Activo' : 'Inactivo' }}
                </q-badge>
                <q-badge v-if="download.prioridad" color="blue" style="margin-left: 5px">
                  Prioridad: {{ download.prioridad }}
                </q-badge>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/downloads/sections/info/' + download.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/downloads/sections/edit/' + download.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteSection(download.id)">
                      <q-item-section>
                        <q-icon name='delete' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('delete') }}</q-item-section>
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

    const downloadsListEsp = computed(() => downloadsList.value.filter(download => download.idioma === 'esp'));
    const downloadsListPor = computed(() => downloadsList.value.filter(download => download.idioma === 'por'));


    return {
      fabLeft: ref(false),
      store,
      downloadsList,
      downloadsListEsp,
      downloadsListPor,
      draggingIndex: -1,
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
    startDrag(index, list) {
      this.draggingIndex = index;
      this.initialIndex = index;
      this.currentList = list;
    },
    handleDrop(idioma) {
    const updatedDownloads = [...this.currentList];
    const draggedDownload = updatedDownloads[this.draggingIndex];
    updatedDownloads.splice(this.draggingIndex, 1);
    const newIndex = event.target.dataset.index;

    if (newIndex !== undefined && this.initialIndex !== newIndex) {
      updatedDownloads.splice(newIndex, 0, draggedDownload);
      updatedDownloads.forEach((download, index) => {
        download.prioridad = index + 1;
      });

      this.store.updateDownloadsPriorities(updatedDownloads, idioma);
      this.store.getApiDownloads();

    }

    this.draggingIndex = -1;
    this.initialIndex = -1;
    this.currentList = null;
  },


  },
};
</script>

<style scoped>
  .drag-handle {
    width: 5px;
    cursor: grab;
    margin-right: 100px;
  }
  .ml2 {
    padding-left: 5px;
  }
</style>
