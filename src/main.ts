import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";

const intervalMS = 60 * 60 * 1000;
const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update();
      }, intervalMS);
  },
});

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount("#app");
