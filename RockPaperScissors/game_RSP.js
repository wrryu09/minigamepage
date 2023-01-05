var rock =document.querySelector('#emorock');
var sci =document.querySelector('#emosci');
var paper =document.querySelector('#emopaper');

    function showrock(){
        rock.style.display='block';
        sci.style.display='none';
        paper.style.display='none';
    }
    function showsci(){
        rock.style.display='none';
        sci.style.display='block';
        paper.style.display='none';
    }
    function showpaper(){
        sci.style.display='none';
        rock.style.display='none';
        paper.style.display='block';
    }

const GV ={
    isPause: false,
    timer:null
}
const startTimer = function(){
    GV.isPause = false;
    GV.timer1 = setInterval(
    function(){showrock();},100
    )
    GV.timer2 = setInterval(
        function(){showsci();},200
    )
    GV.timer3 = setInterval(
    function(){showpaper();},300
    )
}
const stopTimer = function(){
    clearInterval(GV.timer1);
    clearInterval(GV.timer2);
    clearInterval(GV.timer3);
    GV.isPause = true;
}
startTimer();

var computer;
var yourval;
var rockval=2;
var scival=1;
var paperval=3;

function computervaluedecide(){

if(rock.style.display==='block'){
computer = rockval;
}
else if(sci.style.display==='block'){
computer = scival;
}
else if(paper.style.display==='block'){
computer = paperval;
} 
else{
console.log('smt went wrong with computers value');
}//COMPUTER'S VALUE
}

function youchoserock(){
yourval=rockval;
}
function youchosesci(){
yourval=scival;
}
function youchosepaper(){
yourval=paperval;
}


function whowon(){
if(yourval===3&&computer===1
|| yourval===2&& computer===3
|| yourval===1&& computer===2){
//computer won
document.querySelector('#result_lose').style.display='block';
}
else if(yourval===3&&computer===2
|| yourval===2&& computer===1
|| yourval===1&& computer===3){
//you won
document.querySelector('#result_victory').style.display='block';
}
else if(computer===yourval){
//draw
document.querySelector('#result_draw').style.display='block';
}
else{
console.log('something went wrong with resultvalue');
}

}