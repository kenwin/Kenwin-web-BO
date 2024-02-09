<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/downloads" />
          </q-item-section>
          <q-item-section
            ><div class="text-h5">
              {{ $t('createDownload')}}
            </div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input
              v-model="resource.name"
              filled
              :label="$t('resourceTitle')"
            />
          </q-item-section>
          <q-item-section v-if="nameError">
            <span class="text-negative">{{ $t('resourceTitleHelp') }}</span>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-checkbox
              size="lg"
              val="lg"
              v-model="resource.es_texto"
              :label="$t('textType')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="resource.public"
              filled
              :options="optionsPublic"
              :label="$t('publicResource')"
              option-value="id"
              option-label="label"
            />
          </q-item-section>
          <q-item-section v-if="publicError">
            <span class="text-negative">{{ $t('resourceVisibility') }}</span>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              v-model="resource.section"
              filled
              :options="downloadsList"
              :label="$t('resourceSection')"
              option-value="id"
              option-label="name"
            />
          </q-item-section>
          <q-item-section v-if="sectionError">
            <span class="text-negative">{{$t('sectionSelectHelp')}}</span>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              @update:model-value="
                (val) => {
                  resource.data = val[0];
                }
              "
              filled
              type="file"
              :hint="$t('resourceDownload')"
            />
          </q-item-section>
          <q-item-section v-if="dataError">
            <span class="text-negative">{{ $t('fileResource') }}</span>
          </q-item-section>
        </q-item>
          <q-item>
              <q-item-section>
                <q-input
                  v-model="resource.document_type"
                  filled
                :label="$t('documentType')"
                    />
              </q-item-section>
            </q-item>
          <q-item>
            <q-item-section>
              <q-input
                v-model="resource.norm_type"
                filled
                :label="$t('normType')"
                />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                v-model="resource.norm_name"
                filled
                :label="$t('normName')"
                />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                v-model="resource.version"
                filled
                :label="$t('version')"
                />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-input
                v-model="resource.last_updated"
                filled
                type="date"
                :label="$t('lastUpdate')"
                />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-select
                v-model="resource.language"
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
            <q-btn @click="onSubmit()" color="green" :label="$t('resourceCreate')" />
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { useRouter } from "vue-router";

export default {
  name: "DownloadsCreateResource",
  setup() {
    const store = useDownloads();
    const router = useRouter();
    const downloadsList = computed(() => store.getDownloadsList);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      downloadsList,
      loading,
      optionsPublic: [
        { id: 1, label: "Publico" },
        { id: 0, label: "Privado" },
      ],
      idiomas: [
        {
          id: "esp",
          nombre: "Español",
        },
        {
          id: "por",
          nombre: "Portugués",
        },
      ]
    };
  },
  data() {
    return {
      resource: {
        name: "",
        public: "",
        section: null,
        data: null,
        es_texto: false,
        document_type: "",
        norm_type: "",
        norm_name: "",
        version: "",
        last_updated: "",
        language: ""
      },
      sectionError: false,
      nameError: false,
      publicError: false,
      dataError: false,
    };
  },
  async mounted() {
    await this.store.getApiDownloads();
  },
  methods: {
    async onSubmit() {

      if (!this.resource.name) {
        this.nameError = true;
      } else {
        this.nameError = false;
      }

      if (!this.resource.public) {
        this.publicError = true;
      } else {
        this.publicError = false;
      }

      if (!this.resource.data) {
        this.dataError = true;
      } else {
        this.dataError = false;
      }

      if (!this.resource.section) {
        this.sectionError = true;
      } else {
        this.sectionError = false;
      }

      if (this.nameError || this.publicError || this.dataError || this.sectionError) {
        return;
      }

      this.sectionError = false;

      this.resource.language = this.resource.language.id;

      await this.store.createResource(this.resource).then(() => {
        this.router.push({ path: "/downloads" });
      });
    },
  },
};
</script>
