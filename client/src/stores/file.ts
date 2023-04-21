import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", () => {
  const leftPath = ref("c");
  const rightPath = ref("c");
  const choosenFile = ref("c");

  const chooseFile = (path: string) => {
    choosenFile.value = path;
  };

  const changeLeftPath = (path: string) => {
    leftPath.value = path;
  };

  const changeRightPath = (path: string) => {
    leftPath.value = path;
  };

  return {
    leftPath,
    rightPath,
    choosenFile,
    chooseFile,
    changeLeftPath,
    changeRightPath,
  };
});
