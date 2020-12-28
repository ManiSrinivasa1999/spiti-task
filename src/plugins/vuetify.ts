import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#6D66FE',
        secondary: '#303843',
        accent: '#262E39',
        error: '#FF5252',
        info: '#162755',
        success: '#4CAF50',
        warning: '#EE984A',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
