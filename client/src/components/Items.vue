<template>
  <div class="container">
    <div class="header">
      <select name="" id="" class="disk">
        <option value="c">c</option>
        <option value="d">d</option>
        <option value="e">e</option>
      </select>
      <div class="path">
        <p>c/games/text.txt</p>
      </div>
    </div>
    <Item />
  </div>
</template>

<script setup lang="ts">
import Item from './Item.vue';

defineProps(['dbClick'])
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  overflow: scroll;
  border: 5px solid #fff;
  margin-right: 10px;
  flex: 1;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}

.header {
  width: 100%;

  display: flex;
  justify-content: space-around;

  padding: 5px
}

</style>
