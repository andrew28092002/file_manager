export const checkLast = (path: string) => {
  const pathArray = path.split("/");
  const lastFile = pathArray[pathArray.length - 1];

  if (lastFile.split(".").length > 1) {
    return pathArray.slice(0, -1).join("/");
  } else {
    return path;
  }
};
