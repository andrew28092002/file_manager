import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { checkLast } from "./../features/checkLast";

const createUseStore = <Id extends string>(id: Id) =>
  defineStore(id, () => {
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
      const cuttedPath = checkLast(newPath);
      localStorage.setItem(id, cuttedPath);
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

export const useLeftFilesStore = createUseStore("leftFiles");
export const useRightFilesStore = createUseStore("rightStore");
