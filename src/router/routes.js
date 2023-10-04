const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        meta: { requiresAuth: true },
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "contact_forms",
        name: "contact_forms",
        meta: { requiresAuth: true },
        component: () => import("src/pages/ContactForm/ContactForms.vue"),
      },
      {
        path: "contact_form/:form_id",
        name: "contact_form",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/ContactForm/ContactForm.vue"),
      },
      {
        path: "news",
        name: "news",
        meta: { requiresAuth: true },
        component: () => import("src/pages/News/News.vue"),
      },
      {
        path: "news/info/:news_id",
        name: "news_info",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/News/NewsInfo.vue"),
      },
      {
        path: "news/create",
        name: "news_create",
        meta: { requiresAuth: true },
        component: () => import("src/pages/News/NewsCreate.vue"),
      },
      {
        path: "news/edit/:news_id",
        name: "news_edit",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/News/NewsEdit.vue"),
      },
      {
        path: "downloads",
        name: "downloads",
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Downloads.vue"),
      },
      {
        path: "downloads/info/:download_id",
        name: "downloads_info",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/DownloadsInfo.vue"),
      },
      {
        path: "downloads/create/section",
        name: "downloads_create_section",
        meta: { requiresAuth: true },
        component: () =>
          import("src/pages/Downloads/DownloadsCreateSection.vue"),
      },
      {
        path: "downloads/create/resource",
        name: "downloads_create_resource",
        meta: { requiresAuth: true },
        component: () =>
          import("src/pages/Downloads/DownloadsCreateResource.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("pages/Auth/Login.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
