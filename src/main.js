import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "https://basketfy-2022.herokuapp" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

createApp(App).use(router).mount("#app");
