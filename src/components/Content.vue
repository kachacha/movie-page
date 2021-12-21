<template>
  <div :class="'container ' + backColorClass">
<!--    <div class="row">-->
<!--      <div class="col-md-6">-->
<!--        <div class="input-group mb-3">-->
<!--          <div class="input-group-prepend">-->
<!--            <select v-model="selected_platform" class="input-group-text">-->
<!--              <option-->
<!--                  v-for="list in lists"-->
<!--                  :key="list.name"-->
<!--                  :value="list"-->
<!--              >-->
<!--                {{ list.label }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <input v-model="words" class="form-control" placeholder="请输入电影名。随便点击空白处搜索" type="text" @blur="Search()">-->
<!--          <div class="input-group-append">-->
<!--            <span class="input-group-text" @click="Search">搜索</span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入搜索内容" v-model="words" class="input-with-select" @change="Search">
        <el-select v-model="selected_value" slot="prepend" placeholder="ps:(默认腾讯)" @change="set_selected_platform()">
          <el-option
              v-for="item in lists"
              :key="item.name"
              :label="item.label"
              :value="item.name">
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
      </el-input>
    </div>
    <!--使用教程-->
    <div class="row" style="border-radius: 15px;background-color: white;margin-top:10px; margin-bottom: 10px">
      <div class="col-md-12">
        <div class="text-center">
          <h2 style="margin-top:5px">vip解析使用教程</h2>
          <hr style="width: 90%;">
        </div>
      </div>
      <div class="col-md-8 text-left">
        <p style="color: red">解析线路来自网络收集,如有侵权请及时联系站长删除</p>
        <p>ps、输入框输入关键词，回车或点击”搜索“按钮即可搜索</p>
        <p>ps、在搜索结果中，点击想要看的视频，将直接跳转至播放页</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="padding: 0px">
        <iframe id="case1" ref="page_iframe" allowfullscreen frameborder="0" referrerpolicy="no-referrer"
                :src="this.page_type + this.selected_platform.name + '.html'"></iframe>
      </div>
    </div>

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
      backColorClass: "",
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
      words: "",
      // 选择列表值 - 属性
      selected_value: "",
      selected_platform: {},
      lists: "",
      // 当前页面属于什么环境类型 手机、电脑、ipad  ： m_*、w_*、i_*
      page_type: "",
      iframe: {}
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(process.env.VUE_APP_BASE_URL)
    this.iframe = this.$refs.page_iframe.contentWindow;
    window.addEventListener("message", this.handleMessage);
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
    // 解析iframe内部发回来的数据
    handleMessage(event) {
      const data = event.data;
      switch (data.cmd) {
        case "video_content":
          // 业务逻辑
          console.log("1234655", data.params);
          //带参数跳转
          // this.$router.push({path:'/Play',query:{play_uri:data.params.va_uri}});
          const newPlay = this.$router.resolve({path: '/play', query: data.params});
          window.open(newPlay.href, '_blank')
          break;
      }
    },
    // 改变选择全局搜索模态框
    set_selected_platform () {
      this.selected_platform = this.lists.find(item => item.name === this.selected_value);
      console.log(this.selected_platform)
    },
    Search: function () {
      // let that = this;
      // let words = that.words;
      if (this.words.length === 0) {
        layer.open({
          title: "提示！",
          icon: 1,
          content: '请输入你的关键词！',
          time: 2000
        });
        return false;
      }
      // this.selected_platform = that.selected_platform = that.lists.find(item => item.name === that.selected_platform.name);
      // 改变背景颜色
      if (this.selected_platform.name === "iqiyi") {
        this.backColorClass = "backgroundColorBlueToAli";
      } else {
        this.backColorClass = "backgroundColorAliToBlue";
      }

      // 传得参数对象
      // eslint-disable-next-line
      let query = {
        s_type: this.page_type + this.selected_platform.name,
        s_word: this.words,
        page: 1
      }
      this.axios.get(process.env.VUE_APP_BASE_URL + "/zfeno-video/api/v1/search", {
        params: query
      })
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res.data)
            this.rawHtml = res.data.data;
            this.sendMessage(this.page_type + this.selected_platform.name, res.data.page_html);
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
    getData() {
      let {lists, vips} = DataList;
      this.lists = lists;
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

        layer.alert('电脑')

      }
    }
  }
}
</script>

<style>

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/* 背景动态变化   - 白变蓝 */
.backgroundColorAliToBlue {
  /*height: 50px;*/
  /*width: 50px;*/
  background: #2c3e50;
  animation: aliToBlue 3s infinite;
  animation-fill-mode: forwards;

  /* Safari 和 Chrome */
  -webkit-animation: aliToBlue 3s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes aliToBlue {
  from {
    background: aliceblue;
  }
  to {
    background: #2c3e50;
  }
}

/* Safari and Chrome */
@-webkit-keyframes aliToBlue {
  from {
    background: aliceblue;
  }
  to {
    background: #2c3e50;
  }
}

/* 背景动态变化  - 蓝变白 */
.backgroundColorBlueToAli {
  /*height: 50px;*/
  /*width: 50px;*/
  background: aliceblue;
  animation: blueToAli 3s infinite;
  animation-fill-mode: forwards;

  /* Safari 和 Chrome */
  -webkit-animation: blueToAli 3s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-fill-mode: forwards;
}

@keyframes blueToAli {
  from {
    background: #2c3e50;
  }
  to {
    background: aliceblue;
  }
}

/* Safari and Chrome */
@-webkit-keyframes blueToAli {
  from {
    background: #2c3e50;
  }
  to {
    background: aliceblue;
  }
}


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
