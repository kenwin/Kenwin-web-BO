<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="bg-cyan window-height window-width row justify-center items-center"
      >
        <q-inner-loading v-if="loading" :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
        <div v-else class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md" size="lg">
              {{ $t('newSession') }} | Kenwin Backoffice
            </h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    v-model="data.email"
                    type="email"
                    label="Email"
                  />
                  <q-input
                    square
                    filled
                    v-model="data.password"
                    type="password"
                    :label="$t('pass')"
                    @keyup.enter="login()"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="cyan-7"
                  size="lg"
                  class="full-width"
                  label="Ingresar"
                  @click="login()"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginComponent",
  setup() {
    const store = useAuth();
    const router = useRouter();
    const loading = store.getLoading;
    return {
      store,
      router,
      loading,
    };
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      await this.store.logginUser(this.data);
      if (this.store.getToken) {
        const lang = this.store.getLang === 'Port' ? 'pt' : 'es';
        this.store.changeLanguage(lang);
        this.router.push({ path: "/" });
      } else {
        this.$q.notify({
          type: "negative",
          message: this.$t('wrongCred')
        });
      }
    },
  },
};
</script>

<style scoped>
.q-card {
  width: 450px;
}
</style>
