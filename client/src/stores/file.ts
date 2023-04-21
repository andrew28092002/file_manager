import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

export const useFileStore = defineStore("fileStore", () => {
  const leftPath = ref("");
  const rightPath = ref("");
  const choosenFile = ref("");
  const leftFiles = ref([]);
  const rightFiles = ref([]);
  
  const watchLeft = watch(
    () => leftPath,
    async () => {
      const files = await getFiles(leftPath.value);
      console.log(files)
      leftFiles.value = files;
    }
  );

  const watchRight = watch(
    () => rightPath,
    async () => {
      const files = await getFiles(rightPath.value);
      leftFiles.value = files;
    }
  );

  const getFiles = async (path: string) => {
    const response = await axios.post(import.meta.env.VITE_FOLDER_URL + "/get", {
      path,
    });

    return response.data;
  };

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
    leftFiles,
    rightFiles,
    choosenFile,
    getFiles,
    chooseFile,
    changeLeftPath,
    changeRightPath,
    watchLeft,
    watchRight,
  };
});
