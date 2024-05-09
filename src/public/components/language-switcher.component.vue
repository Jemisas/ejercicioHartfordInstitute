<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    };
  },
  watch: {
    language(newLanguage) {
      this.$i18n.locale = newLanguage;
    }
  }
};
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages" :unselectable="true"
                    class="bg-primary uppercase"></pv-select-button>
</template>

<style scoped>

</style>