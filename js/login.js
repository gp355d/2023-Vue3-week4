const { createApp } = Vue;
const app = {
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "leo533",
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    check() {
      axios.post(`${this.apiUrl}/admin/signin`, this.user)
      .then((res) => {
        // console.log(res);
        const { token, expired } = res.data;
        // console.log(token, expired);
        document.cookie = `mytoken=${token}; expires=${new Date(expired)};path=/`;//將存取到的token存入cookie
        window.location="product.html";
      })
      .catch((err) => {
        alert(err.data.message);
      })
    }
  },
}
createApp(app).mount("#app");
