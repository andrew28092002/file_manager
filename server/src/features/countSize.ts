import * as fs from 'fs'
import { createPath } from './createPath'


export const countSize = (path: string) => {
    let size = 0
    
    for (const file of fs.readdirSync(path)){
        const stat = fs.statSync(createPath(path, file))

        if (!stat.isDirectory()) size += stat.size
        else size += countSize(createPath(path, file))
    }

    return size
}