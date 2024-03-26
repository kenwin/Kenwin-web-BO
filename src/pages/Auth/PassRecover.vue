<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-cyan window-height window-width row justify-center items-center">
        <q-inner-loading v-if="loading" :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
        <div v-else class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md" size="lg">
              Olvidé mi contraseña/Esqueci minha senha | Kenwin Backoffice
            </h5>
          </div>
          <div class="row justify-center items-center">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md" @submit.prevent="send">
                  <q-input square filled v-model="data.email" type="email" label="Email" />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn unelevated color="cyan-7" size="lg" class="full-width" label="Enviar" @click="send()" />
                <q-btn unelevated flat rounded color="cyan-7" class="q-my-xs full-width"
                  label="Ir al login/Ir para login" to="/" />
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
      },
    };
  },
  methods: {
    async send() {
      try {
        this.loading = true;
        await this.store.recoverPass(this.data);
        this.$q.notify({
          type: "positive",
          message: this.$t('recoverSuccess')
        });
      } catch (error) {
        if (error.message === 'error al recuperar') {
          this.$q.notify({
            type: "negative",
            message: this.$t('recoverError')
          });
        } else if (error.message === 'email vacio') {
          this.$q.notify({
            type: "negative",
            message: this.$t('emptyEmail')
          });
        } else if (error.response && error.response.data) {
          this.$q.notify({
            type: "negative",
            message: this.$t(error.response.data.message)
          });
        } else {
          this.$q.notify({
            type: "positive",
            message: this.$t('recoverSuccess')
          });
        }
      } finally {
        this.loading = false;
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
