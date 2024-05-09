<template>
  <div class="home" aria-label="Home">
    <h1>{{ $t('home.title') }}</h1>
    <p>{{ $t('home.content') }}</p>
  </div>
  <card-score-analytic></card-score-analytic>
</template>


<script>

import {defineComponent} from "vue";
import CardScoreAnalytic from "@/nursing/components/card-score-analytic.component.vue";

export default defineComponent({
  components: {CardScoreAnalytic}
})
</script>

<style scoped>
.home {
  text-align: center;
}

</style>
