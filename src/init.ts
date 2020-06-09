import { read, Document } from "./utils/lineparser"
import JavascriptPlugin, { importRegex } from "./utils/js/index"
import { extname } from "path"
import { resolve } from "url"

export interface Plugin {
    importFilter(content: string): boolean
    importPath(importLine: string): string
    accept(fileExt: string): boolean
}

export function init(codemirror: Element): void {
    const document: Document = read(codemirror)

    const plugins = getPluginsForPath(document.path)

    plugins.forEach((plugin) => {
        createLinks(plugin, document)
    })
}

function createLinks(plugin: Plugin, document: Document): void {
    document.lines
        .filter((line) => plugin.importFilter(line.value))
        .forEach((line) => {
            const ext = extname(document.path)

            const importFile = plugin.importPath(line.value) + ext
            const url = resolve(document.path, importFile)

            const link = window.document.createElement("a")
            link.setAttribute("href", url)
            const textToWrap = line.element.querySelector(".cm-string")

            if (textToWrap) {
                textToWrap.parentNode?.insertBefore(link, textToWrap)
                link.appendChild(textToWrap)
            }
        })
}

function getPluginsForPath(path: string): Array<Plugin> {
    const plugins = [new JavascriptPlugin()]
    const fileExt = extname(path)

    return plugins.filter((plugin) => plugin.accept(fileExt))
}
