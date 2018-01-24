<template>
  <div>
    <div id="albumlist" class="ulst">
      <div v-for="(item, index) in items" class="liwid">
        <div class="aspectration" v-on:click="jump(item.id)">
          <div class="cover">
            <img :src="item.src" class="coverimg"></img> 
          </div>
          <div class="msg">
            <div class="title">{{item.src}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    getData () {
      var that = this
      fetch('http://47.94.196.19:3000/api/getalbumlist', {
        method: 'POST',
        body: JSON.stringify({
          url: 'https://www.deviantart.com'
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
              src: json[a].album_thumb,
              id: json[a].id
            })
          }
          console.log(that.items)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
    jump (id) {
      this.$router.push({name: 'imgloader', params: { albumid: id }})
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.liwid {
  padding: 0;
  border: 0;
  display: flex;
}
.aspectration {
  position: relative;
  height: 35vw;
  width: 96%;
  background-color: orange;
  padding: 1% 2% 1% 2%;
  display: flex;
}
.msg {
  width: 75%;
  background-color: white;
}

.cover {
  height: 100%;
  width: 25%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.coverimg {
  max-height: 100%;
  max-width: 100%;
}
.title {
  float: left;
  width: 97%;
  margin-left: 3%;
  font-size: 4vw;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ulst {
  display: flex;/*Flex布局*/
  display: -webkit-flex; /* Safari */
  flex-flow: column;
  -webkit-padding-start: 0px;
}
</style>
