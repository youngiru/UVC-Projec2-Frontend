<template>
  <div>
    <b-nav class="controlheader_nav">
      <b-nav-item v-if="tokenUserRole == 'leader'" @click="$router.push('/leader')">관리자페이지</b-nav-item>
      <b-nav-item v-else-if="tokenUserRole == 'member'"></b-nav-item>
      <b-nav-item active @click="$router.push('/control/dashboard')">대시보드</b-nav-item>
      <b-nav-item @click="$router.push('/webgl')">3D</b-nav-item>
      <b-nav-item @click="$router.push('/control/workhistory')">작업이력</b-nav-item>
      <b-nav-item @click="$router.push('/auth/mypage')">마이페이지</b-nav-item>
      <b-nav-item @click="$router.push('/auth/logout')">로그아웃</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  computed: {
    tokenUserRole() {
      return this.$store.getters.TokenUser && this.$store.getters.TokenUser.role
    }
  }
}
</script>

<style lang="scss" scoped></style>
