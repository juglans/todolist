<template>
  <div>
    <div class="vux-1px-t0">
      <swipeout>
      <transition-group name="fade">
        
        <swipeout-item v-for="(item, index) of todolist" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" :key="item">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick(index)" type="primary">已阅</swipeout-button>
          </div>
          <div slot="content" class="demo-content vux-1px-t">
          {{(index+1) + '.' + item.title}}
          </div>
        </swipeout-item>
      </transition-group>
        
      </swipeout>
    </div>
  </div>
</template>

<script>
import { Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux';
import axios from 'axios';


export default {
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  methods: {
    onButtonClick (index) {
      //alert('on button click ' + type)
      //alert(todos[index].title);
      var todos = this.todolist.concat();
      //alert(todos[index].title);
      this.todolist.splice(index,1);
      if(todos[index].activetype === '006' && todos[index].activetypename === '传阅') {
        //console.log(todos[index].title + 'todo save and commit.')
        axios.get('/api/' + this.userId + '/todo/' + todos[index].universalid + '/save')
        .then(saveRes => {
          if(saveRes.data.mobile.success === 'true') {
            //console.log(todos[index].title + ' saved.')
            axios.get('/api/' + this.userId + '/todo/' + todos[index].universalid + '/' + todos[index].activetype + '/commit')
            .then(commitRes => {
              if(commitRes.data.mobile.success === 'true') {
                console.log(todos[index].title + ' commited.')
              }
            })
          }
        })
      } else {
        axios.get('/api/' + this.userId + '/toread/' + todos[index].universalid + '/commit')
        .then(result => {
          if(result.data.mobile.success === 'true') {
            console.log(todos[index].title + '已阅。')
          }
        })
        //console.log(todos[index].title + '已阅。')
      }
    },
    handleEvents (type) {
      console.log('event: ', type)
    }
  },
  data () {
    return {
      disabled: false,
      todolist: [],
      userId: 'erick'
    }
  },
  created() {
    var self = this;

    function getToDo(){
      return axios.get('/api/' + self.userId + '/todolist');
    }
    function getToRead(){
      return axios.get('/api/' + self.userId + '/toreadlist');
    }

    axios.all([getToDo(), getToRead()]).then(axios.spread((todo_res, toread_res) => {
      var todos = [];
      var toreads = [];

      todos = todo_res.data.mobile.list.value.filter((todo) => {
        return todo.activetype === '006'
      });

      toreads = toread_res.data.mobile.list.value;
      self.todolist = todos.concat(toreads);
    }))
  }
}
</script>

<style lang="less">
.demo-content {
  padding: 10px 10px;
}
.vux-1px-t {
  border-top: 1px dotted gray; }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.fade-list-move {
  transition: transform 1s;
}
</style>