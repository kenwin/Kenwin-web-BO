<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/tipo_documento" />
          </q-item-section>
          <q-item-section>
            <div class="text-h5">
              {{ $t('documentTypeInfo') }}
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('documentType') }}:</b> {{ documentSelected.nombre }}
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDocument } from "stores/document";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "DocumentInfo",
  props: ["tipo_documento_id"],
  setup() {
    const store = useDocument();
    const router = useRouter();
    const documentSelected = computed(() => store.getDocument);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      documentSelected,
      loading,
      draggingIndex: -1,
    };
  },
  mounted() {
    if (this.tipo_documento_id) {
      this.getDocument(this.tipo_documento_id);
    } else {
      this.router.push({ path: "/tipo_documento" });
    }
  },
  methods: {
    async getDocument(tipo_documento_id) {
      await this.store.getDocumentById(tipo_documento_id);
    },
    async deleteDocument(tipo_documento_id) {
      await this.store.deleteDocument(tipo_documento_id);
    },
  },
};
</script>
