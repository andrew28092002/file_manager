<template>
  <div class="modal-wrapper" @click.self="emit('close')">
    <div class="modal" v-if="step === 'side'">
      <h1>Выберите путь</h1>
      <button @click="choosePath(leftPath)">LEFT</button>
      <button @click="choosePath(rightPath)">RIGHT</button>
    </div>
    <div class="modal" v-if="step === 'type'">
      <h1>Выберите тип</h1>
      <button @click="chooseType('directory')">Directory</button>
      <button @click="chooseType('file')">File</button>
      <button @click="step = 'side'">Back</button>
    </div>
    <div class="modal" v-if="step === 'file'">
      <input type="file" @change="changeFile($event)" />
      <button @click="submit()">Submit</button>
      <button @click="step = 'type'">Back</button>
    </div>
    <div class="modal" v-if="step === 'directory'">
      <input type="text" v-model="file" />
      <button @click="submit()">Submit</button>
      <button @click="step = 'type'">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, toRefs } from "vue";

const props = defineProps(["leftPath", "rightPath"]);
const emit = defineEmits(["close"]);

const { leftPath, rightPath } = toRefs(props);

const file = ref();
const step = ref("side");
const path = ref("");
const type = ref("");

const choosePath = (resultPath: string) => {
  path.value = resultPath;

  step.value = "type";
};

const chooseType = (resultType: "file" | "directory") => {
  type.value = resultType;

  step.value = resultType;
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

const createFolder = async (path: string, name: string) => {
  const cuttedPath = checkAndRemoveLast(path);

  await axios.post(import.meta.env.VITE_FOLDER_URL + "/create", {
    path: `${cuttedPath}/${name}`,
  });
  location.reload();
};

const createFile = async (path: string, file: File) => {
  const cuttedPath = checkAndRemoveLast(path);

  const formData = new FormData();
  formData.append("path", cuttedPath);
  formData.append("file", file);

  await axios.post(import.meta.env.VITE_FILE_URL + "/create", formData);
  location.reload();
};

const changeFile = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  if (files && files?.length > 0) {
    file.value = files[0];
  }
};

const submit = () => {
  type.value === "file"
    ? createFile(path.value, file.value)
    : createFolder(path.value, file.value);
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
