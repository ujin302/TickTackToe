var gms = new GameManager();

var gamemessage = {
    // template함수: getmessage의 값을 보여주는 방식 
    template: "<p>{{getmessage}}</p>",
    // computed함수: gms.GameState의 값을 계속 확인하고(GameState의 값이 변경될때마다 확인)
    //               return값을 getmessage에게 돌려준다. 
    computed : {
        getmessage :() => {
            gms.Update();
            if(gms.GameState === 0){ return  "게임오버! - 무승부"; }
            else if(gms.GameState === 1){ return  "게임오버! - O 승리"; }
            else if(gms.GameState === 2){ return  "게임오버! - X 승리"; }
            else if(gms.GameState === 3){ return  "O 턴"; }
            else if(gms.GameState === 4){ return  "X 턴"; }
        }
    }
}

var app = new Vue({
    // TTT_app 이 자체를 Vue로 만듦 -> 만약, 밖으로 나가면 오류! 
    el : "#TTT_app",
    data : gms,

    components:{
        'game-message': gamemessage,
        
        // 'game_Map': gamemap
    },
    
    methods : { 
        // event.target: 사용자가 누른 것(이벤트가 발생한 요소 반환) 
        // parentElement: game_map
        // children: game_tile 배열 9개 가져옴 
        // indexOf.call함수(call: 속성)
        // 가상의 배열을 만들고 첫번째 매개변수를 배열 넣기
        // 두번째 매개변수는 가상배열에서 사용자가 선택한 것 
        

        // 교무실에 학생 줄 세우고 잘못한 사람 불러오기 
        oxinput : function(event){ // 칸에 값 입력 
            console.log(event.target);
            console.log(event.target.parentElement);
            console.log(event.target.parentElement.children);
            console.log([].indexOf.call(event.target.parentElement.children, event.target));
            
            gms.input([].indexOf.call(event.target.parentElement.children, event.target));
        },

        GameOver: function() {            
            console.log(gms.inProgress);
            return gms.inProgress;
        },

        Reset: function() {
            gms.Init();
        },

        // get_Show(){
        //     return gms.show;
        // }
    },

    created : function(){
        console.log("GameState " + gms.GameState);
        console.log("게임 객체 생성완료");
        // console.log(gms.inProgress);
    }
});