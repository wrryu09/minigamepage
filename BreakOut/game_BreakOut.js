 
        const grid = document.querySelector('.grid');
        const blockWidth = 100
        const blockHeight = 20
        const boardWidth = 560
        const boardHeight = 300
        const scoreDisplay = document.getElementById('score')

        const ballStart = [270,40]
        let ballCurrentPosition = ballStart
        const ballDiameter = 20
        let xDirection  = -2
        let yDirection = 2

        let timerId
        let score =0 ;

        const userStart = [230, 10]
        let currentPosition = userStart;

        //create Block
        class Block {
            constructor(xAxis, yAxis){
            this.bottomLeft = [xAxis, yAxis]
            this.bottomRight = [xAxis + blockWidth, yAxis]
            this.topLeft = [xAxis, yAxis+ blockHeight]
            this.topRight = [xAxis + blockWidth, yAxis]
            }
        }
        

        //all my blocks
        let blocks =[
            new Block(10, 270),
            new Block(120, 270),
            new Block(230, 270),
            new Block(340, 270),
            new Block(450, 270),

            new Block(10, 240),
            new Block(120, 240),
            new Block(230, 240),
            new Block(340, 240),
            new Block(450, 240),

            new Block(10, 210),
            new Block(120, 210),
            new Block(230, 210),
            new Block(340, 210),
            new Block(450, 210),
            

        ]


        //draw all my blocks
        function addBlocks(){
        
        for(let i =0; i<15; i++){
            const block = document.createElement('div');
            block.classList.add('block');
            block.style.left = blocks[i].bottomLeft[0] + 'px'
            block.style.bottom = blocks[i].bottomLeft[1] + 'px'
            grid.appendChild(block);
        }
        }

        addBlocks();

        //add user
        const user = document.createElement('div');
        user.classList.add('user');
        drawUser();
        grid.appendChild(user);


        //draw the user
        function drawUser(){
            user.style.left = currentPosition[0] + 'px'
            user.style.bottom = currentPosition[1]+ 'px'
        }

        //draw the ball
        function drawBall(){
            ball.style.left = ballCurrentPosition[0] + 'px'
            ball.style.bottom = ballCurrentPosition[1] + 'px'
        }

        //move user
        function moveUser(e){
            switch(e.key){
                case 'ArrowLeft':

                    if(currentPosition[0]>0){
                        currentPosition[0] -= 10
                        drawUser()
                    }
                    
                    break;

                case 'ArrowRight':

                    if(currentPosition[0]<boardWidth-blockWidth){
                    currentPosition[0] += 10
                    drawUser()
                    }
                
                break;
            }
            
        }

        document.addEventListener('keydown', moveUser)

        //add ball
        const ball = document.createElement('div');
        ball.classList.add('ball');
        drawBall();
        grid.appendChild(ball);

        //move ball
        function moveBall(){
            ballCurrentPosition[0] += xDirection;
            ballCurrentPosition[1] += yDirection;
            drawBall();
            checkForCollisions();

        }
        function startBallMove(){
            timerId = setInterval(moveBall, 13);
        }


        // function killandMakeNewBlocks(){
        //     console.log(addBlocks.block);
        //     for(let i =0; i<blocks.length; i++){
        //     block.classList.remove('block');
        //     block.style.left = blocks[i].bottomLeft[0] + 'px'
        //     block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        //     grid.appendChild(block);
        // }
        //     blocks=[];
       
        //     blocks =[
        //     new Block(10, 270),
        //     new Block(120, 270),
        //     new Block(230, 270),
        //     new Block(340, 270),
        //     new Block(450, 270),

        //     new Block(10, 240),
        //     new Block(120, 240),
        //     new Block(230, 240),
        //     new Block(340, 240),
        //     new Block(450, 240),

        //     new Block(10, 210),
        //     new Block(120, 210),
        //     new Block(230, 210),
        //     new Block(340, 210),
        //     new Block(450, 210),
            

        // ]
        // for(let i =0; i<blocks.length; i++){
        //     let block = document.createElement('div');
        //     block.classList.add('block');
        //     block.style.left = blocks[i].bottomLeft[0] + 'px'
        //     block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        //     grid.appendChild(block);
        // }
        
        
                
        // }
            
            
           
        
        function reset(){
            // killandMakeNewBlocks();
            // ballCurrentPosition =[270,40];
            // drawBall();
            // currentPosition = [230, 10];
            // drawUser();
            // score = 0;
            // scoreDisplay.innerHTML =score;
            window.location.reload();
        
        }
        


        // check for collisions
        function checkForCollisions(){

            //check for block collisions
            for(let i =0; i<blocks.length; i++){
                if(
                    (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
                    ballCurrentPosition[0] < blocks[i].bottomRight[0] )&&

                    ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
                    ballCurrentPosition[1] < blocks[i].topLeft[1])
                ){
                    const allBlocks = Array.from(document.querySelectorAll('.block'))
                    allBlocks[i].classList.remove('block')
                    blocks.splice(i,1)
                    changeDirection();
                    score++;
                    scoreDisplay.innerHTML = score;

                    //check for win
                    if(blocks.length===0){
                        scoreDisplay.innerHTML=':: YOU WIN ::'
                        clearInterval(timerId)
                        document.removeEventListener('keydown',moveUser)
                        
                        btnDisable();
                        document.getElementById('restartbtn').style.visibility='visible';
                    }
                }
            }
            //check for wall collisions
            if(ballCurrentPosition[0]>= (boardWidth-ballDiameter) || 
            ballCurrentPosition[1]>= (boardHeight-ballDiameter)||
            ballCurrentPosition[0]<=0){
                changeDirection()
            }
            
            //check for user collisions
            if(ballCurrentPosition[0]>currentPosition[0]&&
            ballCurrentPosition[0]<currentPosition[0]+blockWidth &&
            ballCurrentPosition[1]>currentPosition[1]&&
            ballCurrentPosition[1]< currentPosition[1] + blockHeight){
                changeDirection();
            }


            //check for game over
            if(ballCurrentPosition[1]<0){
                clearInterval(timerId);
                scoreDisplay.innerHTML = 'YOU LOSE'
                document.removeEventListener('keydown', moveUser);
                btnDisable();
                document.getElementById('restartbtn').style.visibility='visible';

            }
            
        }
        const leftbtn = document.getElementById('leftGo')
        const rightbtn = document.getElementById('rightGo')

        function btnDisable(){
           
            leftbtn.disabled= true;
            rightbtn.disabled = true;
        }
        btnDisable();
        function btnEnable(){
            leftbtn.disabled= false;
            rightbtn.disabled = false;
        }

        function changeDirection(){
            if(xDirection === 2 && yDirection === 2){
                yDirection = -2
                //xDirection = -2
                return
            }
            if(xDirection === 2 && yDirection === -2){
                xDirection = -2
                //yDirection = 2
                return
            }
            if(xDirection === -2 && yDirection === -2){
                yDirection =2
                //xDirection = 2
                return
            }
            if(xDirection === -2 && yDirection === 2){
                xDirection = 2
                return
            }
            //if()
        }