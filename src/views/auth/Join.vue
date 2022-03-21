<template>
  <div id="Join_wrap">
    <h3>회원가입</h3>
    <div class="Join_formbox">
      <b-form v-if="show" class="Join_form" @submit="onSubmit" @reset="onReset">
        <b-form-group id="Join_namebox" label-for="Join_name" label="이름" label-cols="4" label-cols-lg="2">
          <b-form-input
            id="Join_name"
            v-model="join.name"
            type="text"
            placeholder="이름을 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="Join_idbox" label-for="Join_id" label="ID" label-cols="4" label-cols-lg="2">
          <b-form-input
            id="Join_id"
            v-model="join.userid"
            type="text"
            placeholder="아이디를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="Join_pwbox" label-for="Join_pw" label="비밀번호" label-cols="4" label-cols-lg="2">
          <b-form-input
            id="Join_pw"
            v-model="join.password"
            type="password"
            aria-describedby="password-help-block"
            placeholder="비밀번호를 입력해주세요"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="Join_positionbox" label-for="Join_position" label="직급" label-cols="4" label-cols-lg="2">
          <b-form-select id="input-3" v-model="join.position" :options="positions" required></b-form-select>
        </b-form-group>
        <div class="Join_btnbox">
          <b-button type="submit" class="Join_btnsub">확인</b-button>
          <b-button type="reset" class="Join_btnres">취소</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      join: {
        name: '',
        userid: '',
        password: '',
        position: null
      },
      positions: [{ text: '직급을 선택해주세요', value: null }, '팀장', '팀원'],
      show: true
    }
  },
  methods: {
    // 회원가입 제출 메소드
    onSubmit() {
      this.$router.push('/')
      this.$store.dispatch('actUserInsert', this.user)
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.join.name = ''
      this.join.userid = ''
      this.join.password = ''
      this.join.position = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style src="@/assets/sass/main.css"></style>
