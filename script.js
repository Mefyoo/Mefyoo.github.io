let startButton = document.getElementById('startButton');
let frame = document.getElementById('frame');
startButton.addEventListener('click',start)
let x
let y = []
let levelNumber = 0
function start() {
    this.style.display = 'none'
    level()
}
function again(i,a) {
    for (z of y) {
        console.log(z)
        if (z[0]===a && z[1]===i) {
            console.error('powtórka')
            return false
        }
    }
    return true
}
function end() {
    frame.innerHTML = `<button id="startButton">Jeszcze raz</button>`
    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click',start)
}
function level() {
    if (levelNumber===52) {
        end()
        return
    }
    let a = Math.random()
    for (let i = 1; i<=27; i++) {
        if (a<i/27) {
            a = i+3
            break
        }
    }
    let b = []
    for (let i = 2; i<=a/2; i++) {
        if (a%i===0) {
            if (again(i,a)) {
                b.push(i)
            }
        }
    }
    console.log(b)
    if (b.length===0) {
        level()
        return
    }
    let r = Math.random()
    for (let i = 1; i<=b.length; i++) {
        if (r<i/b.length) {
            b = b[i-1]
            break
        }
    }


    console.log(y)
    y.push([a,b])
    levelNumber++
    frame.innerHTML = `<span id="level">${levelNumber}/52</span><div><span>${a} : ${b} = </span>
    <input placeholder="?" inputmode="numeric" maxlength="2" autofocus></input></div>
    <button id="next">></button>
    `
    
    x = a/b
    document.getElementById('next').addEventListener('click',next)
}

function next() {
    console.log(x)
    if (x==document.querySelector('input').value) {
        level()
    }
    else {
        document.querySelector('input').style.border = '2px solid red'
        document.querySelector('input').style.color = 'red'
    }
}