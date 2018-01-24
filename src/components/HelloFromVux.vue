<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/logo.png">
      </img>
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
    图集输入：
    <input v-model="msg" style="width:100%"></input>
    num:
    <input v-model="num" style="width:50px"></input>
    <div></div>
    图集建立：
    <input v-model="thumb" style="width:100%"></input>
    name:
    <input v-model="albumname" style="width:100%"></input>
    <input type="button" value="go" style="width:30px" v-on:click="send"></input>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: '',
      num: '',
      thumb: '',
      albumname: ''
    }
  },
  methods: {
    send () {
      var that = this
      fetch('http://47.94.196.19:3000/api/pictool', {
        method: 'POST',
        body: JSON.stringify({
          picurl: that.msg,
          num: that.num,
          thumb: that.thumb,
          albumname: that.albumname
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          console.log('parsed json', json)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
