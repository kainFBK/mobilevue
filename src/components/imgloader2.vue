<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <ul class="content" ref="content">
        <img v-for="(item, index) in page" :src="item.src" width="100%" >
        </img>
        <div ref="pullingUpText">上拉加载</div>
      </ul>
    </div>
    <div class="mask" ref="mask">
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      items: [],
      page: [],
      currentpage: 0,
      pagenum: 0,
      picomplete: 0,
      windowheight: 0,
      ispullingup: false
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
          var num = 1
          for (var a = 0; a < json.length;) {
            that.items.push({
              pageid: num,
              page: []
            })
            for (var b = 0; b < 5 && a < json.length; b++) {
              that.items[num - 1].page.push({
                picid: b,
                src: json[a].src
              })
              a++
            }
            num++
          }
          that.pagenum = num - 1
          that.getpage(1)
          console.log(that.pagenum)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
    },
    getpage (index) {
      console.log('getpage:', index)
      if(index > 0 && index <= this.pagenum){
        this.$refs.mask.style.display = 'block'
        this.$refs.pullingUpText.innerHTML = '上拉加载'
        var that = this
        that.page = that.items[index - 1].page
        that.currentpage = index
        this.$nextTick(() => {
          this.scroll.scrollTo(0, 0, 200)
          setTimeout(() => {
            this.$refs.mask.style.display = 'none'
          }, 500)
          // console.log(document.querySelectorAll('img'))
          let imgs = document.querySelectorAll('img')
          Array.from(imgs).forEach((item) => {
            item.onload = () => {
              console.log('onload')
              // this.picomplete++
              that.scroll.refresh()
            }
          })
        })
      }else{
        if(index > this.currentpage){
          this.$refs.pullingUpText.innerHTML = '没有更多数据'
        }else{
          
        }
      }
    },
    refresh () {
      this.getpage(this.currentpage - 1)
    },
    infinite (done) {
      console.log('infinite')
      if (this.currentpage <= 0 && this.currentpage >= this.pagenum) {
        setTimeout(() => {
          done(true)
        }, 1500)
        return
      }

      setTimeout(() => {
        this.getpage(this.currentpage + 1)
        setTimeout(() => {
          done()
        })
      }, 1500)

      this.$refs.scroller.scrollTo(0, 0, false)
    },
    scrollrefresh () {
      console.log('refresh')
      // this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {})
      // })
      this.scroll.refresh()
      console.log(this.scroll)
    }
  },
  created () {
    this.getData()
    this.$nextTick(() => {
      this.windowheight = window.screen.height
      console.log(window.screen.height)
      // this.$refs.wrapper.style.height = window.screen.availHeight + 'px'
      this.scroll = new BScroll(this.$refs.wrapper, {})
      this.scroll.on('touchEnd', (pos) => {
        console.log('y:', pos.y)
        console.log('maxY:', this.scroll.maxScrollY)
        if (this.scroll.y <= (this.scroll.maxScrollY - window.screen.height * 0.10)) {
          this.getpage(this.currentpage + 1)
        }
      })
      this.scroll.on('touchEnd', (pos) => {
        console.log('y:', pos.y)
        console.log('maxY:', this.scroll.maxScrollY)
        if (this.scroll.y > window.screen.height * 0.10) {
          this.getpage(this.currentpage - 1)
        }
      })
      this.scroll.on('pullingUp', () => {
        this.ispullingup = true
      })
      this.scroll.on('pullingUp', () => {
        this.ispullingup = true
      })
    })
  },
  mounted () {

  },
  watch: {
    picomplete: function () {
      // this.scroll = new BScroll(this.$refs.wrapper, {})
      // console.log(this.scroll)
    }
  }
}
</script>

<style>
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  display: none;
  z-index: 1000;
}
</style>
