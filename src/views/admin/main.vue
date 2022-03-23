<template>
  <div id="Admin_main_wrap">
    <div class="Admin_main_header">
      <h2>관리자</h2>
    </div>
    <div class="Admin_main_box">
      <b-container class="bv-example-row Admin_main_box_co">
        <b-row>
          <b-col class="Admin_main_text" @click="$router.push('/admin/user')">사용자 관리</b-col>
          <b-col class="Admin_main_text">기기 관리</b-col>
          <b-col class="Admin_main_text">기기 제어</b-col>
          <b-col class="Admin_main_text">로그아웃</b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style src="@/assets/sass/main.css"></style>
