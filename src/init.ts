import { read, Document } from "./utils/lineparser"
import JavascriptPlugin from "./utils/js/javascript-plugin"

const plugins = [JavascriptPlugin]
export interface Plugin {
    accept(fileExt: string): boolean
    execute(document: Document): void
}

export function init(codemirror: Element): void {
    const document: Document = read(codemirror)

    const plugins = getPluginsForPath(document)

    plugins.forEach((plugin) => {
        plugin.execute(document)
    })
}

function getPluginsForPath({ fileExt }: Document): Array<Plugin> {
    return plugins.filter((plugin) => plugin.accept(fileExt))
}
