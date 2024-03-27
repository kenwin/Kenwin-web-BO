<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('normTypeList') }}</p>
      </div>
      <div v-if="normList.length == 0" class="col-12">
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
          <q-item v-for="(norm, key) in normList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="feed" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{ $t('normType') }}: </b> {{ norm.nombre }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/tipo_norma/info/' + norm.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/tipo_norma/edit/' + norm.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 80px">{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteNorm(norm.id)">
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
      <q-btn :to="'tipo_norma/create'" padding="sm" fab icon="add" color="green" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNorm } from "stores/norm";
import moment from "moment";

export default {
  name: "NormSection",
  setup() {
    const store = useNorm();
    const normList = computed(() => store.getNormList);

    return {
      store,
      normList,
    };
  },
  async mounted() {
    await this.store.getApiNorm();
  },
  methods: {
    async deleteNorm(norm_id) {
      await this.store.deleteNorm(norm_id);
      await this.store.getApiNorm();
    },
  },
};
</script>
