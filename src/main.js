import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://ancient-thicket-68427.herokuapp.com/" : "/";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://basketfy-2022.herokuapp.com" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

createApp(App).use(router).mount("#app");
