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
              Crear recurso de descarga
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="resource.name"
              filled
              label="Titulo del recurso"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="resource.public"
              filled
              :options="optionsPublic"
              label="Recurso publico"
              option-value="id"
              option-label="label"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="resource.section"
              filled
              :options="downloadsList"
              label="Sección del recurso"
              option-value="id"
              option-label="name"
            />
          </q-item-section>
          <q-item-section v-if="sectionError">
            <span class="text-negative">Por favor, seleccione una sección.</span>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  resource.data = val[0];
                }
              "
              filled
              type="file"
              hint="Recurso para descargar"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Crear recurso" />
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

export default {
  name: "DownloadsCreateResource",
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const downloadsList = computed(() => store.getDownloadsList);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      downloadsList,
      loading,
      optionsPublic: [
        { id: 1, label: "Publico" },
        { id: 0, label: "Privado" },
      ],
    };
  },
  data() {
    return {
      resource: {
        name: "",
        public: "",
        section: null,
        data: null,
      },
      sectionError: false,
    };
  },
  async mounted() {
    await this.store.getApiDownloads();
  },
  methods: {
    async onSubmit() {
      if (!this.resource.section) {
        this.sectionError = true;
        return;
      }

      this.sectionError = false;

      await this.store.createResource(this.resource).then(() => {
        this.router.push({ path: "/downloads" });
      });
    },
  },
};
</script>
