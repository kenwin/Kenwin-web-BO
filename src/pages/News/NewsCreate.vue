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
            <div class="text-h5">{{ $t('newsCreate') }}</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="form.epigrafe" filled :label="$t('epigrafe')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.titulo" filled :label="$t('newsTitle')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.subtitulo" filled label="Subtitulo" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.keywords" filled label="Keywords"
              placeholder="Ej: kenwin, soluciones, people, etc" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="form.categories" filled multiple :options="categoriesList" :label="$t('categories')"
              option-value="id" option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="form.destacada" :label="$t('starred')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input filled v-model="form.fecha_alta" :label="$t('activeDate')" style="max-width: 300px">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date ref="datePicker" v-model="form.fecha_alta" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Cerrar" color="primary" flat />
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
            <q-select v-model="form.idioma" filled :options="idiomas" :label="$t('lang')" option-value="id"
              option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="form.allow_comments" :label="$t('allowComments')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input @update:model-value="(val) => {
      form.image = val[0];
    }
      " filled type="file" :hint="$t('coverImage')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input @update:model-value="(val) => {
      form.video = val[0];
    }
      " filled type="file" :hint="$t('videoUpload')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="form.video_top" :label="$t('videoTop')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div id="container">
              <div id="editor">
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.autor" filled :label="$t('author')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" :label="$t('newsCreate')" />
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
import { loadScript } from "vue-plugin-load-script";

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
        editor: null,
        cuerpo: "<p>body de la noticia</p>",
        autor: "",
        allow_comments: true,
        image: ref(null),
        video: ref(null),
        video_top: false
      },
    };
  },
  mounted() {
    Promise.all([
      loadScript("/js/ckeditor.js"),
      loadScript("/js/es.js")
    ]).then(() => {
    CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
      // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
      toolbar: {
        items: [
          'exportPDF', 'exportWord', '|',
          'findAndReplace', 'selectAll', '|',
          'heading', '|',
          'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
          'bulletedList', 'numberedList', 'todoList', '|',
          'outdent', 'indent', '|',
          'undo', 'redo',
          '-',
          'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
          'alignment', '|',
          'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
          'specialCharacters', 'horizontalLine', 'pageBreak', '|',
          'textPartLanguage', '|',
          'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
      },
      // Changing the language of the interface requires loading the language file using the <script> tag.
      language: 'es',
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
      placeholder: 'Welcome to CKEditor 5!',
      // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
      fontFamily: {
        options: [
          'Encode Sans, Encode Sans Condensed',
          'default',
          'Arial, Helvetica, sans-serif',
          'Courier New, Courier, monospace',
          'Georgia, serif',
          'Lucida Sans Unicode, Lucida Grande, sans-serif',
          'Tahoma, Geneva, sans-serif',
          'Times New Roman, Times, serif',
          'Trebuchet MS, Helvetica, sans-serif',
          'Verdana, Geneva, sans-serif',
        ],
        supportAllValues: true
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
      },
      // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
      // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
      htmlSupport: {
        allow: [
          {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
          }
        ]
      },
      // Be careful with enabling previews
      // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
      htmlEmbed: {
        showPreviews: true
      },
      mediaEmbed: { previewsInData: true },
      // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
      link: {
        decorators: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [
              '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
              '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
              '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
              '@sugar', '@sweet', '@topping', '@wafer'
            ],
            minimumCharacters: 1
          }
        ]
      },
      // The "super-build" contains more premium features that require additional configuration, disable them below.
      // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
      removePlugins: [
        // These two are commercial, but you can try them out without registering to a trial.
        // 'ExportPdf',
        // 'ExportWord',
        //'CKBox',
        //'CKFinder',
        'EasyImage',
        // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
        // Storing images as Base64 is usually a very bad idea.
        // Replace it on production website with other solutions:
        // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
        // 'Base64UploadAdapter',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
        // from a local file system (file://) - load this site via HTTP server if you enable MathType
        'MathType'
      ]
    }).then(editor => {
      this.editor = editor;

      // Configurar el evento input para capturar cambios en el contenido del editor
      editor.model.document.on("change:data", () => {
        this.form.cuerpo = editor.getData();
      });

      // Si deseas establecer un contenido inicial, puedes hacerlo aquí
      editor.setData(this.form.cuerpo || '');
    }).catch(error => {
      console.error('Error al inicializar CKEditor:', error);
    })
  });
  },
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

<style>
@font-face {
  font-family: 'Encode Sans';
  src: url('/src/assets/fonts/EncodeSans-Regular.woff2') format('woff2'),
    url('/src/assets/fonts/EncodeSans-Regular.woff') format('woff');
}

.ck-content,
.ck-heading_paragraph,
.ck-heading_heading1,
.ck-heading_heading2,
.ck-heading_heading3,
.ck-heading_heading4,
.ck-heading_heading5,
.ck-heading_heading6 {
  font-family: 'Encode Sans', sans-serif;
}
</style>
