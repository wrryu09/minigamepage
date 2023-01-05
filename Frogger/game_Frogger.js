const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

console.log(squares)

let currentIndex = 76
const width = 9
let timerId
let timerforFrog
let currentTime = 10

function moveFrog(e){

    //remove classname frog from every div
    squares[currentIndex].classList.remove('frog')

    //make frog move
    switch(e.key){
        case 'ArrowLeft' : 
        if(currentIndex % width !== 0 ){
            console.log('move left')
            currentIndex -= 1
        }
        
        break

        case 'ArrowRight' : 
        if(currentIndex % width < width-1 ){
            console.log('move right')
            currentIndex += 1
        }
        break

        case 'ArrowUp' : 
        if(currentIndex - width >=0 ){
            console.log('move up')
            currentIndex -= width
        }
        break

        case 'ArrowDown' : 
        if(currentIndex + width < width*width ){
            console.log('move down')
            currentIndex += width
        }
        break
    }

    squares[currentIndex].classList.add('frog')
}
//document.addEventListener('keyup', moveFrog)


function autoMoveElements(){
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}
function checkforFrog(){
    CheckforLose()
    CheckforWin()
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
            
        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break

         case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break

        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break

        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break

    }
}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1') :
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
            
        case logRight.classList.contains('l2') :
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break

         case logRight.classList.contains('l3') :
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break

        case logRight.classList.contains('l4') :
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break

        case logRight.classList.contains('l5') :
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break

    }
}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1') :
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
            
        case carLeft.classList.contains('c2') :
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break

         case carLeft.classList.contains('c3') :
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break

    }
}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1') :
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
            
        case carRight.classList.contains('c2') :
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break

         case carRight.classList.contains('c3') :
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break

    }
}

function CheckforLose(){
    if(currentTime <=0||
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4')||
        squares[currentIndex].classList.contains('l5')){
        resultDisplay.textContent = '😖 You Lose 😵'
        resultDisplay.style.visibility='visible'
        clearInterval(timerId)
        clearInterval(timerforFrog)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
        startPauseButton.textContent = 'restart'
    }
}

function restart(){
    squares[currentIndex].classList.remove('frog')
    currentIndex = 76
    currentTime = 10
    squares[currentIndex].classList.add('frog')
    resultDisplay.style.visibility = 'hidden'
    timerId = setInterval(autoMoveElements, 1000)
    timerforFrog = setInterval(checkforFrog, 50)
    document.addEventListener('keyup', moveFrog)
    startPauseButton.innerHTML ="Pause"
}

function CheckforWin(){
    if(squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'You Win 😊'
        resultDisplay.style.visibility='visible'
        clearInterval(timerId)
        clearInterval(timerforFrog)
        document.removeEventListener('keyup', moveFrog)
        startPauseButton.textContent = 'restart'
    }
}

startPauseButton.addEventListener('click', () => {
    if(startPauseButton.innerHTML.includes("Pause") && timerId){
        clearInterval(timerId)
        clearInterval(timerforFrog)
        timerId = null
        timerforFrog = null
        document.removeEventListener('keyup', moveFrog)
        startPauseButton.style.backgroundColor = 'rgb(210, 192, 193)'
        startPauseButton.innerHTML ="Start"
    }
    else if(startPauseButton.innerHTML.includes("restart")){
        restart()
    }
    else if(startPauseButton.innerHTML.includes("Start")){
        timerId = setInterval(autoMoveElements, 1000)
        timerforFrog = setInterval(checkforFrog, 50)
        document.addEventListener('keyup', moveFrog)
        startPauseButton.style.backgroundColor = 'rgb(244, 232, 223)'
        startPauseButton.innerHTML ="Pause"
    }
})



