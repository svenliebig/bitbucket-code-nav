type TsxDefaultImport = {
    type: "default"
    from: string
}

type TsxObjectImport = {
    type: "object"
    from: string
    properties: Array<string>
}

export type TsxImport = TsxObjectImport | TsxDefaultImport

const importRegex = /import\s([A-z]*)\sfrom\s\"([A-z\.\/]*)\"/

export function transformImportCode(code: string): TsxImport {
    const result = code.match(importRegex)

    if (result) {
        const from = result[2]

        return {
            from,
            type: "default",
        }
    }

    console.log(result)

    return {
        from: "",
        type: "default",
    }
}
