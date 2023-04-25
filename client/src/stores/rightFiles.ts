import { ref, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useRightFilesStore = defineStore("rightFilesStore", () => {
  const path = ref("");
  const files = ref<
    {
      name: string;
      size: number;
      date?: Date;
    }[]
  >([]);
  const isLoading = ref(false);

  const getFiles = async (path: string) => {
    isLoading.value = true;

    const response = await axios.post(
      import.meta.env.VITE_FOLDER_URL + "/get",
      { path }
    );

    isLoading.value = false;
    return response.data;
  };

  const chooseNewPath = (newPath: string) => {
    if (newPath !== path.value) path.value = newPath;
  };

  watch(path, async () => {
    const splittedPath = path.value.split("/");
    const lastSplittedFile = splittedPath[splittedPath.length - 1].split(".");

    if (lastSplittedFile.length === 1) {
      const response = await getFiles(path.value);

      files.value = response;
    }
  });

  return {
    path,
    isLoading,
    files,
    chooseNewPath,
  };
});
