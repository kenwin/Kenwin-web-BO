import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { useAuth } from "stores/auth";

export default ({ app }) => {
  const store = useAuth(); 
  const defaultLocale = 'es';
  const locale = store.lang === 'Port' ? 'pt' : 'es';
  const i18n = createI18n({
    locale: locale || defaultLocale,
    globalInjection: true,
    messages
  });

  store.$i18n = i18n;
  i18n.global.locale = locale

  app.use(i18n);
}