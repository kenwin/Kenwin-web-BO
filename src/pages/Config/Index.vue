<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/home" />
          </q-item-section>
          <q-item-section>
            <div class="text-h5">{{ $t('myData') }}</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="user.name"
              filled
              readonly
              :label="$t('name')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="user.lang"
              filled
              :options="idiomas"
              :label="$t('lang')"
              option-value="id"
              option-label="nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" icon="edit" :label="$t('update')" />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuth } from "stores/auth";
import { Notify } from 'quasar';

export default defineComponent({
  name: "ConfigIndex",

  setup() {
    const store = useAuth();

    return {
      store,

    };
  },
  data() {
    return {
      user: {},
      idiomas: [
        {
          id: "Esp",
          nombre: "Español",
        },
        {
          id: "Port",
          nombre: "Portugués",
        },
      ],
      idioma: ''
    };
  },
  mounted() {
      this.user = this.store.getUser
      const lang = this.store.getLang === 'Port' ? 'pt' : 'es';
  },
  methods: {
    async onSubmit() {
      this.idioma = this.user.lang;
      try {
        let result = await this.store.updateLanguage(this.user.id, this.idioma.id);

        if (result) {
          var idioma = this.idioma.id == 'Port' ? 'pt' : 'es';
          this.store.$i18n.global.locale = this.idioma.id === 'Port' ? 'pt' : 'es';

          Notify.create({
            message: this.$t('updateSuccess'),
            color: 'positive',
            position: 'top',
          });
          this.$router.push({ path: "/" });
        } else {
          Notify.create({
            message: this.$t('error'),
            color: 'negative',
            position: 'top',
          });
        }
      } catch (error) {
        console.error("Error during updateLanguage:", error);
        alert(this.$t('error'));
      }
    },
  },
});
</script>
