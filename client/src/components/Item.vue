<template>
  <div class="row">
    <div class="name">{{ name }}</div>
    <div class="type">type</div>
    <div class="size">{{ size }}</div>
    <div class="date">{{ time }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

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
    return file?.value?.size || "size";
  },
  set() {},
});

const time = computed({
  get() {
    return file?.value?.time?.toLocaleString() || "time";
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
