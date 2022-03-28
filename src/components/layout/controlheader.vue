<template>
  <div>
    <b-nav class="controlheader_nav">
      <b-nav-item active @click="$router.push('/control/dashboard')">대시보드</b-nav-item>
      <b-nav-item @click="$router.push('/webgl')">3D</b-nav-item>
      <b-nav-item @click="$router.push('/control/workhistory')">작업이력</b-nav-item>
      <b-nav-item @click="$router.push('/control/factorycontrol')">공장제어</b-nav-item>
      <b-nav-item @click="$router.push('/auth/logout')">로그아웃</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
