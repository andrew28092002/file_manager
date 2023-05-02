import { resolve } from "path"


/** какой тип возвращает? */
export const createPath = (path1: string, path2?: string) => {
    /** лучше тренарник */
    if (!path2) return resolve(__dirname, '..', 'static', path1)
    /** не понимаю зачем такое усложнение, если передали path2 будет значение, не передеали будет undfined. зачем лишнее условие */
    else return resolve(__dirname, '..', 'static', path1, path2)
}