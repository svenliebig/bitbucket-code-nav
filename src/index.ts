import { init } from "./init"

const registerOberserver = (container: Element | null) => {
    if (container === null) {
        return
    }
    const reInit = () => {
        const codemirror = document.querySelector(".content-view.fully-loaded")
        if (codemirror) {
            init(codemirror)
        }
    }

    const mutationObserver = new MutationObserver(reInit)

    mutationObserver.observe(container, {
        attributes: true,
    })
}

;(function () {
    const timeout = setInterval(() => {
        const codemirror = document.querySelector(".content-view.fully-loaded")

        if (codemirror) {
            registerOberserver(codemirror.querySelector(".CodeMirror-sizer>div"))

            clearTimeout(timeout)

            init(codemirror)
        }
    }, 200)
})()
