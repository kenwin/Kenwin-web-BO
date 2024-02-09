<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/reports" />
          </q-item-section>
          <q-item-section>
            <div class="text-h5">
              {{ $t('report') }}: {{ report.length > 0 ? report[0].resource.name : '' }}
            <q-badge v-if="report.length > 0" color="blue" style="margin-left: 5px">
                {{ $t('version') }}: {{ report[0].resource.version }}
            </q-badge>
            <q-badge v-if="report.length > 0" color="blue" style="margin-left: 5px">
              {{ $t('lastUpdate') }}: {{ formatDate(report[0].resource.last_updated) }}
            </q-badge>
            <q-badge color="green" v-if="report.length > 0" style="margin-left: 5px">
              Tipo: {{ report[0].resource.document_type }}
            </q-badge>
            <q-chip color="primary" text-color="white" v-if="report.length > 0">
              <q-avatar v-if="report[0].resource.language == 'esp'">
                <img :src="'/icons/esp.png'">
              </q-avatar>
              <q-avatar v-else>
                <img :src="'/icons/por.png'">
              </q-avatar>
              {{ report[0].resource.language.toUpperCase() }}
            </q-chip>
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <q-list bordered separator class="col-12">
        <q-item v-for="(reportSelected, key) in report" :key="key" :download="report" :data-index="key">
          <q-item-section avatar top>
            <q-avatar icon="download" color="primary" text-color="white" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
                <b>{{ $t('downloadDate') }}:</b> {{ formatDate(reportSelected.created_at) }} -
                <b>{{ $t('user') }}:</b> {{ reportSelected.user ? reportSelected.user.name + ' ' + reportSelected.user.last_name : $t('anon')}}
                <q-btn color="primary" v-if="reportSelected.user" class="q-ml-sm" @click="openUserDetailsModal(reportSelected.id)">
                  <q-icon name="person" class="q-mr-sm"/>
                  {{ $t('userData') }}
                </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      </div>
      <q-dialog v-model="showUserDetailsModal">
      <q-card>
        <q-card-section>
          <div>
            <p><b>{{ $t('name') }}:</b> {{ userDetails.name }}</p>
            <p><b>{{ $t('lastName') }}:</b> {{ userDetails.last_name }}</p>
            <p><b>Email:</b> {{ userDetails.email }}</p>
            <p><b>{{ $t('company') }}:</b> {{ userDetails.company }}</p>
            <p><b>{{ $t('phone') }}:</b> {{ userDetails.phone }}</p>
            <p v-if="userDetails.country"><b>{{ $t('country') }}:</b> {{ userDetails.country }}</p>
            <p v-if="userDetails.area"><b>{{ $t('area') }}:</b> {{ userDetails.area }}</p>
            <p v-if="userDetails.position"><b>{{ $t('position') }}:</b> {{ userDetails.position }}</p>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Cerrar" @click="showUserDetailsModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useDownloads } from "stores/downloads";
import { ref } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "ReportInfo",  
  props: ["resource_id"],

  setup() {
    const store = useDownloads();
    const report = computed(() => store.getReport);
    const router = useRouter();

    return {
      fabLeft: ref(false),
      store,
      router,
      report
    };
  },
  data() {
    return {
      showUserDetailsModal: false, 
      selectedDownloadLogId: null, 
      userDetails: {}, 
    };
  },
  async mounted() {
    if (this.resource_id) {
      this.reportsSelected = await this.getReportId(this.resource_id);
    } else {
      this.router.push({ path: "/reports" });
    }
  },
  methods: {
    async getReportId(resource_id) {
      await this.store.getReportByResourceId(resource_id);
    },
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
    async openUserDetailsModal(downloadLogId) {
      this.selectedDownloadLogId = downloadLogId; 
      var downloadLog = this.report.find(item => item.id === downloadLogId);
      if (downloadLog) {
        this.userDetails = {
          name: downloadLog.user.name,
          last_name: downloadLog.user.last_name,
          email: downloadLog.user.email,
          company: downloadLog.user.company,
          phone: downloadLog.user.phone,
          country: downloadLog.user.country ? downloadLog.user.country.nombre : null,
          area: downloadLog.user.area ? downloadLog.user.area.nombre : null,
          position: downloadLog.user.position ? downloadLog.user.position.nombre : null
        };
      } else {
        console.error('No se encontró el downloadLog con el id:', downloadLogId);
      }
      this.showUserDetailsModal = true;
    }
  },
};
</script>
