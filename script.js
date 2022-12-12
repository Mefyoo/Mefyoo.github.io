let frame = document.getElementById('frame');
menu()
function settingsBoth() {
    frame.innerHTML = `
    <div id='settings'>
        <label id='levels'>Ilość działań: 200</label>
        <input class="range" type='range' min='1' max='200' value='200'></input>
    </div>
    <button class='start'>Start</button>
    `
    document.querySelector('.range').addEventListener('mousedown',()=>{
        let levels = document.getElementById('levels');
        let levelsRange=setInterval(()=>levels.innerHTML=`Ilość działań: ${document.querySelector('.range').value}`,1)
        document.querySelector('.range').addEventListener('mouseup',()=>{
            clearInterval(levelsRange)
        })
    })
    document.querySelector('.start').addEventListener('click',startBoth)
}
function startBoth() {
    let numbers = [];
    for (let i=1;i<=10;i++) {
        for (let j=1;j<=10;j++) {
            numbers.push([i,'x',j,i*j]);
        }
    }
    for (let i=1;i<=10;i++) {
        for (let j=1;j<=10;j++) {
            numbers.push([i*j,':',i,j]);
        }
    }
    levelBoth(numbers,[],0,parseInt(document.querySelector('.range').value))
}
function levelBoth(numbers,errors,level,maxLevel) {
    if (level===maxLevel) {
        end(errors,maxLevel)
        return
    }
    let r = Math.random()
    for (let i = 1; i<=numbers.length; i++) {
        if (r<i/numbers.length) {
            r=numbers.slice(i-1,i)[0]
            numbers.splice(i-1,1)
            console.warn(numbers)
            console.warn(r)
            break
        }
    }
    level++
    frame.innerHTML = `
    <div id='ex'>
        <span id="numbers">${r[0]} ${r[1]} ${r[2]} = </span>
        <input id="input" placeholder="?" inputmode="numeric" maxlength="3" autofocus></input>
    </div>
    <span id="level">
        <span>${level}/${maxLevel}</span>
        <button id="next">></button>
        <span style='color:red'>${errors.length}x</span>
    </span>
    `
    document.getElementById('input').focus()
    document.getElementById('next').addEventListener('click',nextBoth)
    function nextBoth() {
        if (r[3]==document.querySelector('input').value) {
            levelBoth(numbers,errors,level,maxLevel)
        }
        else {
            errors.push(r)
            document.querySelector('body').style.backgroundColor = 'red'
            setTimeout(()=>{document.querySelector('body').style.backgroundColor = 'rgb(0, 119, 255)'},700)
            document.getElementById('next').removeEventListener('click',nextBoth)
            levelBoth(numbers,errors,level,maxLevel)
        }
    }
}






function settingsMultiply() {
    frame.innerHTML = `
    <div id='settings'>
        <label id='levels'>Ilość działań: 100</label>
        <input class="range" type='range' min='1' max='100' value='100'></input>
    </div>
    <button class='start'>Start</button>
    `
    document.querySelector('.range').addEventListener('mousedown',()=>{
        let levels = document.getElementById('levels');
        let levelsRange=setInterval(()=>levels.innerHTML=`Ilość działań: ${document.querySelector('.range').value}`,1)
        document.querySelector('.range').addEventListener('mouseup',()=>{
            clearInterval(levelsRange)
        })
    })
    document.querySelector('.start').addEventListener('click',startMultiply)
}
function startMultiply() {
    let numbers = [];
    for (let i=1;i<=10;i++) {
        for (let j=1;j<=10;j++) {
            numbers.push([i,'x',j,i*j]);
        }
    }
    levelMultiply(numbers,[],0,parseInt(document.querySelector('.range').value))
}
function levelMultiply(numbers,errors,level,maxLevel) {console.log(errors)
    if (level===maxLevel) {
        end(errors,maxLevel)
        return
    }
    let r = Math.random()
    for (let i = 1; i<=numbers.length; i++) {
        if (r<i/numbers.length) {
            r=numbers.slice(i-1,i)[0]
            numbers.splice(i-1,1)
            console.warn(numbers)
            console.warn(r)
            break
        }
    }
    level++
    frame.innerHTML = `
    <div id='ex'>
        <span id="numbers">${r[0]} ${r[1]} ${r[2]} = </span>
        <input id="input" placeholder="?" inputmode="numeric" maxlength="3" autofocus></input>
    </div>
    <span id="level">
        <span>${level}/${maxLevel}</span>
        <button id="next">></button>
        <span style='color:red'>${errors.length}x</span>
    </span>
    `
    document.getElementById('input').focus()
    document.getElementById('next').addEventListener('click',nextMultiply)
    function nextMultiply() {
        if (r[3]==document.querySelector('input').value) {
            levelMultiply(numbers,errors,level,maxLevel)
        }
        else {
            errors.push(r)
            document.querySelector('body').style.backgroundColor = 'red'
            setTimeout(()=>{document.querySelector('body').style.backgroundColor = 'rgb(0, 119, 255)'},700)
            document.getElementById('next').removeEventListener('click',nextMultiply)
            levelMultiply(numbers,errors,level,maxLevel)
        }
    }
}
function settingsDivide() {
    frame.innerHTML = `
    <div id='settings'>
        <label id='levels'>Ilość działań: 100</label>
        <input class="range" type='range' min='1' max='100' value='100'></input>
    </div>
    <button class='start'>Start</button>
    `
    document.querySelector('.range').addEventListener('mousedown',()=>{
        let levels = document.getElementById('levels');
        let levelsRange=setInterval(()=>levels.innerHTML=`Ilość działań: ${document.querySelector('.range').value}`,1)
        document.querySelector('.range').addEventListener('mouseup',()=>{
            clearInterval(levelsRange)
        })
    })
    document.querySelector('.start').addEventListener('click',startDivide)
}
function startDivide() {
    let numbers = [];
    for (let i=1;i<=10;i++) {
        for (let j=1;j<=10;j++) {
            numbers.push([i*j,':',i,j]);
        }
    }
    levelDivide(numbers,[],0,parseInt(document.querySelector('.range').value))
}
function levelDivide(numbers,errors,level,maxLevel) {

    if (level===maxLevel) {
        end(errors,maxLevel)
        return
    }
    let r = Math.random()
    for (let i = 1; i<=numbers.length; i++) {
        if (r<i/numbers.length) {
            r=numbers.slice(i-1,i)[0]
            numbers.splice(i-1,1)
            console.warn(numbers)
            console.warn(r)
            break
        }
    }
    level++
    frame.innerHTML = `
    <div id='ex'>
        <span id="numbers">${r[0]} ${r[1]} ${r[2]} = </span>
        <input id="input" placeholder="?" inputmode="numeric" maxlength="2" autofocus></input>
    </div>
    <span id="level">
        <span>${level}/${maxLevel}</span>
        <button id="next">></button>
        <span style='color:red'>${errors.length}x</span>
    </span>
    `
    document.getElementById('input').focus()
    document.getElementById('next').addEventListener('click',nextDivide)
    function nextDivide() {
        if (r[3]==document.querySelector('input').value) {
            levelDivide(numbers,errors,level,maxLevel)
        }
        else {
            errors.push(r)
            document.querySelector('body').style.backgroundColor = 'red'
            setTimeout(()=>{document.querySelector('body').style.backgroundColor = 'rgb(0, 119, 255)'},700)
            document.getElementById('next').removeEventListener('click',nextDivide)
            levelDivide(numbers,errors,level,maxLevel)
        }
    }
}

function end(errors,maxLevel) {
    frame.innerHTML = `
    <h1>${Math.round((maxLevel-errors.length)/maxLevel*100)}%</h1>
    <span>
        <span id='errors'><span id='errorsNumber'>+</span>  Błędy: ${errors.length}</span>
    </span>
    <div id='errorsList'></div>
    <button id="startButton">Jeszcze raz</button>`
    let errorsNumber = document.getElementById('errorsNumber')
    errorsNumber.addEventListener('click',showErrors)
    function showErrors() {
        for (let i in errors) {
            console.log(errors[i])
            document.getElementById('errorsList').innerHTML+=`
            <div>${errors[i][0]} ${errors[i][1]} ${errors[i][2]} = ${errors[i][3]}</div>`
        }
        errorsNumber.innerHTML = '-'
        errorsNumber.removeEventListener('click',showErrors)
        errorsNumber.addEventListener('click',hideErrors)
    }
    function hideErrors() {
            document.getElementById('errorsList').innerHTML=''
            errorsNumber.innerHTML = '+'
            errorsNumber.removeEventListener('click',hideErrors)
            errorsNumber.addEventListener('click',showErrors)
    }
    let startButton = document.getElementById('startButton');
    startButton.addEventListener('click',menu)
}
function menu() {
    frame.innerHTML=`
    <button id="divideButton">Dzielenie</button>
    <button id="multiplyButton">Mnożenie</button>
    <button id="bothButton">Mnożenie i dzielenie</button>`
    let divideButton = document.getElementById('divideButton');
    let multiplyButton = document.getElementById('multiplyButton');
    let bothButton = document.getElementById('bothButton');
    divideButton.addEventListener('click',settingsDivide)
    multiplyButton.addEventListener('click',settingsMultiply)
    bothButton.addEventListener('click',settingsBoth)
}
