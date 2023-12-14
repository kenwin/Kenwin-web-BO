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
              Crear sección de descarga
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="section.name"
              filled
              label="Nombre de la sección"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="section.active"
              :options="options"
              label="Activo"
            />
          </q-item-section>
        </q-item>
         <q-item>
            <q-item-section>
              <q-select
                v-model="section.idioma"
                filled
                :options="idiomas"
                label="Idioma"
                option-value="id"
                option-label="nombre"
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
  name: "DownloadsCreateSection",
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      options: ["Activo", "Inactivo"],
      idiomas: [
        {
          id: "esp",
          nombre: "Español",
        },
        {
          id: "por",
          nombre: "Portugués",
        },
      ]
    };
  },
  data() {
    return {
      section: {
        name: "",
        active: "Activo",
        idioma: "",
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      this.section.idioma = this.section.idioma.id;
      console.log(this.section.idioma)
      console.log(this.section.idioma.id)
      await this.store.createSection(this.section).then(() => {
        this.router.push({ path: "/downloads" });
      });
    },
  },
};
</script>
