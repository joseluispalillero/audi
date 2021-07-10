<template>
  <div id="bannerfooter">
    <div class="content">
      <span class="white--text">{{ message }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageArea',
  computed: {
    message () {
      return this.$store.state.message
    }
  }
}
</script>
