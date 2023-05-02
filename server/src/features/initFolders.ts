import * as fs from 'fs'
import { resolve } from 'path'
import { createPath } from './createPath'

/**
 * Не понимаю смысл этой функции
 */
export const initFolder = () => {
    const rootPath = resolve(__dirname, '..', 'static')
    /**
     * что произойдёт если таких дисков не будет на хостовой машине? например на linux?
     */
    const folderC = createPath(rootPath, 'c')
    const folderD = createPath(rootPath, 'd')
    const folderE = createPath(rootPath, 'e')

    if (!fs.existsSync(folderC)) fs.mkdirSync(folderC, {recursive: true})
    if (!fs.existsSync(folderD)) fs.mkdirSync(folderD, {recursive: true})
    if (!fs.existsSync(folderE)) fs.mkdirSync(folderE, {recursive: true})

    console.log('ROOT DIRECTORY SUCCESSFULLY CREATED')
}