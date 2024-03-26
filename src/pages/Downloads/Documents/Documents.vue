<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('DocumentTypeList') }}</p>
      </div>
      <div v-if="d.length == 0" class="col-12">
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
          <q-item v-for="(document, key) in documentList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="feed" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{ $t('documentType') }}: </b> {{ document.nombre }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/tipo_documento/info/' + document.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/tipo_documento/edit/' + document.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteDocument(document.id)">
                      <q-item-section>
                        <q-icon name='delete' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('delete') }}</q-item-section>
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
      <q-btn :to="'tipo_documento/create'" padding="sm" fab icon="add" color="green" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDocument } from "stores/document";
import moment from "moment";

export default {
  name: "DocumentSection",
  setup() {
    const store = useDocument();
    const documentList = computed(() => store.getDocumentList);

    return {
      store,
      documentList,
    };
  },
  async mounted() {
    await this.store.getApiDocument();
  },
  methods: {
    async deleteDocument(document_id) {
      await this.store.deleteDocument(document_id);
      await this.store.getApiDocument();
    },
  },
};
</script>
