<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/tipo_norma" />
          </q-item-section>
          <q-item-section>
            <div class="text-h5">
              {{ $t('normTypeInfo') }}
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('normType') }}:</b> {{ normSelected.nombre }}
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNorm } from "stores/norm";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "NormInfo",
  props: ["tipo_norma_id"],
  setup() {
    const store = useNorm();
    const router = useRouter();
    const normSelected = computed(() => store.getNorm);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      normSelected,
      loading,
      draggingIndex: -1,
    };
  },
  async mounted() {
    if (this.tipo_norma_id) {
      this.normSelected = await this.getNormId(this.tipo_norma_id);
    } else {
      this.router.push({ path: "/tipo_norma" });
    }
  },
  methods: {
    async getNormId(tipo_norma_id) {
      await this.store.getNormById(tipo_norma_id);
    },
  }
};
</script>
