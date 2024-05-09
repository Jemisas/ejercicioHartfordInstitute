<script>
export default {
  name: 'page-not-found',
  title: "Página no encontrada",
  data() {
    return {
      incorrectUrl: '',
    };
  },
  created() {
    this.incorrectUrl = this.$route.path;
  },
};
</script>

<template>
  <div class="page-not-found-container">
    <h1>{{ $t('page-not-found.title') }}</h1>
    <p>{{ $t('page-not-found.content') }}
      <b>/{{ incorrectUrl }}</b>
      {{ $t('page-not-found.content2') }}
    </p>
    <router-link to="/home"><pv-button class="b-home">{{ $t('page-not-found.button') }}</pv-button></router-link>
  </div>
</template>

<style scoped>

.page-not-found-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 90vh;
  padding: 1rem;
}

.b-home{
  background-color: #2743cd;
}

</style>
