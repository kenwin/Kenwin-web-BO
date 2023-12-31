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
          <q-item-section>
            <div class="text-h5">{{$t('newsUpdate')}}</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.epigrafe" filled :label="$t('epigrafe')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.titulo" filled :label="$t('newsTitle')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.subtitulo" filled :label="$t('subtitle')" />
          </q-item-section>
        </q-item>
        <q-item>
              <q-item-section>
                <q-input v-model="newsData.keywords" filled label="Keywords" placeholder="Ej: kenwin, soluciones, people, etc" />
              </q-item-section>
            </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="newsData.categories" filled multiple :options="categoriesList" :label="$t('categories')"
              option-value="id" option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="newsData.destacada"
            :label="$t('starred')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>

            <q-input filled v-model="newsData.fecha_alta" :label="$t('activeDate')" @click="openCalendar"
              style="max-width: 300px">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date ref="datePicker" v-model="newsData.fecha_alta" mask="DD/MM/YYYY" :locale="myLocale">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="newsData.idioma" filled :options="idiomas" :label="$t('lang')" option-value="id"
              option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input @update:model-value="(val) => {
                newsData.image = val[0];
              }
              " filled type="file" :hint="$t('coverImage')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input @update:model-value="(val) => {
              newsData.video = val[0];
            }
              " filled type="file" :hint="$t('videoUpload')" />
          </q-item-section>
        </q-item>
          <q-item>
            <q-item-section>
              <ckeditor :editor="editor" v-model="newsData.cuerpo" :config="editorConfig"></ckeditor>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input v-model="newsData.autor" filled :label="$t('author')" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-btn @click="onSubmit()" color="green" :label="$t('newsUpdate')" />
            </q-item-section>
          </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNews } from "stores/news";
import { useCategories } from "stores/categories";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";

export default {
  name: "NewsEdit",
  props: ["news_id"],
  setup() {
    const store = useNews();
    const router = useRouter();
    const categoriesList = computed(() => useCategories().getCategoriesList);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      categoriesList,
      idiomas: [
        {
          id: 'esp',
          nombre: 'Español'
        },
        {
          id: 'por',
          nombre: 'Portugués'
        }
      ],
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
      this.getNews(this.news_id).then(() => {
        this.newsData.fecha_alta = moment(this.newsData.fecha_alta).format('DD/MM/YYYY');
      });
    } else {
      this.router.push({ path: "/news" });
    }
  },
  methods: {
    async getNews(news_id) {
      await this.store.getNewsById(news_id);
    },
    async onSubmit() {
      if (this.newsData.idioma && this.newsData.idioma.id) {
        this.newsData.idioma = this.newsData.idioma.id;
      }

      const categoryIds = this.newsData.categories.map(category => category.id);
      this.newsData.categories = categoryIds;

      await this.store.editNews(this.news_id).then(() => {
        this.router.push({ path: "/news" });
      });
    },
  },
};
</script>
