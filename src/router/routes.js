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
        path: "downloads/sections/info/:download_id",
        name: "downloads_info_section",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Sections/Info.vue"),
      },
      {
        path: "downloads/sections/create",
        name: "downloads_create_section",
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Sections/Create.vue"),
      },
      {
        path: "downloads/sections/edit/:section_id",
        name: "downloads_edit_section",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Sections/Edit.vue"),
      },
      {
        path: "downloads/resources/create",
        name: "downloads_create_resource",
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Resources/Create.vue"),
      },
      {
        path: "downloads/resources/info/:download_id",
        name: "downloads_info_resources",
        props: true,
        meta: { requiresAuth: true },
        component: () => import("src/pages/Downloads/Resources/Info.vue"),
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
