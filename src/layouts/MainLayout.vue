<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Kenwin Backoffice </q-toolbar-title>
        <q-btn :to="'config'" stretch flat icon="settings" :label="$t('config')" />
        <q-btn @click="logout()" stretch flat icon="logout" :label="$t('logout')" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list bordered class="rounded-borders">

        <q-item-label header> {{ $t('administration') }} </q-item-label>

        <q-item clickable tag="a" :to="'/'">
          <q-item-section avatar>
            <q-icon :name="'home'" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t('home.title') }}</q-item-label>
            <q-item-label caption>{{ $t('home.caption') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" :to="'/contact_forms'">
          <q-item-section avatar>
            <q-icon :name="'record_voice_over'" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t('contact.title') }}</q-item-label>
            <q-item-label caption>{{ $t('contact.caption') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" :to="'/news'">
          <q-item-section avatar>
            <q-icon :name="'feed'" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t('news.title') }}</q-item-label>
            <q-item-label caption>{{ $t('news.caption') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-expansion-item :content-inset-level="0.5" expand-separator icon="source" :label="$t('downloads.title')"
          :caption="$t('downloads.caption')">

          <q-item clickable tag="a" :to="'/downloads'">
            <q-item-section avatar>
              <q-icon :name="'source'" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('downloads.title') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable tag="a" :to="'/tipo_documento'">
            <q-item-section avatar>
              <q-icon :name="'source'" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('documentTypes') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable tag="a" :to="'/tipo_norma'">
            <q-item-section avatar>
              <q-icon :name="'source'" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('normTypes') }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-expansion-item>
        
        <q-expansion-item :content-inset-level="0.5" expand-separator icon="source" :label="$t('trainings.title')"
          :caption="$t('trainings.caption')">

          <q-item clickable tag="a" :to="'/training'">
            <q-item-section avatar>
              <q-icon :name="'source'" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('trainings.list') }}</q-item-label>
              <q-item-label caption>{{ $t('trainings.list_caption') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable tag="a" :to="'/training/purchases'">
            <q-item-section avatar>
              <q-icon :name="'shopping_cart'" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ $t('trainings.purchases.purchases_section') }}</q-item-label>
              <q-item-label caption>{{ $t('trainings.purchases.purchases_caption') }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-expansion-item>
      </q-list>

      <!--q-list>
        <q-item-label header> {{ $t('administration') }} </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list-->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
//import EssentialLink from "components/EssentialLink.vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "home.title",
    caption: "home.caption",
    icon: "home",
    link: "/",
  },
  {
    title: "contact.title",
    caption: "contact.caption",
    icon: "record_voice_over",
    link: "/contact_forms",
  },
  {
    title: "news.title",
    caption: "news.caption",
    icon: "feed",
    link: "/news",
  },
  {
    title: "downloads.title",
    caption: "downloads.caption",
    icon: "download",
    link: "/downloads",
  },
  {
    title: "trainings.title",
    caption: "trainings.caption",
    icon: "source",
    link: "/training",
  },
];

export default defineComponent({
  name: "MainLayout",

  /*components: {
    EssentialLink,
  },*/

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useAuth();
    const router = useRouter();

    store.$i18n.global.locale = store.getLang;

    return {
      store,
      router,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    async logout() {
      await this.store.logoutUser(this.data);
      this.router.push({ path: "/login" });
    },
  },
});
</script>
