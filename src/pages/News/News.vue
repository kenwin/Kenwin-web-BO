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
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/news/edit/' + news.id">
                      <q-item-section>
                        <q-icon name='delete' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteNews(news.id)">
                      <q-item-section>
                        <q-icon name='delete' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('delete') }}</q-item-section>
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
      <q-fab v-model="fabLeft" padding="sm" vertical-actions-align="right" color="green" icon="add" direction="left">
        <q-fab-action label-position="right" color="primary" icon="add" label="Crear noticia" :to="'news/create'" />
        <q-fab-action label-position="right" color="primary" icon="add" label="Crear categoría"
          :to="'news/categories/create'" />
      </q-fab>
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
