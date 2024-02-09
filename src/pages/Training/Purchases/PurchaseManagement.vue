<template>
  <q-page>
    <q-inner-loading v-if="loading" :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div v-else class="row q-pa-sm">
      <div class="col-12 q-gutter-sm">
        <q-item>
          <q-item-section avatar>
            <q-btn outline round color="primary" icon="west" to="/training/purchases" />
          </q-item-section>
          <q-item-section>
            <div class="text-h5">
              Gestion de compra
            </div>
          </q-item-section>
        </q-item>
        <q-separator />
      </div>
      <div class="col-12">
        <q-item v-if="purchaseSelected.owner_user">
          <q-item-section>
            <div class="text-h6">
              <b>Nombre comprador:</b> {{ purchaseSelected.owner_user.name }} {{ purchaseSelected.owner_user.last_name }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Estado de la compra: </b>
              <q-badge :color="statusColor(purchaseSelected.purchase_status)">
                {{ purchaseSelected.purchase_status }}
              </q-badge>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-if="purchaseSelected.participants_ammount">
          <q-item-section>
            <div class="text-h6">
              <b>Cantidad de participantes:</b> {{ purchaseSelected.participants_ammount }}
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <div class="text-h6">
              <b>Fecha de compra:</b>
              {{ formatDate(purchaseSelected.created_at) || " " }}
            </div>
          </q-item-section>
        </q-item>
        <q-item v-if="purchaseSelected.receipt">
          <q-item-section>
            <div class="text-h6">
              <b>Comprobante de pago:</b> {{ purchaseSelected.receipt.resource_url || " " }}
              <q-badge :color="purchaseSelected.receipt.receipt_status == 'check' ? 'green' : 'orange'">
                {{ purchaseSelected.receipt.receipt_status }}
              </q-badge>
            </div>
            <div class="q-pa-md">
              <div class="q-gutter-md row">
                <q-img :src="imgUrl + purchaseSelected.receipt.resource_url" spinner-color="white"
                  style="max-width: 70%; height: 350px" />
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-if="purchaseSelected.billing">
          <q-item-section>
            <q-expansion-item expand-separator icon="perm_identity" label="Informacion de facturacion"
              class="shadow-1 overflow-hidden" style="border-radius: 30px" header-class="bg-primary text-white"
              expand-icon-class="text-white">
              <q-card>
                <q-card-section>
                  <q-list>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Razón social | nombre y apellido</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.business_name }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Identificación tributaria (NIT/CUIT/CUIL)</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.tax_id }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Condición frente al IVA</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.tax_condition }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Domicilio</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.address }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Ciudad</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.city }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Telefono</q-item-label>
                        <q-item-label>( {{ purchaseSelected.billing.phone_prefix }} ) - {{
                          purchaseSelected.billing.phone }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>E-mail</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.email }}</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="description" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label caption>Comentarios</q-item-label>
                        <q-item-label>{{ purchaseSelected.billing.notes }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-sm" />

        <div class="q-pa-sm q-gutter-sm">
          <q-btn color="orange" :disable="!purchaseSelected.receipt">
            <q-icon left name="receipt" />
            <div>Confirmar comprobante</div>
          </q-btn>
          <q-btn color="green" :disable="purchaseSelected.purchase_status != 'processing'" @click="confirm = true">
            <q-icon left name="check" />
            <div>Confirmar compra</div>
          </q-btn>
        </div>

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="check" color="primary" text-color="white" />
              <span class="q-ml-sm">Desea confirmar la compra del cliente?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn flat label="Confirmar compra" color="primary" v-close-popup @click="confirmPurchase()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, ref } from "vue";
import { useTraining } from "stores/training";
import { useRouter } from "vue-router";
import moment from "moment";

export default {
  name: "PurchaseManagement",
  props: ["purchase_id"],
  setup() {
    const store = useTraining();
    const router = useRouter();
    const purchaseSelected = computed(() => store.getPurchase);
    const loading = computed(() => store.getLoading);

    return {
      store,
      router,
      purchaseSelected,
      loading,
      confirm: ref(false),
    };
  },
  computed: {
    imgUrl() {
      return "http://localhost:8000/images/receipts/";
    },
  },
  mounted() {
    if (this.purchase_id) {
      this.getPurchase(this.purchase_id);
    } else {
      this.router.push({ path: "/training/purchases" });
    }
  },
  methods: {
    async getPurchase(purchase_id) {
      await this.store.getPurchaseById(purchase_id);
    },
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
    },
    async confirmPurchase() {
      await this.store.confirmPurchaseById(this.purchase_id);
      this.router.push({ path: "/training/purchases" });
    }
  },
};
</script>
