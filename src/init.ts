import { read, Document } from "./utils/lineparser"
import JavascriptPlugin from "./utils/js/javascript-plugin"

const plugins = [JavascriptPlugin]
let count = 0
export interface Plugin {
    accept(fileExt: string): boolean
    execute(document: Document): void
}

export function init(codemirror: Element): void {
    console.log("init called " + count++)

    const document: Document = read(codemirror)

    const plugins = getPluginsForPath(document)

    plugins.forEach((plugin) => {
        plugin.execute(document)
    })
}

function getPluginsForPath({ fileExt }: Document): Array<Plugin> {
    return plugins.filter((plugin) => plugin.accept(fileExt))
}
