<template>
    <div class="container">
      <div class="card">
        <pv-card>
          <template #header>
            <h2 class="title">{{ $t('home.title-card') }}</h2>
            <h3 class="subtitle-analytic">{{ $t('home.subtitle-card') }}</h3>
          </template>
          <template #content>
            <div class="indicator">
              <span class="label">{{ $t('home.exam-count') }}:</span>
              <span class="value">{{ examCount }}</span>
            </div>
            <div class="indicator">
              <span class="label">{{ $t('home.high-score') }}:</span>
              <span class="value">{{ highestScore }}</span>
            </div>
            <div class="indicator">
              <span class="label">{{ $t('home.lowest-score') }}:</span>
              <span class="value">{{ lowestScore }}</span>
            </div>
            <div class="indicator">
              <span class="label">{{ $t('home.average-score') }}:</span>
              <span class="value">{{ averageScore }}</span>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
</template>

<script>
/**
 * Component that represents the home page.
 *
 * @summary This component displays general information and statistics for the home page.
 * @author Jeremy Joel Quispe Andia
 * @typedef {Object} CardScoreAnalytic
 * @property {number} examCount - The number of exams.
 * @property {number} highestScore - The highest score among the exams.
 * @property {number} lowestScore - The lowest score among the exams.
 * @property {number} averageScore - The average score of all exams.
 */

import { NursingService } from "@/nursing/services/nursing.service.js";

export default {
  name: 'card-score-analytic',
  data() {
    return {
      /**
       * The number of exams.
       * @type {number}
       */
      examCount: 0,
      /**
       * The highest score among the exams.
       * @type {number}
       */
      highestScore: 0,
      /**
       * The lowest score among the exams.
       * @type {number}
       */
      lowestScore: 0,
      /**
       * The average score of all exams.
       * @type {number}
       */
      averageScore: 0
    };
  },

  mounted() {
    /**
     * Initializes the component by loading data.
     * @returns {void}
     */
    this.loadData();
  },

  methods: {
    /**
     * Loads data for the home page.
     *
     * @returns {void}
     */
    async loadData() {
      const nursingService = new NursingService();

      try {
        const [_, examsResponse] = await Promise.all([
          nursingService.getPatients(),
          nursingService.getMentalStateExams()
        ]);

        const exams = examsResponse.data;

        // Calculating Exam Count
        this.examCount = exams.length;

        // Calculating Highest Score
        this.highestScore = Math.max(
            ...exams.map(
                exam =>
                    exam.orientationScore +
                    exam.registrationScore +
                    exam.attentionAndCalculationScore +
                    exam.recallScore +
                    exam.languageScore
            )
        );

        // Calculating Lowest Score
        this.lowestScore = Math.min(
            ...exams.map(
                exam =>
                    exam.orientationScore +
                    exam.registrationScore +
                    exam.attentionAndCalculationScore +
                    exam.recallScore +
                    exam.languageScore
            )
        );

        // Calculating Average Score
        const totalScoreSum = exams.reduce(
            (acc, exam) =>
                acc +
                exam.orientationScore +
                exam.registrationScore +
                exam.attentionAndCalculationScore +
                exam.recallScore +
                exam.languageScore,
            0
        );
        this.averageScore = totalScoreSum / this.examCount;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 600px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 10px;
}

.card {
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  color: #007bff;
}
</style>
