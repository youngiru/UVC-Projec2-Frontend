<template>
  <div id="Admin_header_wrap">
    <b-row class="Admin_header_con">
      <b-col sm="7">
        <h2>설비관리시스템</h2>
      </b-col>
      <b-col sm="5" style="text-align: right">
        <div class="Admin_header_navbox">
          <b-container class="bv-example-row Admin_main_box_co">
            <b-row>
              <b-col class="Admin_header_nav" @click="$router.push('/admin/user')">사용자 관리</b-col>
              <b-col class="Admin_header_nav">기기 관리</b-col>
              <b-col class="Admin_header_nav">기기 제어</b-col>
              <b-col class="Admin_header_nav">로그아웃</b-col>
            </b-row>
          </b-container>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
