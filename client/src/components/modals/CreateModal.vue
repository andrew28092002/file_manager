<template>
  <div class="modal-wrapper" @click.self="emit('close')">
    <div class="modal" v-if="step === 'side'">
      <h1>Выберите путь</h1>
      <button
        @click="
          () => {
            side = 'left';
            step = 'type';
          }
        "
      >
        LEFT
      </button>
      <button
        @click="
          () => {
            side = 'right';
            step = 'type';
          }
        "
      >
        RIGHT
      </button>
      <button @click="emit('close')">Exit</button>
    </div>
    <div class="modal" v-if="step === 'type'">
      <h1>Выберите тип</h1>
      <button @click="() => (step = 'directory')">Directory</button>
      <button @click="() => (step = 'file')">File</button>
      <button @click="emit('close')">Exit</button>
    </div>
    <div class="modal" v-if="step === 'file'">
      <input type="file" @change="changeFile($event)" />
      <button @click="submitFile()">Submit</button>
      <button @click="step = 'type'">Back</button>
      <button @click="emit('close')">Exit</button>
    </div>
    <div class="modal" v-if="step === 'directory'">
      <input type="text" @change="changeDirectory($event)" />
      <button @click="submitDirectory()">Submit</button>
      <button @click="step = 'type'">Back</button>
      <button @click="emit('close')">Exit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["path"]);
const emit = defineEmits(["close", "createFolder", "createFile"]);

const file = ref();
const step = ref("side");
const side = ref("");

const changeFile = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;

  if (files && files?.length > 0) {
    file.value = files[0];
  }
};

const changeDirectory = (event: Event) => {
  const text = (event.target as HTMLInputElement).value;

  file.value = text;
};

const submitFile = () => {
  emit("createFile", side.value, file.value);
  emit("close");
};

const submitDirectory = () => {
  emit("createFolder", side.value, file.value);
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
