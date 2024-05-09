import { createApp } from 'vue'
import './style.css'
import App from './app.vue'

// Import router
import router from "./router/index.js";

// PrimeVue
import PrimeVue from 'primevue/config';

// PrimeVue CSS
import 'primeflex/primeflex.css';

// PrimeVue Icons
import 'primeicons/primeicons.css';

// PrimeVue Material Design Theme
import 'primevue/resources/themes/mdc-light-indigo/theme.css';

import i18n from "./i18n.js";


// PrimeVue Components
import Toolbar          from "primevue/toolbar";
import Button           from "primevue/button";
import Card             from "primevue/card";
import SelectButton     from "primevue/selectbutton";

createApp(App)
    .use(router)
    .use(PrimeVue, { ripple: true })
    .component('pv-button',         Button)
    .component('pv-select-button', SelectButton)
    .component('pv-card',           Card)
    .component('pv-toolbar',        Toolbar)
    .use(i18n)
    .mount('#app')
