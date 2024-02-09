<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('trainings.purchases.purchases_caption') }}</p>
      </div>
      <div v-if="purchasesList.length == 0" class="col-12">
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-else class="col-12">
        <q-list bordered separator>
          <q-item v-for="(purchase, key) in purchasesList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="shopping_cart" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{ $t('name') }}: </b> {{ purchase.training.name }} | <b>Comprador:</b> {{ purchase.owner_user.name }}
                {{ purchase.owner_user.last_name }}
              </q-item-label>
              <q-item-label>
                <b>Estado de la compra: </b>
                <q-badge :color="statusColor(purchase.purchase_status)">
                  {{ purchase.purchase_status }}
                </q-badge> | <b>Metodo de pago:</b> {{
                  purchase.payment_method }} | <b>Fecha de la compra:</b> {{ formatDate(purchase.created_at) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu auto-close>
                  <q-list class="q-px-xs q-py-xs">
                    <q-item clickable :to="'/training/purchase_management/' + purchase.id">
                      <q-item-section>
                        <q-icon name='visibility' size='xs' />
                      </q-item-section>
                      <q-item-section class="q-px-xs" style="min-width: 120px">Gestionar compra</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useTraining } from "stores/training";
import moment from "moment";

export default {
  name: "PurchasesSection",
  setup() {
    const store = useTraining();
    const purchasesList = computed(() => store.getTrainingPurchases);

    return {
      store,
      purchasesList,
    };
  },
  async mounted() {
    await this.store.getApiPurchases();
  },
  methods: {
    formatDate(date) {
      return moment(String(date)).format("DD/MM/YYYY hh:mm");
    },
    statusColor(status) {
      if (status == "pending")
        return 'red'
      else if (status == "processing")
        return 'orange'
      else if (status == "paid")
        return 'green'
    }
  },
};
</script>
