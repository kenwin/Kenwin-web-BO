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
            <div class="text-h5">{{ $t('newsUpdate') }}</div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.epigrafe" filled :label="$t('epigrafe')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.titulo" filled :label="$t('newsTitle')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.subtitulo" filled :label="$t('subtitle')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.keywords" filled label="Keywords"
              placeholder="Ej: kenwin, soluciones, people, etc" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select v-model="newsData.categories" filled multiple :options="categoriesList" :label="$t('categories')"
              option-value="id" option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="newsData.destacada" :label="$t('starred')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>

            <q-input filled v-model="newsData.fecha_alta" :label="$t('activeDate')" @click="openCalendar"
              style="max-width: 300px">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date ref="datePicker" v-model="newsData.fecha_alta" mask="DD/MM/YYYY" :locale="myLocale">
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
            <q-select v-model="newsData.idioma" filled :options="idiomas" :label="$t('lang')" option-value="id"
              option-label="nombre" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="newsData.allow_comments" :label="$t('allowComments')" />
          </q-item-section>
        </q-item>
        <div class="row">
          <q-item class="col-12">
            <q-item-section>
              <q-input @update:model-value="(val) => {
      newsData.image = val[0];
    }" filled type="file" :hint="$t('coverImage')" />
            </q-item-section>
          </q-item>
          <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>{{$t('coverImage')}}:</b> {{ newsData.imagen_portada || " " }}
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-md row">
                <q-img :src="imgUrl + newsData.imagen_portada" spinner-color="white"
                  style="max-width: 70%; height: 350px" />
              </div>
            </div>
          </q-item-section>
        </q-item>

        </div>

        <div class="row">
          <q-item class="col-12">
            <q-item-section>
              <q-input @update:model-value="(val) => {
      newsData.video = val[0];
    }" filled type="file" :hint="$t('videoUpload')" />
            </q-item-section>
          </q-item>
          <q-item v-if="newsData.video">
            <q-item-section>
              <div class="text-h6">
                <b>Video:</b> {{ newsData.video || " " }}
              </div>
              <div class="q-pa-md">
                <div class="q-gutter-md row">
                  <q-video :src="videoUrl + newsData.video" spinner-color="white"
                    style="max-width: 70%; height: 350px" />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </div>
        <q-item>
          <q-item-section>
            <q-checkbox size="lg" val="lg" v-model="newsData.video_top" :label="$t('videoTop')" />
          </q-item-section>
        </q-item>
        <q-item v-if="newsData.cuerpo">
          <q-item-section>
            <div id="container">
              <div id="editor">
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="newsData.autor" filled :label="$t('author')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn @click="onSubmit()" color="green" :label="$t('newsUpdate')" />
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
import moment from "moment";
import { loadScript } from "vue-plugin-load-script";

loadScript("/js/ckeditor.js")
loadScript("/js/es.js")

export default {
  name: "NewsEdit",
  props: ["news_id"],
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
          id: 'esp',
          nombre: 'Español'
        },
        {
          id: 'por',
          nombre: 'Portugués'
        }
      ],
      file: ref(null)
    };
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    newsData: {
      get() {
        return this.store.getNews;
      },
      set(newValue) {
        this.store.setNews(newValue);
      },
    },
    baseUrl() {
      return process.env.NODE_ENV == 'development' ? "http://localhost:8000" : "https://api2023.kenwin.net";
    },
    imgUrl() {
      var api = process.env.NODE_ENV == 'development' ? "http://localhost:8000/" : "https://api2023.kenwin.net/";
      return api + "images/news_images/";
    },
    videoUrl() {
      var api = process.env.NODE_ENV == 'development' ? "http://localhost:8000/" : "https://api2023.kenwin.net/";
      return api + "storage/news_videos/";
    },
  },

  mounted() {
    if (this.news_id) {
      this.getNews(this.news_id).then(() => {
        this.newsData.fecha_alta = moment(this.newsData.fecha_alta).format('DD/MM/YYYY');
        Promise.all([
          loadScript("/js/ckeditor.js"),
          loadScript("/js/es.js")
        ]).then(() => {
          CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
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
            language: 'es',
            list: {
              properties: {
                styles: true,
                startIndex: true,
                reversed: true
              }
            },
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
            placeholder: 'Welcome to CKEditor 5!',
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
                'Verdana, Geneva, sans-serif'
              ],
              supportAllValues: true
            },
            fontSize: {
              options: [10, 12, 14, 'default', 18, 20, 22],
              supportAllValues: true
            },
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
            htmlEmbed: {
              showPreviews: true
            },
            mediaEmbed: { previewsInData: true },
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

            editor.model.document.on("change:data", () => {
              this.newsData.cuerpo = editor.getData();
            });

            //editor.setData(this.newsData.cuerpo);
            editor.setData(this.newsData.cuerpo || '');
          }).catch(error => {
            console.error('Error al inicializar CKEditor:', error);
          });
        });
      })
    } else {
      this.router.push({ path: "/news" });
    }
  },
  methods: {
    async getNews(news_id) {
      await this.store.getNewsById(news_id);
    },
    async onSubmit() {
      if (this.newsData.idioma && this.newsData.idioma.id) {
        this.newsData.idioma = this.newsData.idioma.id;
      }

      const categoryIds = this.newsData.categories.map(category => category.id);
      this.newsData.categories = categoryIds;

      await this.store.editNews(this.news_id).then(() => {
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
