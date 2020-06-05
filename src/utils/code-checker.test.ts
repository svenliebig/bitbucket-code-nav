import { getImportTargetUrl } from "./code-checker"

describe(`getImportTargetUrl(stmnt: ImportStatement): string | null`, () => {
    describe(`imported file is next to the source file`, () => {
        fit(`should return a url where the filename changed (default import with double quotes)`, () => {
            const importStatement = { code: 'import Something from "./World"', url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })

        it(`should return a url where the filename changed (default import with single quotes)`, () => {
            const importStatement = { code: "import Something from './World'", url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })

        it(`should return a url where the filename changed (single property import with double quotes)`, () => {
            const importStatement = { code: 'import { Something } from "./World"', url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })

        it(`should return a url where the filename changed (single property import with single quotes)`, () => {
            const importStatement = { code: "import { Something } from './World'", url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })

        it(`should return a url where the filename changed (two property import with double quotes)`, () => {
            const importStatement = { code: 'import { Something, Else } from "./World"', url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })

        it(`should return a url where the filename changed (two property import with single quotes)`, () => {
            const importStatement = { code: "import { Something, Else } from './World'", url: "https://m.de/Hello.tsx" }
            const url = getImportTargetUrl(importStatement)
            expect(url).toEqual("https://m.de/World.tsx")
        })
    })
})
