import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { useAuth } from "stores/auth";

export default ({ app }) => {
  const store = useAuth(); 
  const i18n = createI18n({
    locale: store.lang === 'Port' ? 'pt' : 'es',
    globalInjection: true,
    messages
  });

  store.$i18n = i18n;
  i18n.global.locale = store.lang === 'Port' ? 'pt' : 'es';

  app.use(i18n);
}