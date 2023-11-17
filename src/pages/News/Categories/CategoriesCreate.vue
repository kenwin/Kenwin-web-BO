<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/news" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">Crear categoría</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.nombre"
              filled
              label="Nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Crear categoría" />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useCategories } from "stores/categories";
import { useRouter } from "vue-router";

export default {
  name: "CategoriesCreate",
  setup() {
    const store = useCategories();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading
    };
  },
  data() {
    return {
      form: {
        nombre: ""
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      await this.store.createCategory(this.form);
      this.router.push({ path: "/news" });
    },
  },
};
</script>
