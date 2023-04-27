const name = {};

export const convert = (volume: number) => {
  const fsizekb = volume / 1024;
  const fsizemb = volume / 1024;
  const fsizegb = volume / 1024;
  const fsizetb = volume / 1024;
  let fsize

  if (fsizekb <= 1024) {
    fsize = fsizekb.toFixed(3) + " кб";
  } else if (fsizekb >= 1024 && fsizemb <= 1024) {
    fsize = fsizemb.toFixed(3) + " мб";
  } else {
    fsize = fsizegb.toFixed(3) + " гб";
  }

  return fsize;
};
