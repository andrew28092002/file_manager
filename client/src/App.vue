<script setup lang="ts">
import Col from './components/Col.vue';
</script>

<template>
  <div class="content">
    <div class="container">
      <Col class="card"/>
      <Col class="card"/>
    </div>
    <div class="footer">
      <button>Создать</button>
      <button>Скопировать</button>
      <button>Переместить</button>
      <button>Удалить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container {
  width: 90vw;
  height: 80vh;
  background-color: transparent;
  // box-shadow: 0 4px 12px rgba(0,0,0,0.2), 0 16px 20px rgba(0,0,0,0.2);
  display: flex;
  flex-flow: row wrap;
}

.footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 10vh;
  background-color: transparent;
}

.card:last-child{
  background-color: red;
  margin: 0;
}

button{
  border-radius: 0;
  border: 1px solid #000;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
