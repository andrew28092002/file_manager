<template>
  <div class="content">
    <CreateModal
      v-if="modal === 'create'"
      @close="closeModal"
      @createFolder="createFolder"
      @createFile="createFile"
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
      <button>Скопировать</button>
      <button>Переместить</button>
      <button>Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import Items from "./components/Items.vue";
import CreateModal from "./components/modals/CreateModal.vue";
import { useLeftFilesStore } from "./stores/leftFiles";
import { useRightFilesStore } from "./stores/rightFiles";
import { ref } from "vue";

const modal = ref();

const leftStore = useLeftFilesStore();
leftStore.chooseNewPath("c");

const rightStore = useRightFilesStore();
rightStore.chooseNewPath("c/documents");

const checkLast = (path: string, message: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    alert(message);
    return false;
  } else {
    return true;
  }
};

const checkAndRemoveLast = (path: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    return pathArray.slice(-1).join("/");
  } else {
    return path;
  }
};

const closeModal = () => {
  modal.value = "";
};

const createFolder = (side: string, name: string) => {
  const message = "Нельзя создавать директорию внутри файла";
  if (side === "left") {
    if (checkLast(leftStore.path, message)) {
      axios.post(import.meta.env.VITE_FOLDER_URL + "/create", {
        path: `${leftStore.path}/${name}`,
      });
    }
  } else if (side === "right") {
    if (checkLast(rightStore.path, message)) {
      axios.post(import.meta.env.VITE_FOLDER_URL + "/create", {
        path: `${rightStore.path}/${name}`,
      });
    }
  }
};

const createFile = (side: string, file: File) => {
  const formData = new FormData();
  const message = "Нельзя создавать файл внутри файла";
  formData.append("file", file);
  if (side === "left") {
    formData.append("path", leftStore.path);

    if (checkLast(leftStore.path, message)) {
      axios.post(import.meta.env.VITE_FILE_URL + "/create", formData);
    }
  } else if (side === "right") {
    formData.append("path", leftStore.path);

    if (checkLast(rightStore.path, message)) {
      axios.post(import.meta.env.VITE_FILE_URL + "/create", formData);
    }
  }
};

const copyFolder = (side: string) => {
  if (side === "left") {
    const pathTo = checkAndRemoveLast(leftStore.path);

    axios.post(import.meta.env.VITE_FOLDER_URL + "/copy", {
      pathTo,
      pathFrom: rightStore.path,
    });
  } else if (side === "right") {
    const pathTo = checkAndRemoveLast(rightStore.path);

    axios.post(import.meta.env.VITE_FOLDER_URL + "/copy", {
      pathTo,
      pathFrom: leftStore.path,
    });
  }
};

const copyFile = (side: string) => {
  if (side === "left") {
    const pathTo = checkAndRemoveLast(leftStore.path);

    axios.post(import.meta.env.VITE_FILE_URL + "/copy", {
      pathTo,
      pathFrom: rightStore.path,
    });
  } else if (side === "right") {
    const pathTo = checkAndRemoveLast(rightStore.path);

    axios.post(import.meta.env.VITE_FILE_URL + "/copy", {
      pathTo,
      pathFrom: leftStore.path,
    });
  }
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
