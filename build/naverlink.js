document.cookie = "SameSite=Strict"; // same site problem
document.addEventListener('keydown', userKey);

var send = document.getElementById('send');
send.onclick = userClick;

// event
 
function userClick(){ // user button 클릭 감지.
    AccessToUrl();
}

function userKey(){ // user enter 입력 감지.
    if(window.event.keyCode == 13){
        AccessToUrl();
    }
}

function AccessToUrl() {
    let Posts = AccessDB();
    let userInput = document.getElementById("query").value;
    let url;

    userInputList = userInput.split(' ');

    if (Posts[userInputList[0]] == undefined) { 
        alert("지정되지 않은 키입니다.")
    }

    else {
        url = ParseCommand(Posts, userInputList);
    }

    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        chrome.tabs.update(tab.id, {url: url});
    });
}

function AccessDB() {
    let Posts;

    if( localStorage.getItem("Posts") == null ) {
        alert("DB 오류");
    }

    else {
        Posts = JSON.parse(localStorage.getItem("Posts"));
    }

    return Posts;
}

function ParseCommand(Posts, userInputList) {
    let url = Posts[userInputList[0]]["url"];
    var query = "";

    for(let i=1;i<userInputList.length;i++){ // 사용자가 공백을 주고 입력한 값 for 문 돌림
        query += encodeURI(userInputList[i]); 

        if(i != userInputList.length-1){ // 문자열 끝이 아니라면 공백 추가
            query += ' ';
        }
    }

    url = url.replace("{검색어}", query);

    return url;
}