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
