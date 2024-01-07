<template>
  <q-page>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-h5">{{ $t('contact.caption')}}</p>
      </div>
      <div v-if="contactFormList.length == 0" class="col-12">
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
          <q-item v-for="(form, key) in contactFormList" :key="key">
            <q-item-section avatar top>
              <q-avatar icon="inbox" color="primary" text-color="white" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <b>{{ $t('name')}}: </b> {{ form.name }} {{ form.last_name }} |
                <b>Email: </b> {{ form.email }} | <b>{{ $t('phone')}}: </b
                >{{ form.phone }} | <b>{{ $t('country')}}: </b>{{ form.country }}
              </q-item-label>
              <q-item-label caption>
                <b>{{ $t('message')}}: </b> {{ form.message }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                :to="'/contact_form/' + form.id"
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="visibility"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from "vue";
import { useContactForm } from "stores/contactForm";

export default {
  name: "ContactForms",
  setup() {
    const store = useContactForm();
    const contactFormList = computed(() => store.getFormList);

    return {
      store,
      contactFormList,
    };
  },
  async mounted() {
    await this.store.getFormsList();
  },
};
</script>
