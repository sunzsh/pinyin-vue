<template>
  <div id="app">
    <div class="main" @click="next" v-longpress="longpress">{{ currentData.current }}</div>
    <div class="desc">{{mode == 'wrongs' ? '错题本复习，' : '题库练习，'}}剩余：{{ currentData.data.length }}</div>

    <div class="menu-wrapper" v-show="showingMenu" @click="showingMenu=false">
      <div class="flex-spacer"></div>
      <div class="menu">
        <div class="menu-item" v-show="currentData.prev && currentData.prev !== currentData.current" @click="goPrev">上一个</div>
        <div class="menu-item" @click="addWrongs" v-show="mode !== 'wrongs'">加入错题本</div>
        <div class="menu-item" @click="openWrongs" v-show="wrongs.data.length > 0 && mode !== 'wrongs'">进入错题本 {{ `[${wrongs.data.length}个]` }}</div>
        <div class="menu-item" @click="removeCurrentWrong" v-show="mode == 'wrongs'">记住了，移出错题本：<span style="font-family: 'pinyin'">{{currentData.current}}</span></div>
        <div class="menu-item" @click="clearWrongs" v-show="mode == 'wrongs'" style="color: #F56C6C;">清空错题本</div>
        <div class="menu-item" @click="exitWrongs" v-show="mode == 'wrongs'">退出错题本</div>
      </div>
      <div class="flex-spacer"></div>
    </div>
  </div>
</template>

<script>
import pinyin from 'pinyin'

import data1 from '@/assets/py-data1.js'

export default {
  data () {
    return {
      currentData: { data: [] },
      normal: {
        current: '',
        prev: '',
        bakCurrent: '',
        data: [...data1],
      },
      wrongs: {
        current: '',
        prev: '',
        bakCurrent: '',
        data: JSON.parse(localStorage.getItem('pinyin-wrongs')) || [],
      },
      showingMenu: false
    }
  },
  computed: {
    mode () {
      return this.currentData === this.normal ? 'normal' : 'wrongs'
    }
  },
  mounted () {
    this.currentData = this.normal
    this.next(true)
  },
  methods: {
    next (ignoreMenu) {
      if (!ignoreMenu && this.showingMenu) {
        return
      }
      if (this.currentData.data.length === 0) {
        alert('恭喜你 练完了，刷新重来！')
        return;
      }
      this.currentData.prev = this.currentData.current
      if (this.currentData.bakCurrent) {
        this.currentData.current = this.currentData.bakCurrent
        this.currentData.bakCurrent = ''
        return
      }
      // 从 this.data 中随机提取一个汉字并从 this.data 中删除
      let next = this.currentData.data.splice(Math.floor(Math.random() * this.currentData.data.length), 1)[0];
      // 正则判断：next如果是汉字
      if (/^[\u4e00-\u9fa5]+$/.test(next)) {
        next = (pinyin(next)[0]||{})[0] // 转拼音
      }
      this.currentData.current = next
    },
    goPrev() {
      this.currentData.bakCurrent = this.currentData.current
      this.currentData.current = this.currentData.prev
    },
    longpress() {
      this.showingMenu = true
    },
    addWrongs() {
      if (this.wrongs.data.indexOf(this.currentData.current) !== -1) {
        return
      }
      this.wrongs.data.push(this.currentData.current)
      localStorage.setItem("pinyin-wrongs", JSON.stringify(this.wrongs.data))
    },
    openWrongs() {
      this.currentData = this.wrongs
      this.next(true)
    },
    removeCurrentWrong() {
      this.wrongs.data.splice(this.wrongs.data.indexOf(this.currentData.current), 1)
      localStorage.setItem("pinyin-wrongs", JSON.stringify(this.wrongs.data))
    },
    clearWrongs() {
      if (window.confirm('确认要清空错题本吗？')) {
        this.wrongs.data = []
        this.wrongs.current = ''
        this.wrongs.prev = ''
        this.wrongs.bakCurrent = ''
        localStorage.setItem("pinyin-wrongs", JSON.stringify(this.wrongs.data))
        this.exitWrongs()
      }
    },
    exitWrongs() {
      this.currentData = this.normal
      this.next(true)
    }
  }
}
</script>

<style>
#app {
  overflow: hidden;
  height: 100vh;
}
.main {
  font-family: 'pinyin';
  font-size: calc(20vw * 1.2);
  text-align: center;
  margin: auto 0;
  height: 90vh;
  line-height: 90vh;
  user-select: none;
  cursor: default;

}
.desc {
  padding-top: 12px;
  text-align: center;
  user-select: none;
  cursor: default;
  color: rgb(157, 157, 157);
}
.menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  flex-direction: column;
}
.menu-wrapper .menu .menu-item {
  margin: 0 auto;
  display: block;
  width: 20%;
  min-width: 150px;
  text-align: center;
  background-color: #fff;
  padding: 20px 0;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
}
.menu-wrapper .menu .menu-item+ .menu-item {
  margin-top: 25px;
}
.flex-spacer {
  flex: 1;
}
</style>
