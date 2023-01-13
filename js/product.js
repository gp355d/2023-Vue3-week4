const {createApp} = Vue;
let productModal='';
let deleteModal='';
const app={
  data(){
    return{
      products:[],
      tempProducts:{
        imagesUrl:[]//用來儲存多張圖片的陣列
      },
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'leo533',
      isNew:false
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
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
      .then((res)=>{
        this.products=res.data.products;
      })
      .catch((err)=>{
        alert(err.res.data.message);
      })
    },
    //新增和編輯資料共用同一個modal
    openModal(status,item){//由參數status判斷選取到的按鈕,開啟相對應的modal
      if(status==='new'){
        this.tempProducts={
          imagesUrl:[]
        };
        this.isNew=true;//為新資料的狀態
        productModal.show();
      }
      else if(status==="edit"){
        this.tempProducts={...item};//因為傳遞的參數資料item是object，而object是傳址的特性，為避免修改到原始object的資料，因此使用展開陣列的方式，做object的淺層複製
        this.isNew=false;//為舊資料的狀態
        productModal.show();//modal開啟
      }
      else if(status==="delete"){
        this.tempProducts={...item};
        deleteModal.show();
      }
    },
    updateProduct(){
      //isNew參數用來判斷資料是否為新的或舊的狀態
      let url=`${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let methods='post';
      if(!this.isNew){
        url=`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProducts.id}`;
        methods='put';
      }

      let datas={
        data: this.tempProducts
      }
      axios[methods](url,datas)
      .then((res)=>{
        alert(res.data.message);
        productModal.hide();//modal關閉
        this.getProducts();//更新資料後再重新讀取資料
      })
      .catch((err)=>{
        alert(err.response.data.message);
      })
    },
    deleteProduct(){
      const url=`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProducts.id}`;
      axios.delete(url)
      .then((res)=>{
        alert(res.data.message);
        deleteModal.hide();
        this.getProducts();
      })
      .catch((err)=>{
        alert(err.response.data.message);
      })
    },
    createImages() {
      this.tempProducts.imagesUrl = [];
      this.tempProducts.imagesUrl.push('');
    }
  },
  mounted(){
    const token =  document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");//存取cookie
    axios.defaults.headers.common['Authorization'] = token;//defaults表示每次都帶入
    this.check();
    productModal = new bootstrap.Modal(document.querySelector('#productModal'));
    deleteModal = new bootstrap.Modal(document.querySelector('#delProductModal'));

  }
}
createApp(app).mount('#app')