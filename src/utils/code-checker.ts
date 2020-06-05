interface File {
    url: string
    lines: Array<string>
}

interface ImportStatement {
    url: string
    code: string
}

export function getImportTargetUrl({ code }: ImportStatement): string | null {
    const match = code.match(/import\s([A-z]*)\sfrom\s/)
    console.log(match)
    return "https://m.de/World.tsx"
}
