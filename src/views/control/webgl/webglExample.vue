<template>
  <hello-edukit></hello-edukit>
</template>

<script>
import Three from './js/example'

let helloEdukit = {
  template: '<div ref="webgl"></div>',
  mounted() {
    Three(this.$refs.webgl)
  }
}

export default {
  name: 'WebglExample',
  components: {
    helloEdukit
  }
}
</script>
