<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">Listado de noticias</p>
      </div>
      <div v-if="newsList.length == 0" class="col-12">
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
          <q-item v-for="(news, key) in newsList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="feed" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>Titulo: </b> {{ news.titulo }} | <b>Autor: </b>
                {{ news.autor }}
              </q-item-label>
              <q-item-label caption lines="3">
                <b>Cuerpo: </b> {{ news.cuerpo }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/news/info/' + news.id">
                      <q-item-section>Ver mas</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Editar</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteNews(news.id)">
                      <q-item-section>Borrar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :to="'news/create'" fab icon="add" color="green" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNews } from "stores/news";

export default {
  name: "NewsSection",
  setup() {
    const store = useNews();
    const newsList = computed(() => store.getNewsList);

    return {
      store,
      newsList,
    };
  },
  async mounted() {
    await this.store.getApiNews();
  },
  methods: {
    async deleteNews(news_id) {
      await this.store.deleteNews(news_id);
      await this.store.getApiNews();
    },
  },
};
</script>
