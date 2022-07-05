<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
   
    <title>Till You Win</title>
    <style>
        body{
            background-color: rgb(106, 185, 255);
            text-align: center;
        }
        #emoji{
            font-size: 150pt;
        }
        #emorock{
            display: block;
        }
        #emosci{
            display: none;
        }
        #emopaper{
            display: none;
        }
        #result{
            font-size: 50pt;
            font-family: 'Futura';
            color: rgb(255, 201, 84);
            padding: none;
        }
        #result_victory{
            display: none;
        }
        #result_lose{
            display: none;
        }
        #result_draw{
            display: none;
        }

        #rockbtn{
            border-radius: 5px;
            border: none;
            padding: 10px;
            padding-top: 7px;
            padding-bottom: 7px;
        }
        #scissorsbtn{
            border-radius: 5px;
            border: none;
            padding: 10px;
            padding-top: 7px;
            padding-bottom: 7px;
        }
        #paperbtn{
            border-radius: 5px;
            border: none;
            padding: 10px;
            padding-top: 7px;
            padding-bottom: 7px;
        }
        #RPSbtn{
            display: block;
        }
        #restartbtn{
            display: none;
            margin: none;
            color: red;
            background-color: rgb(255, 201, 84);
            border-radius: 5px;
            border: none;
            font-family: 'Futura';
            padding:9px;
            padding-top:5px;
            padding-bottom:5px;
            margin-top: 40px;
            margin-left: 60px;
            
        }
        #emoji{
            padding: 20px;
            padding-bottom: 40px;
        }
    </style>
</head>


<body>
    <div id="emoji">
    <div id="emorock">✊</div>
    <div id="emosci">✌</div>
    <div id="emopaper">🤚</div>
    </div>

    

    

    <script>
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
    </script>

    <div id="RPSbtn">
    <input type="button" id="rockbtn" value="✊" onclick="
    stopTimer();
    youchoserock();
    computervaluedecide();
    whowon();
    document.querySelector('#restartbtn').style.display='block';
    this.style.border='3px solid red';
    document.querySelector('#scissorsbtn').style.visibility='hidden';
    document.querySelector('#paperbtn').style.visibility='hidden';
    
    ">
    <input type="button" id="scissorsbtn" value="✌" onclick="
    stopTimer();
    youchosesci();
    computervaluedecide();
    whowon();
    document.querySelector('#restartbtn').style.display='block';
    this.style.border='3px solid red';
    document.querySelector('#rockbtn').style.visibility='hidden';
    document.querySelector('#paperbtn').style.visibility='hidden';
    
    
    ">
    <input type="button" id="paperbtn" value="🤚" onclick="
    stopTimer();
    youchosepaper();
    computervaluedecide();
    whowon();
    document.querySelector('#restartbtn').style.display='block';
    this.style.border='3px solid red';
    document.querySelector('#rockbtn').style.visibility='hidden';
    document.querySelector('#scissorsbtn').style.visibility='hidden';
    
    ">
    <div id="result">
        <p id="result_victory">Victory!</p>
        <p id="result_lose">You Lose...</p>
        <p id="result_draw">Draw!</p>
    </div>
    
    <div><input type="button" id="restartbtn" value="restart" onclick="
        startTimer();
        document.querySelector('#rockbtn').style.border='none';
        document.querySelector('#scissorsbtn').style.border='none';
        document.querySelector('#paperbtn').style.border='none';
        document.querySelector('#result_victory').style.display='none';
        document.querySelector('#result_lose').style.display='none';
        document.querySelector('#result_draw').style.display='none';
        document.querySelector('#rockbtn').style.visibility='visible';
        document.querySelector('#scissorsbtn').style.visibility='visible';
        document.querySelector('#paperbtn').style.visibility='visible';
        this.style.display='none';

        
        "></div>
    </div>

    
</body>

</html>
