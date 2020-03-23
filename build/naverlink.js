document.addEventListener('keydown', userKey);
var send = document.getElementById('send');
send.onclick = userClick;

var urlList = {
    부동산 : ["https://new.land.naver.com/search", "sk"],
    쇼핑 : ["https://search.shopping.naver.com/search/all.nhn", "query"],
    지도 : ["https://map.naver.com/v5/search/", ""],
    사전 : ["https://dict.naver.com/search.nhn", "query"],
    지식인 : ["https://kin.naver.com/search/list.nhn", "query"],
    포스트 : ["https://post.naver.com/search/post.nhn", "keyword"],
    구지도 : ["https://map.naver.com/?sm=hty", "query"],
    tv : ["https://tv.naver.com/search/clip", "query"],
    검색 : ["https://search.naver.com/search.naver", "query"],
    플레이스 : ["https://store.naver.com/restaurants/list", "query"],
    웹툰 : ["https://comic.naver.com/search.nhn", "keyword"],
};
// 이중 배열로 수정하자.
 
function userClick(){ // user button 클릭 감지.
    var userInput = document.getElementById("query").value;
    var custumUrl;
    var i;

    userInputList = userInput.split(' ');

    if (userInputList[0] == "지도") { // 예외적으로 GET query 사용하지 않음
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
        chrome.tabs.update(tab.id, {url: custumUrl}); // chrome method 사용
    });
};

function userKey(){ // user enter 입력 감지.
    if(window.event.keyCode == 13){
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
};