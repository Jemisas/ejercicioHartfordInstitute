// Routing Module

import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import PageNotFoundComponent from "@/public/pages/page-not-found.component.vue";
import ExaminerPerfomanceOverviewComponentPage from "@/nursing/pages/examiner-perfomance-overview.component-page.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home',      component: HomeComponent,         meta: { title: 'Home' }, },
        { path: '/nursing/examiner-performance-overview',      component: ExaminerPerfomanceOverviewComponentPage,         meta: { title: 'Examiner Performance Overview' }, },
        { path: '/',          redirect: '/home' },
        { path: '/:catchAll(.*)', component: PageNotFoundComponent, meta: { title: 'Page Not Found' } }
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'TechnoGym TechnoRun Analytics';
    document.title = `${ baseTitle } | ${to.meta["title"]}`;
    next();
});
export default router;