import { createStore } from "vuex";
import auth from "@/js/stores/auth.module";

const store = createStore({
  modules: {
    auth,
  }
});

export default store;
