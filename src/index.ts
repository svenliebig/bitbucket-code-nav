import { init } from "./init"
;(function () {
    const timeout = setInterval(() => {
        const codemirror = document.querySelector(".CodeMirror-code")

        if (codemirror) {
            clearTimeout(timeout)
            init(codemirror)
        }
    }, 200)
})()
