<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hi There</title>
    <style>
        body,article {
            background-color: white;
            font-family: 'Noto sans';
            text-align: center;
            
            margin-top: 80px;  
            margin-left: 20px;
            margin-right: 20px;
            margin-bottom: 80px;
        }
        .grid{
            margin: auto;
            margin-top: 25px;
            width: 316px;
            height: 316px;
            display: flex;
            flex-wrap: wrap;
            border: 8px solid rgb(231, 72, 51);
            border-radius: 10px;
            
        }
        .square{
            height: 100px;
            width: 100px;
            border: 1px solid rgb(231, 72, 51);
        }
        .mole{
            background-color: rgb(255, 188, 19);
        }
        .moleclicked{
            background-color: rgb(133, 215, 19);
        }
        .centerhow{
            position: relative;
        }

        #startgame{
            padding: 10px;
            padding-top: 9px;
            padding-bottom: 9px;
            font-family: 'Noto sans';
            font-size: 10pt;
            font-weight: 800;
            border-radius: 5px;
            margin-top: 50px;
            border: black 2px solid;
            color: black;
            /*background-color: rgb(255, 231, 176);*/
            
            /*box-shadow: 0px 5px 7px lightgray ;*/
        }
        #finalScore{
            display: block;
            font-weight: 300;
            font-size: 8pt;
        }
        #restartbtn{
            padding: 10px;
            font-family: 'Noto sans';
            visibility: hidden;
            font-size: 10pt;
            font-weight: 800;
            border-radius: 5px;
            margin-top: 20px;
            border: black 2px solid;
            color: black;
        }
        
        #bestRecordUsernameInput{
            display: none;
        }
        #bestRecord{
            margin-top: 30px;
            text-align: center;
            font-size: 12pt;
            display: none;
        }
        h1{
            display: none;
        }

    </style>
</head>
<body>
    
    <div style="font-family: 'Noto sans'; font-weight: 700;">
        <div>
        <span style="font-size: 10pt; ">Your score </span>
        <span id="score" style="font-size: 20pt; padding-left: 5px;" >0</span>
        </div>
        <div>
        <span style="font-size:  10pt;">Time Left </span>
        <span id="time-left" style="font-size: 20pt; padding-left: 5px;">15</span>
        </div>
    </div>

    <p><input type="button" id="startgame" value="START" onclick="
        moveMole();
        timeGoes();
        this.style.visibility='hidden';
        "></p>
    

    <div class="grid">
        <div class="square" id="1"></div>
        <div class="square" id="2"></div>
        <div class="square" id="3"></div>
        <div class="square" id="4"></div>
        <div class="square" id="5"></div>
        <div class="square" id="6"></div>
        <div class="square" id="7"></div>
        <div class="square" id="8"></div>
        <div class="square" id="9"></div> </div>

        
        <br><div><input type="button" id="restartbtn" value="restart" onclick="
            restart();
            this.style.visibility='hidden';
            
            "></div>
        <div id="bestRecord">
            <h2 style="margin-bottom: 10px; margin-top:90px">BEST RECORD</h2>
            <h2 id="bestRecordScore" style="margin-top: 8px;"></h2> 
            <!--<span id="username"></span>-->
        </div>
        <!--<form id="bestRecordUsernameInput" method="get" action="<?php echo $_SERVER['PHP_SELF'];?>">
        <input type="text" placeholder="name" id="name" required minlength="2" maxlength="10" size="12" onkeyup="printName();">
        <input type="submit" value="made it!" onclick="
        //this.style.display='none';
        ">
        </form>-->
        <br><div id="finalScore" style="margin-bottom: 120px;"></div>

        <script>
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
            
            
        </script>

        

<article>
    <footer>
        <p>© 2022 rryu09</p>
    </footer>
</article>
</body>
</html>
