const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
let score = document.querySelector('#score')
let timeLeft = document.querySelector('#time-left')
const bestRecordShow = document.getElementById('bestRecordScore')

let result = 0;
let hitPosition;
let currentTime = 15;
let timerId = null;
let timesPlayed =1;
let bestRecord =0;

function randomSquare(){
    squares.forEach(square =>{
        
        square.classList.remove('mole');
        square.classList.remove('moleclicked');
    } )//getting each square, removing involved class

    let randomPosition = squares[Math.floor(Math.random()*9)]
    
    randomPosition.classList.add('mole')
    

    hitPosition = randomPosition.id;
} 

squares.forEach(square => {
    square.addEventListener("mousedown",()=>{
        if(square.id == hitPosition){
            square.classList.add('moleclicked');
            result++;
            score.textContent = result;
            hitPosition = null; //clearout
        }
    })
})

function moveMole(){
    
    timerId = setInterval(randomSquare, 450) 
    
}


function timeGoes(){
    let countDownTimerId = setInterval(countDown, 1000);

    function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime==0){
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('TIME OVER! \n Your final score is ' +result);
        addScoreTXT();
        document.getElementById('restartbtn').style.visibility='visible';
        bestRecordDefine();
        document.querySelector('#bestRecord').style.display='block';
        
    }
}

function addScoreTXT(){
            target = document.getElementById('finalScore');
            let createh3 = document.createElement("h3");
            let createscore = document.createTextNode("TRY "+timesPlayed+ "  - Score : "+ result);
            createh3.appendChild(createscore);
            target.appendChild(createh3);
        }

countDown();
}

function restart(){
    timesPlayed++;
    currentTime =15;
    timeLeft.textContent = currentTime;
    result =0;
    score.textContent = result;
    moveMole();
    timeGoes();

}
function bestRecordDefine(){
    if(bestRecord<=result){
        //new Record!!!
        bestRecord=result;
        //document.getElementById('bestRecordUsernameInput').style.display='block';
        //printName();
        //let createbestscoretxt = document.createTextNode(":: "+bestRecord+" ::");
        bestRecordShow.innerHTML=":: "+bestRecord+" ::";
    }
    else{
        console.log('Try harder!');
    }
}

function printName(){
    let name= document.getElementById('name').value;
    document.getElementById('username').innerText = "  - "+name;
}

/*function molecolor(){
    let randomcolor = Math.floor(Math.random()*255);
    document.getElementsByClassName('mole').setAttribute('style', 'background-color:'+randomcolor+','+randomcolor+','+randomcolor);
    
    console.log(document.getElementsByClassName('mole'));
}*/

