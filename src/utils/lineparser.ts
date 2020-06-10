import { extname } from "path"

export type Document = {
    lines: Array<Line>
    path: string
    fileExt: string
}

export type Line = {
    value: string
    lineNumber: number
    element: Element
}

function toLine(lineElement: Element): Line {
    const lineNumber = lineElement.querySelector(".line-number")?.textContent
    const value = lineElement.querySelector(".CodeMirror-line")?.textContent

    if (lineNumber && value) {
        return { value: value, lineNumber: Number.parseInt(lineNumber), element: lineElement }
    }
    throw new Error("Could not parse line. Maybe line-number or text content is not readable")
}

export function read(container: Element): Document {
    const path = window.location.href
    return {
        lines: [].slice.call(container.getElementsByClassName("line")).map(toLine),
        path: path,
        fileExt: extname(path),
    }
}
