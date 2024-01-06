<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">Listado de categorías de noticias</p>
      </div>
      <div v-if="categoriesList.length == 0" class="col-12">
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
          <q-item v-for="(category, key) in categoriesList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="feed" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>Nombre de la categoría: </b> {{ category.nombre }} |
                <b>Fecha de creacion: </b>
                {{ formatDate(category.created_at) }}
                <b>Cantidad de noticias: </b> {{ category.news.length }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/categorias/' + category.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/categorias/edit/' + category.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="removeCategory(category.id)">
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
                    <q-item clickable icon='logout' :to="'/news/info/' + news.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>
                        {{ $t('show') }}
                      </q-item-section>
                    </q-item>
                    <q-item clickable :to="'/news/edit/' + news.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="removeNews(news.id)">
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
      <q-fab v-model="fabLeft" vertical-actions-align="right" padding="sm" color="green" icon="add" direction="left">
        <q-fab-action label-position="right" color="primary" icon="add" label="Crear noticia" :to="'news/create'" />
        <q-fab-action label-position="right" color="primary" icon="add" label="Crear categoría"
          :to="'categorias/create'" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useCategories } from "stores/categories";
import { useNews } from "stores/news";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "CategoriesSection",
  setup() {
    const store = useCategories();
    const storeNews = useNews();
    const categoriesList = computed(() => store.getCategoriesList);
    const newsList = computed(() => storeNews.getNewsList);

    return {
      fabLeft: ref(false),
      store,
      storeNews,
      categoriesList,
      newsList,
    };
  },
  async mounted() {
    await this.store.getApiCategories();
    await this.storeNews.getApiNews();
  },
  methods: {
    async removeCategory(section_id) {
      await this.store.deleteCategory(section_id);
      await this.store.getApiCategories();
    },
    async removeNews(news_id) {
      await this.store.deleteNews(news_id);
      await this.store.getApiNews();
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
  },
};
</script>
