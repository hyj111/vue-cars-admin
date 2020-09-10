<template>
  <div id="layout-container">
    <layout-header />
    <layout-main />
    <layout-nav />
  </div>
</template>



<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  }
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
}
</style>
