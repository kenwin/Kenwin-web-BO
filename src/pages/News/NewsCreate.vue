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
            ><div class="text-h5">Crear noticia</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.epigrafe"
              filled
              label="Epigrafe (opcional)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.titulo"
              filled
              label="Titulo (Usado para generar el Slug)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.subtitulo" filled label="Subtitulo" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  form.image = val[0];
                }
              "
              filled
              type="file"
              hint="Imagen de portada"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.cuerpo"
              filled
              type="textarea"
              label="Cuerpo de la noticia"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.autor" filled label="Autor" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Crear noticia" />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNews } from "stores/news";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "NewsCreate",
  setup() {
    const store = useNews();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      file: ref(null),
    };
  },
  data() {
    return {
      form: {
        epigrafe: "",
        titulo: "",
        subtitulo: "",
        cuerpo: "",
        autor: "",
        image: ref(null),
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      await this.store.createNews(this.form).then(() => {
        this.router.push({ path: "/news" });
      });
    },
  },
};
</script>
