<template>
  <div class="container">
    <div class="row">
      <!--      <div class="col-md-6">-->
      <!--        <div class="input-group mb-3">-->
      <!--          <div class="input-group-prepend">-->
      <!--            <select class="input-group-text" v-model="selected">-->
      <!--              <option-->
      <!--                  v-for="list in lists"-->
      <!--                  :key="list.value"-->
      <!--                  :value="list.value"-->
      <!--              >-->
      <!--                {{ list.name }}-->
      <!--              </option>-->
      <!--            </select>-->
      <!--          </div>-->
      <!--          <input v-model="words" @blur="Search()" type="text" class="form-control" placeholder="请输入电影名。随便点击空白处搜索">-->
      <!--          <div class="input-group-append">-->
      <!--            <span class="input-group-text" @click="ClearKeyWord">搜索</span>-->
      <!--          </div>-->
      <!--          <div class="input-group-append">-->
      <!--            <span class="input-group-text" @click="ClearKeyWord">清除关键词<span-->
      <!--                style="color: red">{{ words.substring(0, 4) }}</span></span>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="col-md-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" @click="ClearUrl">清除URL</span>
          </div>
          <input v-model="playurl" class="form-control" placeholder="请输入视频Url地址，点击空白区域播放" type="text"
                 @blur="PlayVideo()">
          <div class="input-group-append">
            <select v-model="preurl" class="input-group-text" @change="ChangePreUrl">
              <option
                v-for="item in vips"
                :key="item.url"
                :value="item.url"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="padding: 0px">
        <iframe id="case3" allowfullscreen frameborder="0" v-bind:src="videourl"></iframe>
      </div>
    </div>

    <div class="row" style="border-radius: 15px;background-color: white;margin-top:10px">
      <div class="col-md-12">
        <img alt="" class="img-fluid" src="/images/tenxun.png">
        <img alt="" class="img-fluid" src="/images/youku.png">
        <img alt="" class="img-fluid" src="/images/iqiyi.png">
        <img alt="" class="img-fluid" src="/images/mg.png">
        <img alt="" class="img-fluid" src="/images/sohu.png">
        <img alt="" class="img-fluid" src="/images/leshi.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  created() {
    let aaa = this.$route.query
    // eslint-disable-next-line no-console
    console.log(aaa)
  }
}
</script>

<style scoped>

</style>
