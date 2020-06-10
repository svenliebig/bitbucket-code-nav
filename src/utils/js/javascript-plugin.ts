import { Plugin } from "../../init"
import { Document, Line } from "../lineparser"
import { resolve, parse, format } from "url"

const importRegex = /import\s[\r\n\s\w{},*\$]*\sfrom\s['"](.+)['"]/

const acceptedFileExt: Array<string> = [".js", ".tsx", ".ts"]

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

type ImportLink = {
    element: Element
    url: string
    restUrl: string
}

const toImportLink = ({ element, value }: Line, { path, fileExt }: Document): ImportLink => {
    const importFile = importPath(value) + fileExt
    const url = resolve(path, importFile)

    const restUrl = parse(url)
    restUrl.pathname = "/rest/api/latest" + restUrl.pathname

    return { element: element, url: url, restUrl: format(restUrl) }
}

const JavascriptPlugin: Plugin = {
    accept(fileExt: string): boolean {
        return acceptedFileExt.includes(fileExt)
    },

    execute(document: Document): void {
        document.lines
            .filter((line) => importFilter(line.value))
            .map((line) => toImportLink(line, document))
            .forEach(async (importLink) => {
                const response = await fetch(importLink.restUrl)
                debugger
                if (response.ok) {
                    const link = window.document.createElement("a")
                    link.setAttribute("href", importLink.url)
                    const textToWrap = importLink.element.querySelector(".cm-string")

                    if (textToWrap) {
                        textToWrap.parentNode?.insertBefore(link, textToWrap)
                        link.appendChild(textToWrap)
                    }
                }
            })
    },
}

export default JavascriptPlugin
