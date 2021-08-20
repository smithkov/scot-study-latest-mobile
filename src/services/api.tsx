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
}
