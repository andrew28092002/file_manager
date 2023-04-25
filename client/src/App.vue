<template>
  <div class="content">
    <div class="container">
      <Items
        v-if="leftStore.files.length > 0"
        class="card"
        @choose="leftStore.chooseNewPath"
        :path="leftStore.path"
        :files="leftStore.files"
      />
      <Items
        v-if="rightStore.files.length > 0"
        class="card"
        @choose="rightStore.chooseNewPath"
        :path="rightStore.path"
        :files="rightStore.files"
      />
    </div>
    <div class="footer">
      <button>Создать</button>
      <button>Скопировать</button>
      <button>Переместить</button>
      <button>Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Items from "./components/Items.vue";
import { useLeftFilesStore } from "./stores/leftFiles";
import { useRightFilesStore } from "./stores/rightFiles";

const leftStore = useLeftFilesStore();
leftStore.chooseNewPath("c");

const rightStore = useRightFilesStore();
rightStore.chooseNewPath("c/documents");

</script>

<style scoped lang="scss">
.content {
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

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 10vh;
  background-color: transparent;
}

.card:last-child {
  margin: 0;
}

button {
  border-radius: 0;
  border: 1px solid #000;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
