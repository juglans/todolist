<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <swipeout>
      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{$t('Yes')}}</swipeout-button>
          <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{$t('Right')}}</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
        {{$t('JavaScript is the best language')}}
        </div>
      </swipeout-item>
    </swipeout>
  </div>
</template>

<i18n>
Fav:
  zh-CN: 收藏
Delete:
  zh-CN: 删除
JavaScript is the best language:
  zh-CN: JavaScript 是最好的语言
now enabled:
  zh-CN: 当前可操作
now disabled:
  zh-CN: 当前不可操作
set Enabled:
  zh-CN: 设置可操作
set Disabled:
  zh-CN: 设置不可操作
open left menu:
  zh-CN: 打开左菜单
open right menu:
  zh-CN: 打开右菜单
close menu:
  zh-CN: 关闭菜单
threshold = 0.5:
  zh-CN: 设置滑动阙值为 0.5
Yes:
  zh-CN: 是的
Right:
  zh-CN: 正确
Ignore:
  zh-CN: 忽略
</i18n>

<script>
import { Group, Cell } from 'vux'
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'
//import axios from 'axios'

export default {
  components: {
    Group,
    Cell,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      isSwipe: [false, false, false],
      list: [{name: 'erick'}, {name: 'yangjiayi'}],
      deleted: [true, true]
    }
  },
  methods: {
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  created() {
    setTimeout(() => {
      // 判断是否存在信息列表
      if (this.$refs.child) {
        this.$refs.child.forEach((element, index) => {
          let x, y, X, Y, swipeX, swipeY
          // 监听touchstart
          element.addEventListener('touchstart', e => {
            x = e.changedTouches[0].pageX
            y = e.changedTouches[0].pageY
            swipeX = true
            swipeY = true
            this.isSwipe = [false, false, false]
          })
          element.addEventListener('touchmove', e => {
            X = event.changedTouches[0].pageX
            Y = event.changedTouches[0].pageY
            //alert(1)
            if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
              // 阻止默认事件
              e.stopPropagation()
              // 右滑
              if (X - x > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, false)
              }
              if (x - X > 10) {
                e.preventDefault()
                this.isSwipe.splice(index, 1, true)
              }
              swipeY = false
            }
            if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
              swipeX = false
            }
          });
          element.addEventListener('touchend', e => {
            this.deleted[0]=false;
            
          })
        })
      }
    }, 1000)
  }
  
  
}
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
</style>
