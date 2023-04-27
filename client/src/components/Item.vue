<template>
  <button class="row">
    <div class="name">{{ name }}</div>
    <div class="type">{{ type }}</div>
    <div class="size">{{ size }}</div>
    <div class="date">{{ time }}</div>
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { convert } from "./../features/convert";

const props = defineProps<{
  file?: {
    name: string;
    size: number;
    time?: Date;
  };
}>();

const { file } = toRefs(props);

const name = computed({
  get() {
    return file?.value?.name || "name";
  },
  set() {},
});

const size = computed({
  get() {
    const tmp = file?.value?.size as number;
  
    return !isNaN(tmp) ? convert(tmp) : "size";
  },
  set() {},
});

const type = computed({
  get() {
    const splittedName = file?.value?.name.split(".");

    if (splittedName?.length) {
      return splittedName.length > 1
        ? splittedName[splittedName.length - 1]
        : "directory";
    } else return "type";
  },
  set() {},
});

const time = computed({
  get() {
    const tmp = file?.value?.time as Date
    const date = new Date(tmp)
  
    return tmp ? date.toLocaleString(): "time";
  },
  set() {},
});
</script>

<style scoped lang="scss">
.row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2px 5px;
  }

  &:first-child div {
    border: 1px solid #fff;

    &:first-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }
}
</style>
