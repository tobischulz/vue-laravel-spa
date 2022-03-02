import { createApp } from 'vue'
import store from '@/js/stores';
import router from '@/js/router';
import App from '@/js/layouts/App';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.withCredentials = true;

store.dispatch('attempt_user')
  .then(() => {
    const app = createApp(App)
      .use(store)
      .use(router);

    app.mount('#app');
  })