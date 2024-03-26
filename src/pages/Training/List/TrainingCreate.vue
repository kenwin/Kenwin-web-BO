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
            ><div class="text-h5">{{ $t('trainingCreate') }}</div></q-item-section
          >
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item>
          <q-item-section>
            <q-input v-model="form.name" filled :label="$t('name')" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input v-model="form.date_start" filled :label="$t('startDate')">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="form.date_start" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          :label="$t('close')"
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
            <q-input v-model="form.date_end" filled :label="$t('endDate')">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="form.date_end" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          :label="$t('close')"
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
            <q-input
              v-model="form.duration_description"
              filled
              :label="$t('durationDescription')"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              v-model="form.id_training_go4click"
              filled
              :label="'Id interno Go4click'"
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
              :label="$t('trainingCreate')"
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import { unloadScript } from "vue-plugin-load-script";

export default {
  name: "NewsCreate",
  setup() {
    const store = useTraining();
    const router = useRouter();
    const loading = computed(() => store.getLoading);

    Promise.all([
      unloadScript("/js/ckeditor.js"),
      unloadScript("/js/es.js")
    ])

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
        id_training_go4click: "",
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
