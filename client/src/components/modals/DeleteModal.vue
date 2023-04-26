<template>
  <div class="modal-wrapper" @click.self="emit('close')">
    <div class="modal">
      <h3>
        Вы хотите удалить
        {{ leftPath }} или {{ rightPath }}?
      </h3>
      <button @click="choosePath(leftPath)">left</button>
      <button @click="choosePath(rightPath)">right</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { toRefs } from "vue";

const props = defineProps(["leftPath", "rightPath"]);
const emit = defineEmits(["close"]);

const { leftPath, rightPath, type } = toRefs<{
  leftPath?: string;
  rightPath?: string;
  type?: "move" | "copy";
}>(props);

const checkIsFileOrFolder = (path: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    return true;
  } else {
    return false;
  }
};

const submit = async (path: string) => {
  try {
    const url =
      (checkIsFileOrFolder(path)
        ? import.meta.env.VITE_FILE_URL
        : import.meta.env.VITE_FOLDER_URL) + "/delete";

    await axios.post(url, { path });
    location.reload()
  } catch (e) {
    console.log(e);
  }
};

const choosePath = (path: string) => {
  submit(path);
  emit("close");
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
