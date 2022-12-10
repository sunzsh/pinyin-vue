<template>
  <div id="app">
    <div class="main" @click="next">{{ current }}</div>
    <div class="desc">剩余：{{ data.length }}</div>
  </div>
</template>

<script>
import pinyin from 'pinyin'

import data1 from '@/assets/py-data1.js'

export default {
  data () {
    return {
      data: [...data1],
      current: [[]]
    }
  },
  mounted () {
    // console.log(this.data);
    this.next()
  },
  methods: {
    next () {
      if (this.data.length === 0) {
        alert('恭喜你 练完了，刷新重来！')
        return;
      }
      // 从 this.data 中随机提取一个汉字并从 this.data 中删除
      this.current = (pinyin(this.data.splice(Math.floor(Math.random() * this.data.length), 1)[0])[0]||{})[0]
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
</style>
