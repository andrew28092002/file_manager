import { resolve } from "path"


export const createPath = (path1: string, path2?: string) => {
    if (!path2) return resolve(__dirname, '..', 'static', path1)
    else return resolve(__dirname, '..', 'static', path1, path2)
}