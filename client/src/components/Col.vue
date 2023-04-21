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
    <div class="files">
      <div class="row">
        <div class="name">
          name
        </div>
        <div class="type">
          type
        </div>
        <div class="size">
          size
        </div>
        <div class="date">
          date
        </div>
      </div>
     
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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

  padding: 5px 10px;
}

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
    padding: 2px 5px
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
