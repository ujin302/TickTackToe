class GameManager {
    constructor() {
        this.GameState = 0;
        // 0 게임 오버 - 무승부 
        // 1 게임 오버 - o 승리 
        // 2 게임 오버 - x 승리 
        // 3 게임 플레이중 - o 턴 
        // 4 게임 플레이중 - x 턴 

        this.inProgress = true; // 게임 진행 여부
        this.winner = null; // 승자 여부
        this.currentTurn = GameManager.O; // 누구 차례?
        this.movesMode = 0; // 총 몇번 움직였는지! 
        this.Map = new Array(9).fill().map( s => new maptile() ); // 배열 생성, 초기화
    }
    
    Init() // 초기화
    {
        this.GameState = 0; // 무승부 
        this.inProgress = true; // 다시 활성화
        this.movesMode = 0; 
        this.winner = null; 
        this.currentTurn = GameManager.O;


        // this.Map = new Array(9);
        for(var i = 0; i < 9; i++){
            this.Map[i].value = null;
            this.Map[i].isHighlighted = false;
        }
    }

    
    input(i) // 입력 
    {
        if(this.inProgress && !this.Map[i].value){ // 게임중 + 값이 없는지 
            this.Map[i].value = this.currentTurn; // 배열에 현재 순서 모양 넣기 

            this.movesMode++; // 움직인 숫자 
            // 승리 조건 확인 
            this.Update(); 
            // 순서 변경 
            this.currentTurn = (this.currentTurn == GameManager.O) ? GameManager.X : GameManager.O; // 순서 변경
            if(this.currentTurn == GameManager.O) {
                this.GameState = 3;
            }else if(this.currentTurn == GameManager.X){
                this.GameState = 4;
            }
            // 현재 순서가 O 이면 X 순서로 변경 
        }
    }

    Update()
    {   
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

        winningCombinations.forEach((wc) => {
            const [a,b,c] = wc;
            const sqA = this.Map[a];
            const sqB = this.Map[b];
            const sqC = this.Map[c];

            
            if(sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){ // 3개의 모양이 같으면 
                this.inProgress = false; // 게임 오버  
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true; // 하이라이트!
                if(this.currentTurn == GameManager.O) { this.GameState = 2; }
                if(this.currentTurn == GameManager.X) { this.GameState = 1; }
            }
        });

        if(this.movesMode === this.Map.length) { // squares == 9 
            this.inProgress = false; // 9번 움직이면 작동 그만!! 
            this.GameState = 0;
        } 
    }
}


GameManager.O = 'O';
GameManager.X = 'X';