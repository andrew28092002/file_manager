import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", () => {
  const leftPath = ref("c");
  const rightPath = ref("c");
  const choosenFile = ref("c");
  const leftFiles = ref([]);
  const rightFiles = ref([]);

  const watchLeft = watch(
    () => leftPath,
    async () => {
      const files = await getFiles(leftPath.value);
      leftFiles.value = files;
    }
  );

  const watchRight = watch(
    () => rightFiles,
    async () => {
      const files = await getFiles(rightPath.value);
      leftFiles.value = files;
    }
  );

  const getFiles = async (path: string) => {
    const response = await fetch(import.meta.env.FOLDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(path),
    });

    const files = await response.json();
    return files;
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
    chooseFile,
    changeLeftPath,
    changeRightPath,
    watchLeft,
    watchRight,
  };
});
