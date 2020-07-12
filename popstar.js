const random = function() {
    let n = Math.random() * 5 + 1
    n = Math.floor(n)
    return n
}

const randomLine = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = random()
        l.push(num)
    }
    return l
}

const randomSquare = function(n) {
    let l = []
    for (let i = 0; i < n; i++) {
        let num = randomLine(n)
        l.push(num)
    }
    return l
}

const templateNum = function(i, j, n) {
    let t = `
    <div id="id-line-${i}-row-${j}" class="gua-num num${n}" data-line=${i} data-row=${j} data-num=${n}></div>
    `
    return t

}

const templateLine = function(div, i) {
    let t = `
    <div id="id-div-line${i}" class="gua-line" data-line=${i}>
        ${div}
    </div>
    `
    return t
}

const insertHtml = function(line) {
    let div = e('#id-gua-square')
    div.insertAdjacentHTML("beforeend", line)
}

const push0 = (r2, maxX) => {
    let s2 = r2.slice(0)
    for (let i = 0; i < maxX - s2.length + 1; i++) {
        s2.push('0')
    }
    return s2
}

const drawSquare = function(array) {
    let arr = clonedSquare(array)
    for (let i = 0; i < arr.length; i++) {
        let line = arr[i]
        let r = ''
        for (let j = 0; j < line.length; j++) {
            let numHtml = templateNum(i, j, line[j])
            r += numHtml
        }
        let gualine = templateLine(r, i)
        insertHtml(gualine)
    }
}

const aroundAddHide = (x, y, n) => {
    addhide(x - 1, y, n)
    addhide(x + 1, y, n)
    addhide(x, y - 1, n)
    addhide(x, y + 1, n)
}

const addhide = (x, y, n) => {
    let maxX = 10
    let maxY = 10
    if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
        let div = e(`#id-line-${x}-row-${y}`)
        let num = div.dataset.num
        if (!div.classList.contains('hide')) {
            if (num === n) {
                div.classList.add('hide')
                div.dataset.num = 9
                aroundAddHide(x, y, n)
            }
        }
    }
}

const hideRows = () => {
    let maxX = 10
    let divs = es('.gua-num')
    let r = []
    for (let i = 0; i < divs.length; i++) {
        let div = divs[i]
        if (div.classList.contains('hide')) {
            let x = Number(div.dataset.line)
            let y = Number(div.dataset.row)
                // let n = div.dataset.num
                // let classNum = div.classList[1]
                // let nextX = x + 1
            r.push(x)
        }

    }
    let s = new Set(r)
    s = Array.from(s)
    return s

}

const changeClassName = (div) => {
    let id = div.id
    let container = e(`#${id}`)
    let line = div.dataset.line
    let hides = div.querySelectorAll('.hide')
    for (let i = 0; i < hides.length; i++) {
        container.insertAdjacentHTML('afterbegin', hides[i].outerHTML)
        hides[i].remove()
    }
    let rows = container.querySelectorAll('.gua-num')
    for (let j = 0; j < rows.length; j++) {
        let row = rows[j]
        row.id = `id-line-${line}-row-${j}`
        row.dataset.row = j
    }

}

const change = () => {
    let lines = hideRows()
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let div = e(`#id-div-line${line}`)
        changeClassName(div)

    }
}
const lastLineId = () => {
    let lines = es('.gua-line')
    let len = lines.length - 1
    let l = lines[lines.length - 1]
    l.id = `id-div-line${len}`
    l.dataset.line = len
    let nums = l.querySelectorAll('.gua-num')
    for (let i = 0; i < nums.length; i++) {
        let n = nums[i]
        let row = n.dataset.row
        n.id = `id-line-${len}-row-${row}`
        n.dataset.line = len
        n.dataset.row = row
    }
}


const changeId = (n) => {
    let maxX = 10
    let lines = []
    for (let i = n + 1; i < maxX; i++) {
        let lineDiv = e(`#id-div-line${i}`)
        lineDiv.id = `id-div-line${i - 1}`
        lineDiv.dataset.line = i - 1
        lines.push(lineDiv)
    }

    let rows = es('.gua-num')
    for (let j = 0; j < rows.length; j++) {
        let r = rows[j]
        let row = r.dataset.row
        let line = r.closest('.gua-line').dataset.line
        r.id = `id-line-${line}-row-${row}`
        r.dataset.line = line
        r.dataset.row = row
    }
}


const moveDown = () => {
    hideRows()
    change()
}

const moveLeft = () => {
    let len = es('.gua-line').length - 1
    let nums = es('.gua-num')
    for (let i = 0; i < nums.length; i++) {
        let div = nums[i]
        let row = div.dataset.row
        if (div.classList.contains('hide') && row === String(len)) {
            let cid = '#id-div-line' + div.dataset.line
            let line = div.closest(cid)
            let container = line.closest('#id-gua-square')
            container.insertAdjacentHTML("beforeend", line.outerHTML)
            line.remove()
            let n = Number(div.dataset.line)
            changeId(n)
            lastLineId()
        }

    }
}

const move = () => {
    setTimeout(() => {
        moveDown()
        moveLeft()
    }, 300)

}

const bindEventNum = () => {
    bindAll('.gua-num', 'click', (event) => {
        let self = event.target
        let x = Number(self.dataset.line)
        let y = Number(self.dataset.row)
        let n = self.dataset.num

        aroundAddHide(x, y, n)
        move()
    })
}

const bindEvents = () => {
    bindEventNum()
}

const __main = () => {
    let s = randomSquare(10)

    drawSquare(s)
    bindEvents()
}

__main()