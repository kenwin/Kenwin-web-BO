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
            ><div class="text-h5">Editar noticia</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="newsData.epigrafe"
              filled
              label="Epigrafe (opcional)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="newsData.titulo"
              filled
              label="Titulo (Usado para generar el Slug)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.subtitulo" filled label="Subtitulo" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  newsData.image = val[0];
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
            <ckeditor
              :editor="editor"
              v-model="newsData.cuerpo"
              :config="editorConfig"
            ></ckeditor>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.autor" filled label="Autor" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Guardar noticia" />
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "NewsEdit",
  props: ["news_id"],
  setup() {
    const store = useNews();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      file: ref(null),
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  data() {
    return {};
  },
  computed: {
    newsData: {
      get() {
        return this.store.getNews;
      },
      set(newValue) {
        this.store.setNews(newValue);
      },
    },
  },
  mounted() {
    if (this.news_id) {
      this.getNews(this.news_id);
    } else {
      this.router.push({ path: "/news" });
    }
  },
  methods: {
    async getNews(news_id) {
      await this.store.getNewsById(news_id);
    },
    async onSubmit() {
      await this.store.editNews(this.news_id).then(() => {
        this.router.push({ path: "/news" });
      });
    },
  },
};
</script>
