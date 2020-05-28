export function init(codemirror: Element): void {
    const lines = Array.prototype.slice.call(codemirror.querySelector(".line"))

    lines.forEach((line) => {
        console.log(line)
    })
}
