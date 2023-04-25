<template>
  <div class="container">
    <div class="header">
      <select name="" id="" class="disk">
        <option value="c">c</option>
        <option value="d">d</option>
        <option value="e">e</option>
      </select>
      <div class="path">
        <p>{{path}}</p>
      </div>
    </div>
    <div class="files">
      <Item />
      <Item v-for="file in files" :file="file" :key="file.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import Item from "./Item.vue";

defineEmits(["choose"]);

// const chooseNewPath = () => {
//   emit()
// }

const props = defineProps<{
  path: string;
  files: {
    name: string;
    size: number;
    time?: Date;
  }[];
}>();

const { path, files } = toRefs(props);
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

  padding: 5px;
}

.files {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

button:first-child{
  border: none;
  background-color: transparent;
}
</style>
