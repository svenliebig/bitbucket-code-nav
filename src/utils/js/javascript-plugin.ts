import { Plugin } from "../../init"

export const importRegex = /import\s[\r\n\s\w{},*\$]*\sfrom\s['"](.+)['"]/

const JavascriptPlugin = class implements Plugin {
    accept(fileExt: string): boolean {
        return fileExt === ".js"
    }

    importFilter(content: string): boolean {
        if (importRegex.test(content)) {
            return true
        }
        return false
    }

    importPath(importLine: string): string {
        const match = importLine.match(importRegex)
        if (match && match.length === 2) {
            return match[1]
        }
        return ""
    }
}

export default JavascriptPlugin
