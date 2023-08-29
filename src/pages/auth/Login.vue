<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="bg-cyan window-height window-width row justify-center items-center"
      >
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md" size="lg">Iniciar Sesión</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="data.email"
                    type="email"
                    label="email"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="data.password"
                    type="password"
                    label="contraseña"
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
import { useAuth } from "stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginComponent",
  setup() {
    const store = useAuth();
    const router = useRouter();
    return {
      store,
      router,
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
      this.router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.q-card {
  width: 450px;
}
</style>
