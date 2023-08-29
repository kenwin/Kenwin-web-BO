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
        <q-btn @click="logout()" stretch flat label="Cerrar sesion" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Administración </q-item-label>

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
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Home",
    caption: "Pagina principal",
    icon: "home",
    link: "/",
  },
  {
    title: "Contacto",
    caption: "Formularios de contacto",
    icon: "record_voice_over",
    link: "/contact_forms",
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
