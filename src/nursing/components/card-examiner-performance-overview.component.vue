<template>
  <div class="examiner-performance-overview" aria-label="Examiner Performance Overview">
    <h1 class="page-title">{{ $t('examiner-performance-overview.title') }}</h1>
    <div class="card-container">
      <div v-for="examiner in filteredExaminers" :key="examiner.id" class="card">
        <div class="card-content">
          <h2 class="examiner-name">{{ examiner.firstName }} {{ examiner.lastName }}</h2>
          <p class="npi">{{ $t('NPI') }}: {{ examiner.nationalProviderIdentifier }}</p>
          <h3 class="subtitle">{{ $t('examiner-performance-overview.subtitle') }}</h3>
          <div class="indicator">
            <span class="indicator-label">{{ $t('examiner-performance-overview.exam-count') }}:</span>
            <span class="indicator-value">{{ examiner.currentExamCount }}</span>
          </div>
          <div class="indicator">
            <span class="indicator-label">{{ $t('home.average-score') }}:</span>
            <span class="indicator-value">{{ formatNumber(examiner.averageScore) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Component for displaying an overview of examiner performance.
 *
 * @summary This component displays an overview of examiner performance, including exam count and average score.
 * @author Jeremy Joel Quispe Andia
 * @typedef {Object} CardExaminerPerformanceOverview
 * @property {Object[]} examiners - The list of examiners.
 * @property {string} filterText - The filter text for searching examiners.
 */

import { NursingService } from "@/nursing/services/nursing.service.js";

export default {
  name: 'card-examiner-performance-overview',

  data() {
    return {
      /**
       * The list of examiners.
       * @type {Object[]}
       */
      examiners: [],
      /**
       * The filter text for searching examiners.
       * @type {string}
       */
      filterText: ''
    };
  },

  created() {
    this.loadData();
  },

  computed: {
    /**
     * Filters examiners based on filter text.
     *
     * @returns {Object[]} Filtered list of examiners.
     */
    filteredExaminers() {
      return this.examiners.filter(examiner => {
        const fullName = examiner.firstName.toLowerCase() + ' ' + examiner.lastName.toLowerCase();
        return fullName.includes(this.filterText.toLowerCase());
      });
    }
  },

  methods: {
    /**
     * Loads data for examiners and exams.
     *
     * @returns {void}
     */
    async loadData() {
      const nursingService = new NursingService();

      try {
        const [examinersResponse, examsResponse] = await Promise.all([
          nursingService.getExaminers(),
          nursingService.getMentalStateExams()
        ]);

        const examiners = examinersResponse.data;
        const exams = examsResponse.data;

        examiners.forEach(examiner => {
          const examinerExams = exams.filter(exam => exam.examinerId === examiner.id);
          examiner.currentExamCount = examinerExams.length;
          examiner.averageScore = this.calculateAverageScore(examinerExams);
        });

        this.examiners = examiners;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    /**
     * Calculates the average score of given exams.
     *
     * @param {Object[]} exams - List of examiner's exams.
     * @returns {number} - Average score.
     */
    calculateAverageScore(exams) {
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
      return exams.length > 0 ? totalScoreSum / exams.length : 0;
    },

    /**
     * Formats a number using the Intl.NumberFormat object.
     *
     * @param {number} number - The number to format.
     * @returns {string} - The formatted number as a string.
     */
    formatNumber(number) {
      return new Intl.NumberFormat().format(number);
    }
  }
};
</script>

<style scoped>
.examiner-performance-overview {
  padding: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 0 0 calc(50% - 20px);
}

.card-content {
  background-color: #f9f9f9;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.examiner-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.npi {
  color: #666;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
}

.indicator {
  display: flex;
  justify-content: space-between;
}

.indicator-label {
  font-weight: bold;
}

.indicator-value {
  color: #007bff;
}
</style>
