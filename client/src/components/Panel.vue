<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>

    <div class="pl-2 pr-2 pb-2 pt-2">
      <slot> No slot content is defined </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>