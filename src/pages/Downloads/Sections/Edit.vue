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
              Editar sección de descarga
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="sectionData.name"
              filled
              label="Nombre de la sección"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="sectionData.active"
              :options="options"
              label="Activo"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Crear sección" />
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
  name: "DownloadsEditSection",
  props: ["section_id"],
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      options: ["Activo", "Inactivo"],
    };
  },
  data() {
    return {};
  },
  computed: {
    sectionData: {
      get() {
        return this.store.getSection;
      },
      set(newValue) {
        this.store.setSection(newValue);
      },
    },
  },
  mounted() {
    if (this.section_id) {
      console.log(this.section_id);
      this.getSection(this.section_id);
    } else {
      this.router.push({ path: "/downloads" });
    }
  },
  methods: {
    async getSection(section_id) {
      await this.store.getSectionById(section_id);
    },
    async onSubmit() {
      await this.store.updateSection(this.section_id).then(() => {
        this.router.push({ path: "/downloads" });
      });
    },
  },
};
</script>
