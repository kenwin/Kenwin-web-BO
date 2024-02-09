<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
          <q-item>
            <q-item-section avatar>
              <q-btn outline round color="primary" icon="west" to="/downloads" />
            </q-item-section>
            <q-item-section>
              <div class="text-h5">
                {{ $t('reports') }}
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      <q-list bordered separator class="col-12">
        <q-item v-for="(report, key) in reportsList" :key="key" :report="report">

          <q-item-section avatar top>
            <q-avatar icon="download" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <b>{{ $t('filename') }}: </b> {{ report.name }} |
              <b>{{ $t('downloadsCount') }}: </b>
              {{ report.downloads_count }}
              <q-badge v-if="report.version" color="blue" style="margin-left: 5px">
                  {{ $t('version') }}: {{ report.version }}
              </q-badge>
              <q-chip color="primary" text-color="white" class="float-right" v-if="report.language == 'esp'">
                <q-avatar>
                  <img :src="'icons/esp.png'">
                </q-avatar>
                ESP
              </q-chip>
              <q-chip color="primary" text-color="white" class="float-right" v-else>
                  <q-avatar>
                    <img :src="'icons/por.png'">
                  </q-avatar>
                  POR
                </q-chip>
              <q-badge color="green" v-if="report.document_type" style="margin-left: 5px">
                Tipo: {{ report.document_type }}
              </q-badge>
              <q-badge v-if="report.last_updated" color="blue" style="margin-left: 5px">
                {{ $t('lastUpdate') }}: {{ formatDate(report.last_updated) }}
              </q-badge>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item clickable :to="'/reports/info/' + report.id">
              <q-item-section>
                <q-icon name='visibility' size='xs' />
              </q-item-section>
              <q-item-section>{{ $t('data') }}</q-item-section>
            </q-item>
          </q-item-section>
        </q-item>
      </q-list>
      </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "ReportsSection",
  setup() {
    const store = useDownloads();
    const reportsList = computed(() => store.getReportsList);

    return {
      fabLeft: ref(false),
      store,
      reportsList,
    };
  },
  async mounted() {
    await this.store.getApiReports();
  },
  methods: {
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    }
  },
};
</script>
