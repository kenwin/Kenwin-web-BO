<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/categories" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">Editar categoría</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="categoriesData.nombre"
              filled
              label="Nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Guardar categoría" />
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
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "CategoriesEdit",
  props: ["category_id"],
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
    return {};
  },
  computed: {
    categoriesData: {
      get() {
        return this.store.getCategories;
      },
      set(newValue) {
        this.store.setCategories(newValue);
      },
    },
  },
  mounted() {
    if (this.category_id) {
      this.getCategories(this.category_id);
    } else {
      this.router.push({ path: "/news" });
    }
  },
  methods: {
    async getCategories(category_id) {
      await this.store.getCategoriesById(category_id);
    },
    async onSubmit() {
      await this.store.editCategories(this.category_id).then(() => {
        this.router.push({ path: "/news" });
      });
    },
  },
};
</script>
