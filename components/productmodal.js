export default{
    props:['tempProducts','updateProducts','isNew'],
    template:`<div class="modal" id="productModal"tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="text" class="form-control"
                        placeholder="請輸入圖片連結" v-model="tempProducts.imageUrl">
              </div>
              <img class="img-fluid" :src="tempProducts.imageUrl" alt="">
              <h3 class="mb-3">多圖新增</h3>
              <!-- 判斷傳入的值是否為array -->
              <div v-if="Array.isArray(tempProducts.imagesUrl)">
                <div class="mb-1" v-for="(img,key) in tempProducts.imagesUrl" :key="key">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label" v-model="tempProducts.imagesUrl">輸入圖片網址</label>
                    <input type="text" class="form-control"
                           placeholder="請輸入圖片連結" v-model="tempProducts.imagesUrl[key]">
                  </div>
                  <img class="img-fluid" :src="img" alt="">
              </div>
              <!-- 當tempProducts.imagesUrl的資料筆數為0時的相反(當結果為true時) || tempProducts.imagesUrl[- 1]，當為新增資料時隱藏刪除按鈕，否則就顯現刪除按鈕-->
              <div v-if="!tempProducts.imagesUrl.length || tempProducts.imagesUrl[tempProducts.imagesUrl.length - 1]">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProducts.imagesUrl.push('')">
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProducts.imagesUrl.pop()">
                  刪除圖片
                </button>
              </div>
            </div>
            <div v-else>
              <button class="btn btn-outline-primary btn-sm d-block w-100" @click="$emit('create-img')">新增圖片</button>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProducts.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                         placeholder="請輸入分類" v-model="tempProducts.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProducts.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempProducts.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                         placeholder="請輸入售價" v-model="tempProducts.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入產品描述" v-model="tempProducts.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入說明內容" v-model="tempProducts.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                         :true-value="1" :false-value="0" v-model="tempProducts.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-data')">確認</button>
        </div>
      </div>
    </div>
  </div>
</div>`
}