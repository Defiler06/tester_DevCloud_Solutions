import vuetify from './vuetify';
import router from '../router/index';
import store from "@/store/task";

export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(store)
}
