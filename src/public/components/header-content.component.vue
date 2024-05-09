<script>
/**
 * Component for the header content.
 *
 * @summary This component represents the header content with navigation links and a language switcher.
 * @author Jeremy Joel Quispe Andia
 * @typedef {Object} HeaderContent
 * @property {boolean} drawer - Indicates whether the drawer is open or closed.
 * @property {string} title - The title of the header.
 * @property {Object[]} items - The navigation items with labels and routes.
 */

import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: 'header-content',
  components: { LanguageSwitcher },

  data() {
    return {
      /**
       * Indicates whether the drawer is open or closed.
       * @type {boolean}
       */
      drawer: false,
      /**
       * The title of the header.
       * @type {string}
       */
      title: "Hartford Institute for Geriatric Nursing",
      /**
       * The navigation items with labels and routes.
       * @type {Object[]}
       */
      items: [
        { label: 'toolbar.home', to: '/home' },
        { label: 'toolbar.examiner-performance-overview', to: '/nursing/examiner-performance-overview' },
      ]
    };
  },
  methods: {
    /**
     * Changes the language of the application.
     *
     * @param {string} lang - The language code to switch to.
     * @returns {void}
     */
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
}

</script>

<template>
  <pv-toolbar class="header">
    <template #start>
      <img src="/src/assets/images/logo.png" aria-label="logo" style="width: 120px"/>
      <h1 class="title">{{ title }}</h1>
    </template>
    <template #end>
      <div class="header-content">
        <router-link v-for="item in items" :key="item.label" v-slot="{ navigate, href }" :to="item.to" custom>
          <pv-button :href="href" class="btn-link" @click="navigate">{{ $t(item.label) }}</pv-button>
        </router-link>
      </div>
      <language-switcher @changeLanguage="changeLanguage" />
    </template>
  </pv-toolbar>
</template>

<style scoped>
.header {
  background-color: #2e2e2e;
  color: white;
  padding: 20px;
  border-radius: 0px;
  text-align: center;
}
.title{
  color: #ffffff;
  font-size:20px;
  margin-left: 20px;
}
.btn-link{
  background-color: rgba(0, 0, 0, 0);
  color: #d6eeff;
  margin-right: 10px;
}
</style>


