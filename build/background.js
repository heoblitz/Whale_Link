/*
var urlList = {
  "부동산" : ["https://new.land.naver.com/search", "sk"],
  "쇼핑" : ["https://search.shopping.naver.com/search/all.nhn", "query"],
  "지도" : ["https://map.naver.com/v5/search/", ""],
  "사전" : ["https://dict.naver.com/search.nhn", "query"],
  "지식인" : ["https://kin.naver.com/search/list.nhn", "query"],
  "포스트" : ["https://post.naver.com/search/post.nhn", "keyword"],
  "구지도" : ["https://map.naver.com/?sm=hty", "query"],
  "tv" : ["https://tv.naver.com/search/clip", "query"],
  "검색" : ["https://search.naver.com/search.naver", "query"],
  "플레이스" : ["https://store.naver.com/restaurants/list", "query"],
  "웹툰" : ["https://comic.naver.com/search.nhn", "keyword"],
  "what" : "what",
};
*/

chrome.runtime.onInstalled.addListener(function() {
// test code
    save("aa", "hello");  
});

function save(key, value) {
  chrome.storage.local.set({key: value}, function () {
    // 저장 완료
    get(key);
  });
}

function get(key) {
  chrome.storage.local.get([key], function (result) {
    alert(key + result[key]);
  });
}