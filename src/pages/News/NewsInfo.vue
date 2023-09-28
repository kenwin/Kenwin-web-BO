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
            ><div class="text-h5">Informacion de noticia</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6"><b>Titulo:</b> {{ newsSelected.titulo }}</div>
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
              <b>Epigrafe:</b> {{ newsSelected.epigrafe || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Imagen de portada:</b> {{ newsSelected.imagen_portada || " " }}
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
            <div class="text-h7"><b>Cuerpo:</b> {{ newsSelected.cuerpo }}</div>
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

export default {
  name: "NewsInfo",
  props: ["news_id"],
  setup() {
    const store = useNews();
    const router = useRouter();
    const newsSelected = computed(() => store.getNews);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      newsSelected,
      loading,
    };
  },
  mounted() {
    console.log(this.news_id);
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
  },
};
</script>
