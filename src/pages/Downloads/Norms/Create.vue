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
          <q-item-section
            ><div class="text-h5">
              {{ $t('normTypeCreate') }}
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="norm.nombre"
              filled
              :label="$t('normType')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" :label="$t('normTypeCreate')" />
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

export default {
  name: "normCreateSection",
  setup() {
    const store = useNorm();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
    };
  },
  data() {
    return {
      norm: {
        nombre: "",
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      await this.store.createNorm(this.norm).then(() => {
        this.router.push({ path: "/tipo_norma" });
      });
    },
  },
};
</script>
