# 8.axios

安装依赖

``` shell
npm install --save axios
```

[webapi.js](src/utils/webapi.js)

```js
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
```

[Home.vue](src/views/Home.vue)

```js
import WebApi from "../utils/webapi"
//...
created(){
    WebApi.get().then((res)=>{
        console.log(res.status);
        console.log(res.data)
    })
}

```

