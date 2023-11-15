<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/training" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">Crear capacitacion</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="form.name" filled label="Nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.date_start" filled label="Fecha de inicio" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.date_end" filled label="Fecha de fin" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.duration_description"
              filled
              label="Descripcion de la duracion"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <ckeditor
              :editor="editor"
              v-model="form.description"
              :config="editorConfig"
            ></ckeditor>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn
              @click="onSubmit()"
              color="green"
              label="Crear capacitacion"
            />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useTraining } from "stores/training";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "NewsCreate",
  setup() {
    const store = useTraining();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  data() {
    return {
      form: {
        name: "",
        date_start: "",
        date_end: "",
        duration_description: "",
        description: "<p>Descripcion de la capacitacion</p>",
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      await this.store.createTraining(this.form).then(() => {
        this.router.push({ path: "/training" });
      });
    },
  },
};
</script>
