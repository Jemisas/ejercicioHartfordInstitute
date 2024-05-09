<script>
import {defineComponent} from "vue";
import AppHeaderContent from "@/public/components/header-content.component.vue";

export default defineComponent({
  components: {AppHeaderContent}
})
</script>

<template>
  <app-header-content></app-header-content>
  <router-view></router-view>
</template>

<style scoped>

</style>
