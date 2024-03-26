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
          <q-item-section
            ><div class="text-h5">
              {{ $t('documentTypeUpdate') }}
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="documentData.nombre"
              filled
              :label="$t('documentType')"
            />
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
import { useDocument } from "stores/document";
import { useRouter } from "vue-router";

export default {
  name: "DocumentEditSection",
  props: ["document_id"],
  setup() {
    const store = useDocument();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
    };
  },
  data() {
    return {};
  },
  computed: {
    sectionData: {
      get() {
        return this.store.getDocument;
      },
      set(newValue) {
        this.store.setDocument(newValue);
      },
    },
  },
  mounted() {
    if (this.document_id) {
      this.getDocument(this.document_id);
    } else {
      this.router.push({ path: "/tipo_documento" });
    }
  },
  methods: {
    async getDocument(document_id) {
      await this.store.getDocumentById(document_id);
    },
    async onSubmit() {
      await this.store.updateDocument(this.document_id).then(() => {
        this.router.push({ path: "/tipo_documento" });
      });
    },
  },
};
</script>
