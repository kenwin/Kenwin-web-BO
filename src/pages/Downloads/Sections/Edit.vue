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
              {{ $t('sectionUpdate') }}
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
              :label="$t('sectionName')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="sectionData.active"
              :options="options"
              :label="$t('active')"
            />
          </q-item-section>
        </q-item>
        <q-item>
            <q-item-section>
              <q-select v-model="sectionData.idioma" filled :options="idiomas" :label="$t('lang')" option-value="id"
                option-label="nombre" />
            </q-item-section>
          </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" :label="$t('sectionUpdate')" />
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
      idiomas: [
        {
          id: 'esp',
          nombre: 'Español'
        },
        {
          id: 'por',
          nombre: 'Portugués'
        }
      ]
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

      if (this.sectionData.idioma && this.sectionData.idioma.id) {
        this.sectionData.idioma = this.sectionData.idioma.id;
      }

      await this.store.updateSection(this.section_id).then(() => {
        this.router.push({ path: "/downloads" });
      });
    },
  },
};
</script>
