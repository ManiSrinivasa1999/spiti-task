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
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#060606',
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
