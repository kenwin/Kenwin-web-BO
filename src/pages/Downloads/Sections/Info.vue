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
          <q-item-section>
            <div class="text-h5">
              {{$t('sectionInfo')}}
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{$t('sectionName')}}:</b> {{ downloadSelected.name }}
            </div>
          </q-item-section>
        </q-item>
        <div class="text-h6">
          <b>{{ $t('sectionResources') }}:</b>
        </div>
        <td>
          {{$t('drop')}} <q-icon name="keyboard_arrow_down" size="40px" color="primary" />

        </td>
        <q-list bordered separator>

          <q-item v-for="(resource, key) in downloadSelected.resources" :key="key" :resource="resource" class="drag"
    @dragstart="startDrag(resource, key)"
    @dragover.prevent
    @drop="handleDrop"
    :draggable="true"
    :style="{ opacity: draggingIndex === key ? '0.5' : '1' }"
    :data-index="key">

    <!-- Nuevo contenedor para el botón de ordenación -->
      <q-btn icon="swap_vert" flat color="primary" class="drag-handle" />

    <!-- Contenedor del contenido del ítem con borde -->
      <q-item-section avatar top>
        <q-avatar icon="download" color="primary" text-color="white" />
      </q-item-section>
            <q-item-section>
              <q-item-label>
                <b>{{ $t('resourceName') }}: </b> {{ resource.name }}
                <b v-if="resource.created_at">{{ $t('creationDate') }}: {{ formatDate(resource.created_at) }}</b>
                <q-badge :color="blue">
                  Prioridad: {{ resource.prioridad }}
                </q-badge>
              </q-item-label>
              <q-item-label caption>
                <b>URL: </b> {{ resource.url }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <q-badge class="float-right" :color="resource.public ? 'green' : 'red'">
                  {{ resource.public ? 'Público' : 'Privado' }}
                </q-badge>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/downloads/resources/info/' + resource.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="editStatus(resource.id, resource.id_folder)">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t(resource.public ? 'changePrivate' : 'changePublic') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteResource(resource.id, resource.id_folder)">
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
    const downloadSelected = computed(() => store.getDownload);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      downloadSelected,
      loading,
      draggingIndex: -1,
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
    async deleteResource(resource_id, folder_id) {
      await this.store.deleteResource(resource_id);
      await this.store.getDownloadById(folder_id);
    },
    async editStatus(resource_id, folder_id) {
      await this.store.updateStatus(resource_id);
      await this.store.getDownloadById(folder_id);
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },

    startDrag(resource, index) {
  this.draggingIndex = index;
  this.initialIndex = index;
},
handleDrop(event) {
  const updatedResources = [...this.downloadSelected.resources];
  const draggedResource = updatedResources[this.draggingIndex];

  updatedResources.splice(this.draggingIndex, 1);

  const newIndex = event.target.dataset.index;

  if (newIndex !== undefined && this.initialIndex !== newIndex) {
    updatedResources.splice(newIndex, 0, draggedResource);

    updatedResources.forEach((resource, index) => {
      resource.prioridad = index + 1;
    });

    this.store.updateResourcesPriorities(updatedResources);
    this.downloadSelected.resources = updatedResources;
  }

  this.draggingIndex = -1;
  this.initialIndex = -1;
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
