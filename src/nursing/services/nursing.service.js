import http from "../../shared/services/http-common.js";

export class NursingService {

    getPatients() {
        return http.get('/patients');
    }
    getExaminers() {
        return http.get('/examiners');
    }
    getMentalStateExams() {
        return http.get('/mental-state-exams');
    }
}