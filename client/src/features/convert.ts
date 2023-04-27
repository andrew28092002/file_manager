const name = {};

export const convert = (volume: number) => {
    const fsizeb = volume / 8
  const fsizekb = fsizeb / 1024;
  const fsizemb = fsizekb / 1024;
  const fsizegb = fsizemb / 1024;
  const fsizetb = fsizegb / 1024;
  let fsize

  if (fsizekb <= 1024) {
    fsize = fsizekb.toFixed(1) + " кб";
  } else if (fsizekb >= 1024 && fsizemb <= 1024) {
    fsize = fsizemb.toFixed(1) + " мб";
  } else if (fsizemb >= 1024 && fsizegb <= 1024){
    fsize = fsizegb.toFixed(1) + " гб";
  } else {
    fsize = fsizetb
  }

  return fsize;
};
