const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { 
        path: "",
        component: () => import("pages/IndexPage.vue") 
      },
      { 
        path: "contact_forms",
        component: () => import("pages/ContactForms.vue") 
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
