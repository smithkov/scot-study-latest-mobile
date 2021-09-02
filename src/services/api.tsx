import Config from "../utility/config";
import axios from "axios";
export default class ApiService {
  static readonly endpoint: string = Config.url;
  static login(user: string, password: string) {
    return axios.post(`${this.endpoint}signIn`, { email: user, password });
  }

  static register(data: any) {
    return axios.post(`${this.endpoint}signUp`, data);
  }

  static countries() {
    return axios.post(`${this.endpoint}countries`);
  }

  static qualificationTypes() {
    return axios.post(`${this.endpoint}qualificationTypes`);
  }

  static findHighestQualification(data: any) {
    return axios.post(`${this.endpoint}findHighestQualificationByUser`, data);
  }
  static saveHighestQualification(data: any) {
    return axios.post(`${this.endpoint}qualification`, data);
  }

  static savePreviousQualification(data: any) {
    return axios.post(`${this.endpoint}previousQualification`, data);
  }

  static findPreviousQualification(data: any) {
    return axios.post(`${this.endpoint}findPreviousQualificationByUser`, data);
  }

  static findHighSchool(data: any) {
    return axios.post(`${this.endpoint}findHighSchoolByUser`, data);
  }

  static saveHighSchool(data: any) {
    return axios.post(`${this.endpoint}highSchool`, data);
  }

  static findEnglish(data: any) {
    return axios.post(`${this.endpoint}findEnglishByUser`, data);
  }

  static saveEnglishTest(data: any) {
    return axios.post(`${this.endpoint}englishTest`, data);
  }

  static findSponsorship(data: any) {
    return axios.post(`${this.endpoint}findSponsorshipByUser`, data);
  }

  static saveSponsorship(data: any) {
    return axios.post(`${this.endpoint}sponsorship`, data);
  }

  static findVisaHistory(data: any) {
    return axios.post(`${this.endpoint}findVisaHistoryByUser`, data);
  }

  static saveVisaHistory(data: any) {
    return axios.post(`${this.endpoint}visaHistory`, data);
  }

  static degreeTypes() {
    return axios.post(`${this.endpoint}degreeTypes`);
  }

  static facultiesLight() {
    return axios.post(`${this.endpoint}facultiesLight`);
  }

  static allCoursesSearch(data: any) {
    return axios.post(`${this.endpoint}allCoursesSearch`, data);
  }

  static saveApplication(data: any) {
    return axios.post(`${this.endpoint}saveApplication`, data);
  }

  static findUserById(data: any) {
    return axios.post(`${this.endpoint}userById`, data);
  }

  static updateUserInfo(data: any, userId: any) {
    return axios.patch(`${this.endpoint}user/${userId}`, data);
  }

  static findApplicationsByUser(data: any) {
    return axios.post(`${this.endpoint}findApplicationsByUser`, data);
  }

  static findCourseById(id: any) {
    return axios.get(`${this.endpoint}course/${id}`);
  }

  static institutions() {
    return axios.post(`${this.endpoint}institutions`);
  }

  static findInstitutionById(data: any) {
    return axios.post(`${this.endpoint}findInstitutionById`, data);
  }

  static courseByParams(data: any) {
    return axios.post(`${this.endpoint}courseByParams`, data);
  }

  static findUserPayments(data: any) {
    return axios.post(`${this.endpoint}findUserPayments`, data);
  }

  static compare(data: any) {
    return axios.post(`${this.endpoint}compareForMobile`, data);
  }

  static forgotPassword(data: any) {
    return axios.post(`${this.endpoint}forgotPassword`, data);
  }
}
