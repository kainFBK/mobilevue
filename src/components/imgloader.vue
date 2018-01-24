<template>
  <div>
  <img class="previewer-demo-img" v-for="(item, index) in items" :src="item.src" width="100" @click="show(index)">
  </img>
  <Previewer :list="items" ref="previewer"></Previewer>
  </div>
</template>

<script>
import { Previewer } from 'vux'

export default {
  components: {
    Previewer
  },
  data () {
    return {
      items: [],
      heightcfg: 'aspect-ratio'
    }
  },
  methods: {
    getData () {
      var that = this
      fetch('http://47.94.196.19:3000/api/getpiclist', {
        method: 'POST',
        body: JSON.stringify({
          aid: that.$route.params.albumid
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          console.log('parsed json', json)
          for (var a = 0; a < json.length; a++) {
            that.items.push({
              src: json[a].src
            })
          }
          console.log(that.items)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
    },
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
  mounted () {
    this.getData()
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
