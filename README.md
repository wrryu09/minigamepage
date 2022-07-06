<html>
<head>
    <meta charset="UTF-8">
    <title>Memory Game</title>
    <style>
        #grid{
            /*display: inline-block;*/
            display: inline-flex;
            flex-wrap: wrap;
            width: 450px;
            margin: none;
            padding-top: 50px;
            
        }
        body{
            background-color: rgb(193, 226, 255);
            text-align: center;
        }
        h1{
            
            display: none;
            font-family: 'Futura';
            font-size: 50px;
            padding: 50px;
        }
        h1:hover, h1:focus { animation-duration: 3s; animation-name: rainbowLink; animation-iteration-count: infinite; } 
            @keyframes rainbowLink {     
            0% { color: #ff2a2a; }
            15% { color: #ff7a2a; }
            30% { color: #ffc52a; }
            45% { color: #43ff2a; }
            60% { color: #2a89ff; }
            75% { color: #202082; }
            90% { color: #6b2aff; } 
            100% { color: #e82aff; }
            }

        h3{
            font-family: 'Futura';
        }
        #restart{
            display: none;
            padding: 10px;
            margin-top: 30px;
            border: 3px solid red;
            border-radius: 5px;
            font-family: 'Futura';
        }



    </style>
</head>
<body>
    <h3 style="padding-top: 50px">Score: <span id="result"></span></h3>
    <h3>Try: <span id="attempt"></span></h3>
    <h1 id="congrats">Congratulations! <br> You found them all!</h1>

    <div id="grid"></div>
    

    <script>
        const cardArray =[
            {
                name: 'arche',
                img: 'Images/arche.png',

            },
            {
                name: 'arche2',
                img: 'Images/arche2.png',
            },
            {
                name: 'exhausted',
                img: 'Images/exhausted.png',
            },
            {
                name: 'fishy',
                img: 'Images/fishy.png',
            },
            {
                name: 'face',
                img: 'Images/face.png',
            },
            {
                name: 'meader',
                img: 'Images/meader.png',
            },
            {
                name: 'arche',
                img: 'Images/arche.png',

            },
            {
                name: 'arche2',
                img: 'Images/arche2.png',
            },
            {
                name: 'exhausted',
                img: 'Images/exhausted.png',
            },
            {
                name: 'fishy',
                img: 'Images/fishy.png',
            },
            {
                name: 'face',
                img: 'Images/face.png',
            },
            {
                name: 'meader',
                img: 'Images/meader.png',
            }
        ]
            cardArray.sort(() => 0.5- Math.random())

            const gridDisplay = document.querySelector('#grid')
            const resultDisplay = document.querySelector('#result')
            const attemptDisplay = document.querySelector('#attempt')
            let attempt=0;
            let cardsChosen = [];
            let cardsChosenIds =[];
            let cardsWon =[];
            attemptDisplay.textContent = attempt;
            function createBoard(){
                for(let i=0; i<cardArray.length; i++){
                    let card = document.createElement('img')
                    card.setAttribute('src', 'Images/blank.png')
                    card.setAttribute('data-id', i)
                    card.addEventListener('click', flipCard)
                    gridDisplay.appendChild(card)
                }
                
            }

            /*function BoardChange(){
                for(let i=0; i<cardArray.length; i++){
                    card = document.createElement('img')
                    card.setAttribute('src', 'Images/blank.png')
                    card.setAttribute('data-id', i)
                    card.addEventListener('click', flipCard)
                    gridDisplay.replaceChild(card, card1)
                }
            } */
            createBoard();

            function checkMatch(){
                const cards = document.querySelectorAll('#grid img');
                const optionOneId = cardsChosenIds[0];
                const optionTwoId = cardsChosenIds[1];
                console.log('check match!');
                if (optionOneId===optionTwoId){
                    alert('you have clicked the same image!');
                    cards[optionOneId].setAttribute('src', 'Images/blank.png');
                    //cards[optionTwoId].setAttribute('src', 'Images/blank.png');
                }
                if (cardsChosen[0]==cardsChosen[1]&&!(optionOneId==optionTwoId)){
                    alert('you found a match!');
                    //cards[optionOneId].setAttribute('src', 'Images/white.png');
                    //cards[optionTwoId].setAttribute('src', 'Images/white.png');
                    cards[optionOneId].removeEventListener('click',flipCard);
                    cards[optionTwoId].removeEventListener('click',flipCard);
                    cardsWon.push(cardsChosen);
                } else{
                    cards[optionOneId].setAttribute('src', 'Images/blank.png');
                    cards[optionTwoId].setAttribute('src', 'Images/blank.png');
                }
                resultDisplay.textContent = cardsWon.length;
                
                cardsChosen=[];
                cardsChosenIds=[];

                if(cardsWon.length===cardArray.length/2){
                    //resultDisplay.textContent = 'Congratulations! You found them all!'
                    document.querySelector('h1').style.display='block';
                    //document.querySelector('#grid').style.display='none';
                    document.querySelector('#restart').style.display='block';
                }
            }
            
            
            function flipCard(){

                const cardId =this.getAttribute('data-id');
                
                cardsChosen.push(cardArray[cardId].name);
                cardsChosenIds.push(cardId);
            
                this.setAttribute('src', cardArray[cardId].img);
                if(cardsChosen.length===2){
                    attempt = attempt+1;
                    attemptDisplay.textContent = attempt;
                    setTimeout(checkMatch, 500)
                }
            }

            /*function restart(){
                cardArray.sort(() => 0.5- Math.random())
                BoardChange();
                cardsChosen=[];
                cardsChosenIds=[];
                attempt=0;
                attemptDisplay.textContent = attempt;
                cardsWon =[];
                resultDisplay.textContent = cardsWon.length;
                document.querySelector('h1').style.display='none';
                //document.querySelector('#grid').style.display='inline-flex;'
                //document.querySelector('#grid').style.display='inline-flex';
            }*/



    </script>

    <div><input type="button" id="restart" value="restart" onclick="
        //restart();
        this.style.display='none';       
        window.location.reload();
        "></div>
</body>
</html>
