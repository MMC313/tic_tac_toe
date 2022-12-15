(function(){
    let gameArray = ["","","","","","","","",""];
    let turn = 0;
    const winner = document.getElementById("announcer");
    
    _render()
   

    function _render(){
        const gameArea = document.getElementById("game_content");
        _reset()

        gameArea.innerHTML = "";
        for(i=0;i<gameArray.length;i++){
            const newBut = document.createElement("button");
            newBut.textContent = gameArray[i];
            newBut.classList.add("cell");
            newBut.id = i;
            gameArea.appendChild(newBut);
        }
        _actionBind()
    }

    function _actionBind(){
        
        const begin = document.getElementById("begin");
        begin.addEventListener("click",function(){
            const overlay = document.getElementById("overlay");
            overlay.classList.add("hidden");
        })

        _turnCounter();
        
        const cells = document.querySelectorAll(".cell");
        cells.forEach(btn => btn.addEventListener("click",function(){
            if(gameArray[btn.id]===""){
                gameArray[btn.id]=playerSymbol;
                turn++;
            }
            _winTieCheck();
            _render();
        }))
    }

    function _turnCounter(){
        if(turn % 2 ===0 ){
            playerSymbol = "X";
        }else{ playerSymbol = "O"}
    }
    

    function _winTieCheck(){
        const allEqual = arr => arr.every(val => val === arr[0] && val !== "");
        const allFull = arr => arr.every(val => val !== "")
        const row1 = allEqual(gameArray.slice(0,3))
        const row2 = allEqual(gameArray.slice(3,6))
        const row3 = allEqual(gameArray.slice(6,9))
        const col1 = allEqual([gameArray[0],gameArray[3],gameArray[6]])
        const col2 = allEqual([gameArray[1],gameArray[4],gameArray[7]])
        const col3 = allEqual([gameArray[2],gameArray[5],gameArray[8]])
        const diag1 = allEqual([gameArray[0],gameArray[4],gameArray[8]])
        const diag2 = allEqual([gameArray[2],gameArray[4],gameArray[6]])
        const announcer = document.getElementById("announceOverlay")
        

        if(row1||row2||row3||col1||col2||col3||diag1||diag2){
            winner.textContent =  `Player ${playerSymbol} you win!`
            announcer.classList.remove("hidden")
            _playAgain()
        }else if(allFull(gameArray)){
            winner.textContent = "It's a draw, neither player wins!"
            announcer.classList.remove("hidden")
            _playAgain()
        }
    }

    function _reset(){
        const resetBtn = document.getElementById("reset")
        resetBtn.addEventListener("click",function(){
            gameArray = ["","","","","","","","",""];
            winner.textContent = "Winner TBA";
            _render();
            _playAgain();
        })
    }

    function _playAgain(){
        const play = document.getElementById("playAgain")
        

        play.addEventListener("click",function(){
            const announceOverlay = document.getElementById("announceOverlay")
            announceOverlay.classList.add("hidden")
            gameArray = ["","","","","","","","",""];
            _render();
        })
    }
   


})()