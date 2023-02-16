import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      api: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'qian14',
      products: [],
      productDetail: {}
    };
  },
  methods: {
    checkLogin() {
      axios.post(`${this.api}/api/user/check`)
        .then((response) => {
          // console.log(response);
          this.showProducts();
        })
        .catch((error) => {
          // console.log(error.data.message);
          window.location = 'login.html';
        })
    },
    showProducts() {
      axios.get(`${this.api}/api/${this.apiPath}/admin/products`)
        .then((response) => {
          // console.log(response.data.products);
          this.products = response.data.products;
        })
    },
    showProductDetail(productDetail) {
      this.productDetail = productDetail;
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)qianToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
  }
}).mount('#app');
