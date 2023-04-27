<template>
  <div class="content">
    <CreateModal
      v-if="modal === 'create'"
      @close="closeModal"
      :leftPath="leftStore.path"
      :rightPath="rightStore.path"
    />
    <MoveModal
      v-if="modal === 'copy'"
      @close="closeModal"
      :type="'copy'"
      :leftPath="leftStore.path"
      :rightPath="rightStore.path"
    />
    <MoveModal
      v-if="modal === 'move'"
      @close="closeModal"
      :type="'move'"
      :leftPath="leftStore.path"
      :rightPath="rightStore.path"
    />
    <DeleteModal
      v-if="modal === 'delete'"
      @close="closeModal"
      :leftPath="leftStore.path"
      :rightPath="rightStore.path"
    />
    <div class="container">
      <Items
        class="card"
        @choose="leftStore.chooseNewPath"
        :path="leftStore.path"
        :files="leftStore.files"
      />
      <Items
        class="card"
        @choose="rightStore.chooseNewPath"
        :path="rightStore.path"
        :files="rightStore.files"
      />
    </div>
    <div class="footer">
      <button @click="modal = 'create'">Создать</button>
      <button @click="modal = 'copy'">Скопировать</button>
      <button @click="modal = 'move'">Переместить</button>
      <button @click="modal = 'delete'">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Items from "./components/Items.vue";
import CreateModal from "./components/modals/CreateModal.vue";
import MoveModal from "./components/modals/MoveModal.vue";
import DeleteModal from "./components/modals/DeleteModal.vue";
import { useLeftFilesStore, useRightFilesStore } from "./stores/files";
import { onMounted, ref } from "vue";

const modal = ref();

const leftStore = useLeftFilesStore();
const rightStore = useRightFilesStore();

onMounted(() => {
  leftStore.chooseNewPath(localStorage.getItem("leftFiles") || "c");
  rightStore.chooseNewPath(localStorage.getItem('rightFiles') || "d")
});

const closeModal = () => {
  modal.value = "";
};
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
