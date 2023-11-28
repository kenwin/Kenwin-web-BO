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
            <div class="text-h5">Informacion de noticia</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6"><b>Titulo:</b> {{ newsSelected.titulo }} <q-chip square v-if="newsSelected.destacada" color="primary" text-color="white"
                icon="star">
                DESTACADA
              </q-chip>
              <q-chip color="primary" text-color="white"
                  icon="visibility">
                  {{ newsSelected.vistas }}
                </q-chip>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Subtitulo:</b> {{ newsSelected.subtitulo || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
            <q-item-section>
              <div class="text-h6">
                <b>Keywords:</b> {{ newsSelected.keywords || " " }}
              </div>
            </q-item-section>
          </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Epigrafe:</b> {{ newsSelected.epigrafe || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Categorías: </b>
              <template v-if="newsSelected.categories && newsSelected.categories.length">
                <span v-for="(category, index) in newsSelected.categories" :key="index">
                  {{ category.nombre }}
                  <span v-if="index < newsSelected.categories.length - 1">, </span>
                </span>
              </template>
              <template v-else>
                No hay categorías asociadas.
              </template>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
            <q-item-section>
              <div class="text-h6"><b>Idioma:</b> 
                <template v-if="newsSelected.idioma == 'esp'">
                  Español
                </template>
                <template v-else>
                  Portugués
                </template>
              </div>
            </q-item-section>
          </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Imagen de portada:</b> {{ newsSelected.imagen_portada || " " }}
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-md row">
                <q-img :src="imgUrl + newsSelected.imagen_portada" spinner-color="white"
                  style="max-width: 70%; height: 350px" />
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
            <q-item-section>
              <div class="text-h6">
                <b>Video:</b> {{ newsSelected.video || " " }}
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-md row">
                  <q-video :src="videoUrl + newsSelected.video" spinner-color="white"
                    style="max-width: 70%; height: 350px" />
                </div>
              </div>
            </q-item-section>
          </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Autor:</b> {{ newsSelected.autor || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6"><b>Cuerpo:</b></div>
            <div class="text-h7" v-html="newsSelected.cuerpo"></div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useNews } from "stores/news";
import { useRouter } from "vue-router";

export default {
  name: "NewsInfo",
  props: ["news_id"],
  setup() {
    const store = useNews();
    const router = useRouter();
    const newsSelected = computed(() => store.getNews);
    const loading = computed(() => store.getLoading);
    console.log(process.env.NODE_ENV)

    return {
      store,
      router,
      newsSelected,
      loading,
    };
  },
  computed: {
    imgUrl() {
      return process.env.NODE_ENV == 'development' ? "http://localhost:8000/images/news_images/" : "https://api2023.kenwin.net/images/news_images/";
    },
    videoUrl() {
      return process.env.NODE_ENV == 'development' ? "http://localhost:8000/storage/app/public/news_videos/" : "https://api2023.kenwin.net/storage/news_videos/";
    },
  },
  mounted() {
    console.log(process.env.API_URL);
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
    async removeNews(news_id) {
      await this.store.deleteNews(news_id);
      this.router.push({ path: "/news" });
    },
  },
};
</script>
