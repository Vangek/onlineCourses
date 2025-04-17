<template>
  <div class="course-title">
    <div class="left">
      <div class="line"></div>
      <div class="main-title">XXX课程</div>
      <div class="sub-title">这是一种XXX课程</div>
    </div>
    <div class="right">
      <div class="more">
        <div class="text">更多课程</div>
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.course-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;

  .left {
    display: flex;
    align-items: flex-end;
    height: 100%;

    .line {
      width: 4px;
      height: 100%;
      background-color: #0000F5;
    }

    .main-title {
      margin: 0 10px;
      font-size: 32px;
    }

    .sub-title {
      color: #bbb;
    }
  }

  .right {
    height: 100%;
    .more {
      color: #bbb;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>