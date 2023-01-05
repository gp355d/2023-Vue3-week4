const {createApp} = Vue;
const app={
  data(){
    return{
      products:[],
      tempProducts:{},
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'leo533'
    }
  },
  methods:{
    check() {
      axios.post(`${this.apiUrl}/api/user/check`)
      .then(() => {
        this.getProducts();
      })
      .catch((err) => {
        window.location='login.html';
      })
    },
    getProducts(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
      .then((res)=>{
        // console.log(res.data.products);
        this.products=res.data.products;
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    getDetail(item){
      // console.log(item);
      this.tempProducts=item;
    }
  },
  mounted(){
    const token =  document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");//存取cookie
    axios.defaults.headers.common['Authorization'] = token;//defaults表示每次都帶入
    this.check();
    
  }
}
createApp(app).mount('#app')