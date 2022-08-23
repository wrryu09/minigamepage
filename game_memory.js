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

