<template>
  <div class="files">
    <div class="row">
      <div class="name">name</div>
      <div class="type">type</div>
      <div class="size">size</div>
      <div class="date">date</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.files {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

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
