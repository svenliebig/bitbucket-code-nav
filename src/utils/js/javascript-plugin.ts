import { Plugin } from "../../init"
import { Document } from "../lineparser"
import { extname } from "path"
import { resolve } from "url"

const importRegex = /import\s[\r\n\s\w{},*\$]*\sfrom\s['"](.+)['"]/

const importFilter = (content: string): boolean => {
    if (importRegex.test(content)) {
        return true
    }
    return false
}

const importPath = (importLine: string): string => {
    const match = importLine.match(importRegex)
    if (match && match.length === 2) {
        return match[1]
    }
    return ""
}

const JavascriptPlugin: Plugin = {
    accept(fileExt: string): boolean {
        return fileExt === ".js"
    },

    execute(document: Document): void {
        document.lines
            .filter((line) => importFilter(line.value))
            .forEach(async (line) => {
                const ext = extname(document.path)

                const importFile = importPath(line.value) + ext
                const url = resolve(document.path, importFile)

                const response = await fetch(url)
                if (response.ok) {
                    const link = window.document.createElement("a")
                    link.setAttribute("href", url)
                    const textToWrap = line.element.querySelector(".cm-string")

                    if (textToWrap) {
                        textToWrap.parentNode?.insertBefore(link, textToWrap)
                        link.appendChild(textToWrap)
                    }
                }
            })
    },
}

export default JavascriptPlugin
