<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Kenwin Backoffice </q-toolbar-title>
        <q-btn :to="'config'" stretch flat icon="settings" :label="$t('config')" />
        <q-btn @click="logout()" stretch flat icon="logout" :label="$t('logout')" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> {{ $t('administration') }} </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import EssentialLink from "components/EssentialLink.vue";
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

  components: {
    EssentialLink,
  },

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
