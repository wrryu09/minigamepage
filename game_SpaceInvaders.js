const grid = document.querySelector('.grid')
let currentShooterIndex = 202
const width = 15
let direction = 1
let invadersId
let goingRight = true
const resultsDisplay = document.querySelector('.results')
let  aliensRemoved =[]
let results = 0
const restartbtn = document.querySelector('#restartbtn')
const btnleft = document.querySelector('.btnleft')
const btnright = document.querySelector('.btnright')
const btnshoot= document.querySelector('.btnshoot')

for (let i = 0 ; i < 225; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

restartbtn.addEventListener('click', restart)
const squares = document.querySelectorAll('.grid div')

const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i = 0 ; i< alienInvaders.length; i++){
        if(!aliensRemoved.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')
        }
        //if alien is alive, draw alien
    }
}

draw()

function remove(){
    for(let i = 0 ; i< alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}


btnleft.addEventListener('click',moveShooterbybtnLeft)
btnright.addEventListener('click',moveShooterbybtnRight)
btnshoot.addEventListener('click',shootbybtn)
squares[currentShooterIndex].classList.add('shooter')
        

function moveShooterbybtnLeft(){
    squares[currentShooterIndex].classList.remove('shooter')
    if(currentShooterIndex % width != 0){
        currentShooterIndex-=1}
        squares[currentShooterIndex].classList.add('shooter')

        btnleft.classList.add('btnclicked')
        //setTimeout(() => {
        //    btnleft.classList.remove('btnclicked')
        //}, 100);
        setTimeout("btnleft.classList.remove('btnclicked')",100)
       
}
function moveShooterbybtnRight(){
    squares[currentShooterIndex].classList.remove('shooter')
    if(currentShooterIndex % width < width-1){
        currentShooterIndex+=1}
        squares[currentShooterIndex].classList.add('shooter')

        btnright.classList.add('btnclicked')
        setTimeout("btnright.classList.remove('btnclicked')",100)
}
function moveShooter(e){
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooterIndex % width != 0){
                currentShooterIndex-=1}
                break
            
            case 'ArrowRight':
            if(currentShooterIndex % width < width-1){
                currentShooterIndex+=1}
                break   
    }
    squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown',moveShooter)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width ===0
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width-1
    remove()

    if(rightEdge && goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i]+= width+1
            direction = -1
            goingRight = false
        }
    }
    if(leftEdge && !goingRight){
        for(let i = 0; i < alienInvaders.length; i++){
            alienInvaders[i]+= width -1
            direction = +1
            goingRight = true
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }
    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
        removeEventListeners()
        restartbtn.style.visibility = 'visible'
    }

    for( let i = 0; i < alienInvaders.length; i++){
        if(alienInvaders[i]>(squares.length-width)){
            
            resultsDisplay.innerHTML = 'GAME OVER'
            clearInterval(invadersId)
            removeEventListeners()  
            restartbtn.style.visibility = 'visible'         
        }
    }

    if(aliensRemoved.length === alienInvaders.length){
        resultsDisplay.innerHTML = 'YOU WIN'
        clearInterval(invadersId)
        restartbtn.style.visibility = 'visible'
    }
}

function removeEventListeners(){
            document.removeEventListener('keydown', shoot)
            document.removeEventListener('keydown',moveShooter)
            btnleft.removeEventListener('click',moveShooterbybtnLeft)
            btnright.removeEventListener('click',moveShooterbybtnRight)
            btnshoot.removeEventListener('click',shootbybtn)
}

invadersId = setInterval(moveInvaders, 100)

function shoot(e){
    let laserId
    let currentLaserIndex = currentShooterIndex
    
    function moveLaser(){
        if(currentLaserIndex>=0 && currentLaserIndex < 225){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width

            if(currentLaserIndex>=0 && currentLaserIndex < 225){
               squares[currentLaserIndex].classList.add('laser') 

               if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('BOOM')
    
                setTimeout(()=> squares[currentLaserIndex].classList.remove('BOOM'), 100)
                clearInterval(laserId)
    
                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultsDisplay.innerHTML = results
                    }
                }
            }
    
        }
    switch(e.key){
        case 'ArrowUp':
            console.log('shoot!!!')
            laserId = setInterval(moveLaser, 100)
            break
    }
}
function shootbybtn(){
    let laserId
    let currentLaserIndex = currentShooterIndex

    function moveLaser(){
        if(currentLaserIndex>=0 && currentLaserIndex < 225){
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width

            if(currentLaserIndex>=0 && currentLaserIndex < 225){
               squares[currentLaserIndex].classList.add('laser') 

               if(squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('BOOM')
    
                setTimeout(()=> squares[currentLaserIndex].classList.remove('BOOM'), 100)
                clearInterval(laserId)
    
                const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                aliensRemoved.push(alienRemoved)
                results++
                resultsDisplay.innerHTML = results
                    }
                }
            }
    
        }
        
    laserId = setInterval(moveLaser, 100)
}
function restart(){
    window.location.reload();
}

document.addEventListener('keydown', shoot)


