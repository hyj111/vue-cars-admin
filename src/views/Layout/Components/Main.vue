<template>
  <div id="main-wrap">
      <transition name="slide-fade" mode="out-in">  
    <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
       
    }
  },
}
</script>

<style lang="scss" scoped>
#main-wrap {
  padding:20px;
  position: relative;
  // left: 250px;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  margin: 75px 0  0 250px ;
  overflow: hidden;
  border: 30px solid #f7f7f7;
  border-bottom: 0px;
}
// 动画
.slide-fade{
  position: absolute;right:0;left: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {

  transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  right:0;left: 0;
  transform: translateX(-50px);
  opacity: 0;
}
</style>