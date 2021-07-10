<template>
  <div>
    <v-breadcrumbs :items="navigationInfo">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  name: 'MessageArea',
  props: ['navigationInfo']
}
</script>
