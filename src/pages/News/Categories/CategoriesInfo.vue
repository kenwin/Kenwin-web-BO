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
            <div class="text-h5">{{ $t('categoryInfo') }}</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('title') }}:</b> {{ categorySelected.nombre }}
            </div>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{ $t('created') }}:</b> {{ formatDate(categorySelected.created_at) }}
            </div>
          </q-item-section>
        </q-item>
      </div>
      <div class="col-12">
        <q-list bordered separator>
          <q-item v-for="(noticia, key) in categorySelected.news" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="download" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{ $t('title') }}: </b> {{ noticia.titulo }} | <b>{{ $t('author') }}: </b>
                {{ noticia.autor }}
              </q-item-label>
              <q-item-label caption lines="3">
                <b>{{ $t('body') }}: </b> {{ noticia.cuerpo }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item clickable :to="'/news/info/' + noticia.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('show') }}</q-item-section>
                    </q-item>
                    <q-item clickable :to="'/news/edit/' + noticia.id">
                      <q-item-section>
                        <q-icon name='edit' size='xs'/>
                      </q-item-section>
                      <q-item-section>{{ $t('edit') }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteNews(noticia.id)">
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
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useCategories } from "stores/categories";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "CategoriesInfo",
  props: ["category_id"],
  setup() {
    const store = useCategories();
    const router = useRouter();
    const categorySelected = computed(() => store.getCategories);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      categorySelected,
      loading,
    };
  },
  mounted() {
    console.log(process.env.API_URL);
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
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
    async removeCategory(section_id) {
      await this.store.deleteCategory(section_id);
      this.router.push({ path: "/news" });
    },
  },
};
</script>
