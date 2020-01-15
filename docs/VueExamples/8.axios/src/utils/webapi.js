const axios = require("axios").default;

export default class WebApi {
    static request() {
        axios.defaults.baseURL = "http://localhost:5000/";
        let headers = {
            "Content-Type": "application/json"
        };
        // let token = Helper.getCookie("token");
        // if (token)
        //     headers['Authorization'] = `bearer ${token}`
        axios.defaults.headers = headers;
        return axios;
    }

    static get() {
        return this.request().get('WeatherForecast');
    }

}