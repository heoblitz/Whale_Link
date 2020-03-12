var theValue = ["a", "b"];

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({"저장": theValue}, function () {
    // 저장 완료
});

chrome.storage.local.get("저장", function (items) {
  alert(items.저장);
  // items: 저장한 객체의 key/value
});
});