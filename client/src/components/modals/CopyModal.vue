<template>
  <div class="modal-wrapper" @click.self="emit('close')">
    <div class="modal">
      <h3>Вы хотите скопировать из {{ leftPath }} в {{ rightPath }}</h3>
      <button @click="choosePath(leftPath, rightPath)">yes</button>
      <button @click="choosePath(rightPath, leftPath)">backwards</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { toRefs } from "vue";

const props = defineProps(["leftPath", "rightPath"]);
const emit = defineEmits(["close"]);

const { leftPath, rightPath } = toRefs(props);
const checkLast = (path: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    return pathArray.slice(-1).join("/");
  } else {
    return path;
  }
};

const checkIsFileOrFolder = (path: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    return true;
  } else {
    return false;
  }
};

const submit = (pathFrom: string, pathTo: string) => {
  try {
    const endPath = checkLast(pathTo);
    const body = { pathFrom, pathTo: endPath };
    const url =
      (checkIsFileOrFolder(pathFrom)
        ? import.meta.env.VITE_FILE_URL
        : import.meta.env.VITE_FOLDER_URL) + "/copy";

    axios.post(url, body);
  } catch (e) {
    console.log(e);
  }
};

const choosePath = (pathTo: string, pathFrom: string) => {
  console.log(pathTo, pathFrom)
  submit(pathTo, pathFrom);
  emit('close')
};
</script>

<style scoped lang="scss">
.modal-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  height: 20vh;
  width: 30vw;
  background-color: white;
}
</style>
