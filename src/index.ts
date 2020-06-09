import { init } from "./init"
;(function () {
    const timeout = setInterval(() => {
        const codemirror = document.querySelector(".content-view.fully-loaded")

        if (codemirror) {
            clearTimeout(timeout)

            init(codemirror)
        }
    }, 200)
})()
