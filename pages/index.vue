<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu/>
      </el-col>
      <el-col :span="19">
        <life/>
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24">
        <artistic/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Life from '@/components/index/life.vue'
import Artistic from '@/components/index/artistic.vue'
export default {
  components: {
    Emenu,
    Life,
    Artistic
  },
  mounted() {
    // this.$axios.get('http://api.map.baidu.com/place/v2/search?query=火锅&region=上海&output=json&ak=sWHYsEx1520Ha65G6KUcmYtOgNOY4oPS').then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
</style>
