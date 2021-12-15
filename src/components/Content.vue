<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <select v-model="selected_platform" class="input-group-text">
              <option
                  v-for="list in lists"
                  :key="list.name"
                  :value="list"
              >
                {{ list.label }}
              </option>
            </select>
          </div>
          <input v-model="words" class="form-control" placeholder="请输入电影名。随便点击空白处搜索" type="text" @blur="Search()">
          <div class="input-group-append">
            <span class="input-group-text" @click="Search">搜索</span>
          </div>
          <!--          <div class="input-group-append">-->
          <!--                  <span class="input-group-text" @click="ClearKeyWord">清除关键词<span-->
          <!--                      style="color: red">{{ words.substring(0, 4) }}</span></span>-->
          <!--          </div>-->
        </div>
      </div>

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
    <div class="input-group-append">
      <span class="input-group-text" @click="sendMessage('123456789')">发送消息</span>
    </div>
    <div class="row" v-show="!phonePage">
      <div class="col-md-12" style="padding: 0px">
        <iframe src="qq.html" frameborder="0" id="case1" allowfullscreen></iframe>
      </div>
    </div>
    <div class="row" v-show="phonePage">
      <div class="col-md-12" style="padding: 0px">
        <iframe src="m_iqiyi.html" frameborder="0" ref="m_qq" referrerpolicy="no-referrer" id="case2" allowfullscreen></iframe>
      </div>
    </div>
    <!--    <div class="row" v-show="isplay == true">-->
    <!--      <div class="col-md-12" style="padding: 0px">-->
    <!--        <iframe v-bind:src="videourl" frameborder="0" id="case3" allowfullscreen></iframe>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div class="row row-list">-->
    <!--      <div class="col-md-12 md-curtain-list">-->
    <!--        &lt;!&ndash; 设置宽高然后进行配置 &ndash;&gt;-->
    <!--        <vue-scroll :ops="ops" style="width:100%; height:100%">-->
    <!--          <div v-for="(item, v) in rawHtml" :key="v">-->
    <!--            &lt;!&ndash;          id值{{ item.uri }}&ndash;&gt;-->
    <!--            &lt;!&ndash;          =>id值{{ v }}&ndash;&gt;-->
    <!--            <p class="outset" v-html="item.html">{{ item.html }}</p>-->
    <!--          </div>-->
    <!--        </vue-scroll>-->

    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="row" style="opacity: 0.4;">-->
    <!--      <div class="col-md-12" style="padding: 0px">-->
    <!--        <iframe v-bind:src="url" frameborder="0" id="case4"></iframe>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--使用教程-->
    <!--    <div class="row" style="border-radius: 15px;background-color: white;margin-top:10px">-->
    <!--      <div class="col-md-12">-->
    <!--        <div class="text-center">-->
    <!--          <h2 style="margin-top:5px">vip解析使用教程</h2>-->
    <!--          <hr style="width: 90%;">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="col-md-4">-->
    <!--        <a href="#" data-toggle="tooltip" title="点击图片观看视频教程!" @click="PcDemo">-->
    <!--          <img src="/images/orangbus.png" alt="" style="width: 180px;height: 180px;">-->
    <!--          &lt;!&ndash;                    <p><a  @click="PcDemo">Pc演示</a> | <a  @click="MobDemo">手机演示</a></p>&ndash;&gt;-->
    <!--        </a>-->
    <!--      </div>-->
    <!--      <div class="col-md-8 text-left">-->
    <!--        <p style="color: red">解析线路来自网络收集,如有侵权请及时联系站长删除</p>-->
    <!--        <p>1、左侧输入框输入关键词，点击空白即可搜索</p>-->
    <!--        <p>2、在搜索结果中，右键复制视频地址</p>-->
    <!--        <p>3、右侧输入框粘贴刚刚复制的视频地址，随意点击空白区域即可观看</p>-->
    <!--        <p>4、不能播放请尝试其他线路，我们支持的平台有</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--支持平台-->
    <div class="row" style="border-radius: 15px;background-color: white;margin-top:10px">
      <div class="col-md-12">
        <img src="/images/tenxun.png" alt="" class="img-fluid">
        <img src="/images/youku.png" alt="" class="img-fluid">
        <img src="/images/iqiyi.png" alt="" class="img-fluid">
        <img src="/images/mg.png" alt="" class="img-fluid">
        <img src="/images/sohu.png" alt="" class="img-fluid">
        <img src="/images/leshi.png" alt="" class="img-fluid">
      </div>
    </div>
  </div>
</template>
<script>
import layer from "layui-layer";
import DataList from "../data";

export default {

  name: "Content",
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: false,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: "#F5F5F5",//滚动条颜色
          opacity: 0.5,//滚动条透明度
          "overflow-x": "hidden"
        }
      },
      rawHtml: "",
      url: "https://v.qq.com/biu/ranks/?t=hotsearch",
      wapurl: "https://m.v.qq.com/index.html",
      // 手机版是否
      phonePage: true,
      playurl: "",
      words: "",
      inputurl: "",
      selected_platform: {},
      preurl: "https://api.sigujx.com/jx/?url=",
      lists: "",
      vips: "",
      videourl: "",
      isplay: false,
      // 当前页面属于什么环境类型 手机、电脑、ipad  ： m_*、w_*、i_*
      page_type: "",
      iframe: {}
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_BASE_URL)
    this.iframe = this.$refs.m_qq.contentWindow;
    this.getData();
    this.isPc();
  },
  methods: {
    //给子页面传入数据
    sendMessage: function (page_type, page_html) {
      this.iframe.postMessage(
          {
            "page_type": page_type,
            "page_html": page_html
          },
          '*'
      );
    },
    Demo: function () {
      // eslint-disable-next-line no-console
      // console.log(this.lists)
      // eslint-disable-next-line no-console
      console.log(this.selected_platform)
      // eslint-disable-next-line no-console
      console.log(this.$Api.channelCompare)
    },
    Search: function () {
      let that = this;
      let words = that.words;
      if (words.length === 0) {
        layer.open({
          title: "提示！",
          icon: 1,
          content: '请输入你的关键词！',
          time: 2000
        });
        return false;
      }
      this.selected_platform = that.selected_platform = that.lists.find(item => item.name === that.selected_platform.name);
      // eslint-disable-next-line no-console
      let searchWord = that.selected_platform.value + words;
      that.url = searchWord;
      that.isplay = false;



      // 传得参数对象
      // eslint-disable-next-line
      let query = {
        s_type: that.page_type + that.selected_platform.name,
        s_word: that.words,
        page: 1
      }
      this.axios.get("/zfeno-video/api/v1/search", {
            params: query
          })
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res.data)
            this.rawHtml = res.data.data;
            this.sendMessage(that.page_type + that.selected_platform.name, res.data.page_html);
          })
          .catch(res => {
            // eslint-disable-next-line no-console
            console.log(res)
            // 失败时候的操作
          });
    },
    //清除搜索关键词
    ClearKeyWord: function () {
      const that = this;
      that.words = "";
      layer.msg("关键词清除成功！");
      return false;
    },
    //播放视频
    PlayVideo: function () {
      const that = this;
      if (that.playurl == "") {
        layer.open({
          title: "提示！",
          icon: 1,
          content: '请复制视频URL到此处才能观看！',
          time: 2000
        });
        return false;
      }
      that.videourl = that.preurl + that.playurl;
      that.isplay = true;

      layer.msg("解析成功，祝你观赏愉快！")
    },
    //清除视频URL地址
    ClearUrl: function () {
      const that = this;
      that.playurl = "";
      layer.msg("URL清除成功")
    },
    ChangePreUrl: function () {
      const that = this;
      if (that.playurl === "") {
        return false;
      } else {
        this.videourl = that.preurl + that.playurl;
        layer.msg("成功切换！")
      }
    },
    PcDemo() {
      layer.open({
        type: 2,
        title: false,
        area: ['630px', '360px'],
        shade: 0.8,
        closeBtn: 0,
        shadeClose: true,
        content: '//player.youku.com/embed/XMjY3MzgzODg0'
      });
    },
    getData() {
      let {lists, vips} = DataList;
      this.lists = lists;
      this.vips = vips;
      this.selected_platform = lists[0]
      // eslint-disable-next-line no-console
      console.log(this.lists)
    },
    isPc() {
      if (/AppleWebKit.*mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (window.location.href.indexOf("?mobile") < 0) {
          try {
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
              layer.alert('手机页面')
              // 页面属性改为：m_
              this.page_type = "m_"



              this.phonePage = true
              this.url = this.wapurl;
            } else if (/iPad/i.test(navigator.userAgent)) {
              layer.alert('平板页面')
              // 页面属性改为：i_
              this.page_type = "i_"
            } else {
              // 页面属性改为：w_
              this.page_type = "w_"
              layer.alert('其他移动端页面')
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
          }
        }

      } else {
        // 页面属性改为：w_
        this.page_type = "w_"



        this.phonePage = false
        layer.alert('电脑')

      }
    }
  }
}
</script>

<style scoped>


p.dotted {
  border-style: dotted;
}

p.dashed {
  border-style: dashed;
}

p.solid {
  border-style: solid;
}

p.double {
  border-style: double;
}

p.groove {
  border-style: groove;
}

p.ridge {
  border-style: ridge;
}

p.inset {
  border-style: inset;
}

p.outset {
  border-style: outset;
}

p.none {
  border-style: none;
}

p.hidden {
  border-style: hidden;
}

p.mix {
  border-style: dotted dashed solid double;
}

.row-list {
  margin-right: -15px;
  margin-left: -15px;
  position: absolute;
  z-index: 1;
  opacity: 0.8;
  background-color: rgb(0 0 0);
}

.md-curtain-list {
  min-height: 800px;
  max-height: 800px;
}

#case1 {
  width: 100%;
  height: 800px;
  border-radius: 10px;
}

#case2 {
  width: 100%;
  height: 800px;
  border-radius: 10px;
}

#case3 {
  width: 100%;
  height: 800px;
  border-radius: 10px;
}

#case4 {
  width: 100%;
  height: 800px;
  border-radius: 10px;
}

/deep/ .__bar-is-vertical {
  right: -1px !important;
}

/deep/ .__bar-is-horizontal {
  display: none !important;
}
</style>
//// 滚动条位置
//// 隐藏横向滚动条
