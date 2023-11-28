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
            <div class="text-h5">Crear noticia</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.epigrafe"
              filled
              label="Epigrafe (opcional)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.titulo"
              filled
              label="Titulo (Usado para generar el Slug)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.subtitulo" filled label="Subtitulo" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.keywords"
              filled
              label="Keywords"
              placeholder="Ej: kenwin, soluciones, people, etc"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="form.categories"
              filled
              multiple
              :options="categoriesList"
              label="Categorías"
              option-value="id"
              option-label="nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox
              size="lg"
              val="lg"
              v-model="form.destacada"
              label="Destacada (ésta acción reemplazará la actual noticia destacada)"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              filled
              v-model="form.fecha_alta"
              label="Fecha de alta"
              style="max-width: 300px"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      ref="datePicker"
                      v-model="form.fecha_alta"
                      mask="DD/MM/YYYY"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Cerrar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="form.idioma"
              filled
              :options="idiomas"
              label="Idioma"
              option-value="id"
              option-label="nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  form.image = val[0];
                }
              "
              filled
              type="file"
              hint="Imagen de portada"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  form.video = val[0];
                }
              "
              filled
              type="file"
              hint="Subir video"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <ckeditor
              :editor="editor"
              v-model="form.cuerpo"
              :config="editorConfig"
            ></ckeditor>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.autor" filled label="Autor" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" label="Crear noticia" />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useNews } from "stores/news";
import { useCategories } from "stores/categories";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "NewsCreate",
  setup() {
    const store = useNews();
    const router = useRouter();
    const categoriesList = computed(() => useCategories().getCategoriesList);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      loading,
      categoriesList,
      idiomas: [
        {
          id: "esp",
          nombre: "Español",
        },
        {
          id: "por",
          nombre: "Portugués",
        },
      ],
      file: ref(null),
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      myLocale: {
        days: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),
        daysShort: "Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),
        months:
          "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
          ),
        monthsShort: "Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split(
          "_"
        ),
        firstDayOfWeek: 1,
        format24h: true,
        pluralDay: "días",
      },
    };
  },
  data() {
    return {
      form: {
        epigrafe: "",
        titulo: "",
        subtitulo: "",
        keywords: "",
        categories: [],
        idioma: "",
        destacada: false,
        fecha_alta: "",
        cuerpo: "<p>Cuerpo de la noticia</p>",
        autor: "",
        image: ref(null),
        video: ref(null),
      },
    };
  },
  mounted() {},
  methods: {
    async onSubmit() {
      this.form.idioma = this.form.idioma.id;
      const categoryIds = this.form.categories.map((category) => category.id);
      this.form.categories = categoryIds;

      await this.store.createNews(this.form).then(() => {
        this.router.push({ path: "/news" });
      });
    },
  },
};
</script>
