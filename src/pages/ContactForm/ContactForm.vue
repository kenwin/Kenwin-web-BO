<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn
              outline
              round
              color="primary"
              icon="west"
              to="/contact_forms"
            />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">
              Formulario de contacto - {{ formSelected.name }}
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Nombre:</b> {{ formSelected.name }}
              {{ formSelected.last_name }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Empresa:</b> {{ formSelected.company || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Pais:</b> {{ formSelected.country || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Email:</b> {{ formSelected.email || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Telefono:</b> {{ formSelected.phone || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h7">
              <b>Mensaje:</b> {{ formSelected.message }}
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useContactForm } from "stores/contactForm";
import { useRouter } from "vue-router";

export default {
  name: "ContactForms",
  props: ["form_id"],
  setup() {
    const store = useContactForm();
    const router = useRouter();
    const formSelected = computed(() => store.getForm);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      formSelected,
      loading,
    };
  },
  mounted() {
    console.log(this.form_id);
    if (this.form_id) {
      this.getContactForm(this.form_id);
    } else {
      this.router.push({ path: "/contact_forms" });
    }
  },
  methods: {
    async getContactForm(form_id) {
      await this.store.getFormById(form_id);
    },
  },
};
</script>
