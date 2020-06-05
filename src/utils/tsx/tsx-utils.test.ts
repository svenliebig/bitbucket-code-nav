import { transformImportCode } from "./tsx-utils"

describe(`transformImportCode(code: string): TsxImport`, () => {
    fit(`code is 'import Hello from "./World"'`, () => {
        const result = transformImportCode('import Hello from "./World"')
        expect(result).toEqual(
            expect.objectContaining({
                from: "./World",
                type: "default",
            })
        )
    })
})
