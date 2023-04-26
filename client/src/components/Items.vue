<template>
  <div class="container">
    <div class="header">
      <select name="" id="" class="disk" @change="onChange($event)">
        <option value="c">c</option>
        <option value="d">d</option>
        <option value="e">e</option>
      </select>
      <div class="path">
        <a
          href="#"
          v-for="(item, index) in path.split('/')"
          @click="
            $emit(
              'choose',
              path
                .split('/')
                .slice(0, index + 1)
                .join('/')
            )
          "
          >{{ `${item}${index === path.split("/").length - 1 ? "" : "/"} ` }}</a
        >
      </div>
    </div>
    <div class="files">
      <Item />
      <Item
        v-for="file in files"
        :file="file"
        :key="file.name"
        @click="
          path.split('/')[path.split('/').length - 1].split('.').length == 1
            ? $emit('choose', `${path}/${file.name}`)
            : $emit(
                'choose',
                `${path
                  .split('/')
                  .filter((item) => item.split('.').length === 1)
                  .join('/')}/${file.name}`
              )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import Item from "./Item.vue";

const emit = defineEmits(["choose"]);

const props = defineProps<{
  path: string;
  files: {
    name: string;
    size: number;
    time?: Date;
  }[];
}>();

const { path, files } = toRefs(props);

const onChange = (event: Event) => {
  emit('choose', (event.target as HTMLSelectElement).value)
}
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

button:first-child {
  border: none;
  background-color: transparent;
}
</style>
