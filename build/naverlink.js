document.addEventListener('keydown', userKey);
document.cookie = "SameSite=None; Secure"; // same site problem

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

    url = url.replace("{query}", query);

    return url;
}


/*
var urlList = [
    ["부동산", "https://new.land.naver.com/search?sk={query}}", "https://search.naver.com/favicon.ico"],
    ["쇼핑", "https://search.shopping.naver.com/search/all.nhn?query={query}", "https://land.naver.com/favicon.ico"],
    ["지도", "https://map.naver.com/v5/search/{query}", "https://ssl.pstatic.net/imgshopping/cnsv/p/im/home/favicon.ico"],
    ["사전", "https://dict.naver.com/search.nhn?query={query}", "https://dict.naver.com/favicon.ico"],
    ["지식인", "https://kin.naver.com/search/list.nhn?query={query}", "https://kin.naver.com/favicon.ico"],
    ["포스트", "https://post.naver.com/search/post.nhn?keyword={query}", "https://post.naver.com/favicon.ico"],
    ["네이버 TV", "https://tv.naver.com/search/clip?query={query}", "https://tv.naver.com/favicon.ico"],
    ["검색", "https://search.naver.com/search.naver?query={query}", "https://ssl.pstatic.net/static/comic/favicon/webtoon_favicon_32x32.ico"],
    ["플레이스", "https://store.naver.com/restaurants/list?query={query}", "https://store.naver.com/favicon.ico"],
    ["웹툰", "https://comic.naver.com/search.nhn?keyword={query}", "https://ssl.pstatic.net/static/comic/favicon/webtoon_favicon_32x32.ico"],
];
// 이중 배열로 수정하자.


function AccessToUrl() {
    var userInput = document.getElementById("query").value;
    var custumUrl;
    var i;

    userInputList = userInput.split(' ');

    if (userInputList[0] == "지도") { 
        custumUrl = urlList[userInputList[0]][0];

        chrome.storage.local.get(["hi"], function (result) {
            alert("work" + result["hi"]);
        });

    }

    else {
        custumUrl = urlList[userInputList[0]][0]; // index 0 일때 
        custumUrl = custumUrl + "?" + urlList[userInputList[0]][1] + "=";
    }

    for(i=1;i<userInputList.length;i++){ // 사용자가 공백을 주고 입력한 값 for 문 돌림
        custumUrl += encodeURI(userInputList[i]); 

        if(i != userInputList.length-1){ // 문자열 끝이 아니라면 공백 추가
            custumUrl += ' ';
        }
    }

    chrome.tabs.query({currentWindow: true, active: true}, function(tab){
        chrome.tabs.update(tab.id, {url: custumUrl});
    });
}
*/

