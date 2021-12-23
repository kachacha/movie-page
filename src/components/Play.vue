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
<!--      <div class="col-md-6">-->
<!--        <div class="input-group mb-3">-->
<!--          <input v-model="playUrl" class="form-control" placeholder="请输入视频Url地址，点击空白区域播放" type="text"-->
<!--                 @keyup.enter="playVideo()">-->
<!--          <div class="input-group-prepend">-->
<!--            <span class="input-group-text" @click="playVideo()">播放</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="row" v-show="isPlay">
      <div class="col-md-12" style="padding: 0px">
        <iframe id="case3" allowfullscreen frameborder="0" v-bind:src="videoUrl"></iframe>
      </div>
    </div>

    <el-row>
      <div class="run_button" v-for="(item, index) in video_list">
        <el-badge :value="item.cover === 'notice' ? '预': ''" class="item" type="warning">
          <el-button plain :id="'cover_' + (index + 1).toString()" @click="playVideo(item.video_url, 'cover_' + (index + 1).toString())">{{item.label}}</el-button>
        </el-badge>
      </div>
    </el-row>

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

import layer from "layui-layer";

export default {
  name: "Play",
  data() {
    return {
      getQuery: {},
      getQueryParams: {},
      // 播放的视频链接
      playUrl: "",
      // 解析链接
      preUrl: "",
      // 解析视频的链接
      videoUrl: "",
      // 播放窗口
      isPlay: false,
      // 正在播放的集数
      running_cover_num_id: "",
      video_list: []
    }
  },
  created() {
    this.getQuery = this.$route.query
    this.getQueryParams = this.$route.params
    // eslint-disable-next-line no-console
    // console.log(this.getQuery, this.getQueryParams)
    // eslint-disable-next-line valid-typeof
    if (typeof (this.getQuery.play_uri) !== "undefined") {
      this.playUrl = this.getQuery.play_uri
    }
    if (typeof (this.getQueryParams.play_uri) !== "undefined") {
      this.playUrl = this.getQueryParams.play_uri
    }
    // eslint-disable-next-line no-console
    // console.log(this.playUrl)

  },
  mounted() {
    // this.playVideo();
    this.get_episode();
    this.get_play_uri();
    this.isPc();
  },
  methods: {
    get_episode: function () {
      // 传得参数对象
      // eslint-disable-next-line
      let query = {
        s_type: this.getQuery.s_type,
        page_uri: this.playUrl,
        other: 1
      }
      this.axios.get(process.env.VUE_APP_BASE_URL + "/zfeno-video/api/v1/episode", {
        params: query
      })
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res.data.code)
            if (res.data.code > 0) {
              this.video_list = res.data.data.video_list
            } else {
              layer.open({
                title: "错误！",
                icon: 1,
                content: '获取集数错误，请联系管理员！',
                time: 2000
              });
            }
          })
          .catch(res => {
            // eslint-disable-next-line no-console
            console.log(res)
            layer.open({
              title: "错误！",
              icon: 1,
              content: '获取集数错误，请联系管理员！',
              time: 2000
            });
            // 失败时候的操作
          });
    },
    get_play_uri: function () {
      this.axios.get(process.env.VUE_APP_BASE_URL + "/zfeno-video/api/v1/analysis-plus")
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res.data.code)
            if (res.data.code > 0) {
              this.preUrl = res.data.data.uri
              this.playVideo()
            } else {
              layer.open({
                title: "错误！",
                icon: 1,
                content: '获取解析链错误，请联系管理员！',
                time: 2000
              });
            }
          })
          .catch(res => {
            // eslint-disable-next-line no-console
            console.log(res)
            layer.open({
              title: "错误！",
              icon: 1,
              content: '获取解析链错误，请联系管理员！',
              time: 2000
            });
            // 失败时候的操作
          });
    },
    //播放视频
    playVideo: function (video_url, cover_num_id) {
      try
      {
        // 改变按钮颜色（正在播放的集数）
        document.getElementById(cover_num_id).classList=["el-button el-button--primary"]
        try
        {
          // 改变之前的集数的颜色
          document.getElementById(this.running_cover_num_id).classList=["el-button el-button--default is-plain"]
        }
        catch(err)
        {
          // todo 第一次无匹配id，第一次跳转到此页
        }

        this.running_cover_num_id = cover_num_id
      }
      catch(err)
      {
        // 无参数，第一次跳转到此页
      }

      console.log(video_url)
      if (typeof video_url !== "undefined") {
        this.playUrl = video_url
      }
      const that = this;
      if (that.playUrl === "") {
        layer.open({
          title: "提示！",
          icon: 1,
          content: '请复制视频URL到此处才能观看！',
          time: 2000
        });
        return false;
      }
      that.videoUrl = that.preUrl + that.playUrl;
      this.isPlay = true;
      // eslint-disable-next-line no-console
      console.log("that.videoUrl", that.preUrl, that.videoUrl)
      layer.msg("解析成功，祝你观赏愉快！")
    },

    isPc() {
      if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (window.location.href.indexOf("?mobile") < 0) {
          try {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
              // layer.alert('手机页面')
              this.url = this.wapurl;
            } else if (/iPad/i.test(navigator.userAgent)) {
              // layer.alert('平板页面')
            } else {
              // layer.alert('其他移动端页面')
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }

      }
    }
  }
}
</script>

<style scoped>

.run_button {
  width: 10px;
  margin-top: 3px;
  margin-bottom: 15px;
  display: inline-table;
  margin-left: 30px;
}

#case3 {
  width: 100%;
  height: 800px;
  border-radius: 10px;
}
</style>
