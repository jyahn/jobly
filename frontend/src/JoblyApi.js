import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem("_token")
    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies() {
    let res = await this.request('companies');
    return res.companies;
  }

  static async getCompaniesBySearch(search) {
    let res = await this.request('companies', search);
    return res.companies;
  }

  static async getJobs() {
    let res = await this.request('jobs');
    return res.jobs;
  }

  static async getJobsByMinSalary(min_salary) {
    let res = await this.request('jobs', min_salary);
    return res.jobs;
  }

  static async getJobsBySearch(search) {
    let res = await this.request('jobs', search);
    return res.jobs;
  }

  static async login(data) {
    let res = await this.request('login', data, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user
  }

  static async register(data) {
    let res = await this.request('users', data, "post");
    return res.token;
  }

  static async applyToJob(id) {
    let res = await this.request(`jobs/${id}/apply`, { state: 'applied' }, 'post')
  }

  static async editUser(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch")
    return res;
  }

}

export default JoblyApi