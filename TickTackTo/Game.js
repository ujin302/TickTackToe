class Game {
    constructor() {
        this.inProgress = true; // 게임 진행 여부
        this.winner = null; // 승자 여부
        this.currentTurn = Game.O; // 누구 차례?
        this.movesMode = 0; // 총 몇번 움직였는지! 
        this.squares = new Array(9).fill().map( s => new Square() );
        // fill(): 채워넣기, map(): 주어진 배열을 모두 돌면서 함수의 결과를 모아 새로운 배열 리턴
    }

    makeMove(i) {
        if(this.inProgress && !this.squares[i].value){
            this.squares[i].value = this.currentTurn;

            this.movesMode++; // 움직인 숫자 
            this.checkForWinner();
            this.currentTurn = (this.currentTurn == Game.O) ? Game.X : Game.O;
            // 현재 순서가 O이면 X 순서로 변경 
        }

    }

    // 승리 조건
    checkForWinner() {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        // 승리하면 색상 변함.
        winningCombinations.forEach((wc) => {
            const [a,b,c] = wc;
            const sqA = this.squares[a];
            const sqB = this.squares[b];
            const sqC = this.squares[c];

            
            if(sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){ // 3개의 모양이 같으면 
                this.inProgress = false; // 게임 오버 
                this.winner = sqA.value; // 승자의 모양 확인 
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true; // 하이라이트! 
            }
        });

        // 무승부
        if(this.movesMode === this.squares.length) { // squares == 9 
            this.inProgress = false; // 9번 움직이면 작동 그만!! 
        }
    }
}


Game.O = 'O';
Game.X = 'X';
