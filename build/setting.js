var urlList = [
    ["네이버 부동산", "https://new.land.naver.com/search?sk={검색어}}", "https://land.naver.com/favicon.ico", "부동산"],
    ["네이버 쇼핑", "https://search.shopping.naver.com/search/all.nhn?query={검색어}", "https://ssl.pstatic.net/imgshopping/cnsv/p/im/home/favicon.ico", "쇼핑"],
    ["네이버 지도", "https://map.naver.com/v5/search/{검색어}", "https://map.naver.com/v5/assets/icon/favicon-32x32.png", "지도"],
    ["네이버 사전", "https://dict.naver.com/search.nhn?query={검색어}", "https://dict.naver.com/favicon.ico", "사전"],
    ["네이버 지식인", "https://kin.naver.com/search/list.nhn?query={검색어}", "https://kin.naver.com/favicon.ico", "지식인"],
    ["네이버 포스트", "https://post.naver.com/search/post.nhn?keyword={검색어}", "https://post.naver.com/favicon.ico", "포스트"],
    ["네이버 TV", "https://tv.naver.com/search/clip?query={검색어}", "https://tv.naver.com/favicon.ico", "tv"],
    ["네이버 검색", "https://search.naver.com/search.naver?query={검색어}", "https://www.naver.com/favicon.ico", "검색"],
    ["네이버 플레이스", "https://store.naver.com/restaurants/list?query={검색어}", "https://store.naver.com/favicon.ico", "플레이스"],
    ["네이버 웹툰", "https://comic.naver.com/search.nhn?keyword={검색어}", "https://ssl.pstatic.net/static/comic/favicon/webtoon_favicon_32x32.ico", "웹툰"],
];
document.cookie = "SameSite=None; Secure"; // same site problem
document.getElementById("save-button").addEventListener("click", SaveUserConfig); // 저장 버튼 이벤트 리스너
document.getElementById("modal-add-button").addEventListener("click", AddUserConfig); // 추가 버튼 이벤트 리스너
document.getElementById("delete-button").addEventListener("click", DeleteUserConfig); // 삭제 버튼 이벤트 리스너

var el = document.getElementsByClassName("container")[0]
var sortable = Sortable.create(el);

var DataDto = function (serviceName, url, faviconUrl, hotKey) {
    this.serviceName = serviceName;
    this.url = url;
    this.faviconUrl = faviconUrl;
    this.hotKey = hotKey;
}

var PostDto = function (Hotkey, datadto) {
    let post = {}
    post[Hotkey] = datadto;

    return post;
}

if (localStorage.getItem("Posts") == null) {
    saveData(urlList)
    let Posts = getData();
    renderPosts(Posts);
}

else {
    // Posts = JSON.parse(localStorage.getItem("Posts"));
    let Posts = getData();
    renderPosts(Posts);
}

function renderPosts(Posts) {
    let container = document.getElementsByClassName("container")[0];
    
    for(let hotKey in Posts ) {
        container.insertAdjacentHTML('beforeend', createHtmlList(Posts[hotKey]));
    }
    // container.insertAdjacentHTML('beforeend', createAddButton());

    document.getElementById("add-button").addEventListener("click", LayerPopup);
    document.getElementsByClassName("close")[0].addEventListener("click", LayerPopdown);
}

function createHtmlList(data) {
    let htmlCode = "<li class=\"contents-list\">" +
                        //"<a href=\"" + data["url"].substring(0, data["url"].length - 8) + "\">" + // {검색어} 로 GET 보내면 404 리턴하는 사이트 존재.
                        "<a href=\"" + data["url"] + "\">" +
                            "<img src=\"" + data["faviconUrl"] + "\" class=\"contents-image\">" + // 슬라이싱 해서 뻬준다.
                        "</a>" +
                        "<h3 class=\"query-name\">" + data["serviceName"] + "</h3>" +
                        "<span class=\"shortcut\">단축키</span>" +
                        "<input type=\"text\" value=\"" + data["hotKey"] + "\" class=\"contents-hotkey\">" +
                    "</li>";

    return htmlCode;
}

function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function(value, key){
        obj[key] = value
    });

    return obj;
}

function saveData(urlList) {
    let Posts = new Map();

    for (let i = 0; i < urlList.length; i++) {
        let data = new DataDto(urlList[i][0], urlList[i][1], urlList[i][2], urlList[i][3]);
        Posts.set(urlList[i][3], data);
    }

    Posts = mapToObj(Posts);

    localStorage.setItem("Posts", JSON.stringify(Posts));
    Posts = JSON.parse(localStorage.getItem("Posts"));

    return Posts;
}

function getData() {
    let Posts;

    Posts = JSON.parse(localStorage.getItem("Posts"));

    return Posts;
}

function getHtmlData() {
    
    let contents = document.getElementsByClassName("contents-list");
    let contentsList = new Array();

    for(var i=0; i<contents.length; i++) {
        contentsList.push(
            [
                contents[i].querySelector('.query-name').innerText,
                decodeURI(contents[i].querySelector('a').href),
                contents[i].querySelector('.contents-image').src,
                contents[i].querySelector('.contents-hotkey').value
            ]);
    }

    return contentsList;
}

function SaveUserConfig() { // 저장 버튼 누르면 실행
    let contentsList;
    let posts;
    let check;

    contentsList = getHtmlData(); // setting.html 태그 값 읽어서 배열로 리턴
    check = checkDuplicate(contentsList);

    if (!check) { // False 일 때 저장 허용.
        saveData(contentsList);
        alert("저장되었습니다.");
    }

    else if (check == "blank") { // 단축키 입력되지 않을 때
        alert("빈칸은 단축키로 지정할 수 없습니다.");
    }

    else {
        alert("단축키는 중복될 수 없습니다!");
    }
}

function AddUserConfig() { // 서비스 추가하기.
    var contentsList;
    var addContentList;
    var container;

    addContentList = getUserAddHtmlData();
    
    if (addContentList != null) {
        contentsList = getHtmlData();
        contentsList.push(addContentList[0]);

        check = checkDuplicate(contentsList);

        if (!check) { // False 일 때 저장 허용.
            saveData(contentsList);
            alert("저장되었습니다.");

            container = document.getElementsByClassName("container")[0];
            container.insertAdjacentHTML('beforeend', createHtmlList(
                new DataDto(
                    addContentList[0][0],
                    addContentList[0][1],
                    addContentList[0][2],
                    addContentList[0][3],
                )
            ));
        }

        else {
            alert("단축키는 중복될 수 없습니다!");
        }
    }

    else {
        alert("빈칸을 입력해주세요.");
    }
}

function getUserAddHtmlData() { // 추가 창에서 HTML 값 읽어서 리턴하는 함수
    let addContentList = new Array();
    let serviceName, faviconUrl, url, hotkey;

    let content = document.getElementsByClassName("modal-cont")[0];
    
    serviceName = content.querySelector('#modal-input-servicename').value;
    url = content.querySelector('#modal-input-url').value;
    hotkey = content.querySelector('#modal-input-hotkey').value;
    faviconUrl = "https://www.google.com/favicon.ico";

    if (serviceName != "" || url != "" || hotkey != "") {
        addContentList.push(
            [
                serviceName,
                decodeURI(url),
                faviconUrl,
                hotkey
            ]
        )

        return addContentList;
    }

    return null;    
}

function checkDuplicate(contentsList) { // 리스트 받아서 단축키 중복 체크
    let hotKeyList = new Array();

    for(let i = 0; i < contentsList.length; i++) {
        if ( contentsList[i][3] == "" ) {
            return "blank"
        }

        hotKeyList.push(contentsList[i][3]);
    }

    return new Set(hotKeyList).size != hotKeyList.length; // 중복된 요소가 있으면 False return
}

function LayerPopup() { // 레이어 팝업 
    let element = document.getElementById("modal");
    
    element.removeAttribute("class");
    element.classList.add("three");
}

function LayerPopdown() { // 레이어 팝 다운 
    let element = document.getElementById("modal");

    element.classList.add("out");
}

function DeleteUserConfig() {
    var element = document.getElementById("delete-button");

    if ( element.innerText == "완료하기" ) {
        element.innerText = "삭제하기";
        element.style = "background-color: darkgrey;";

        removeDeletebutton();
    }  

    else {
        element.innerText = "완료하기";
        element.style = "background-color: red;";
    
        addDeletebutton();
    }
}

function addDeletebutton() {
    var element = document.getElementsByClassName("contents-list");
    var length = element.length;
    var img;

    for(let i = 0; i < length; i++) {
        img = document.createElement("img");
        img.className = "query-delete-button"
        img.src = "/icons/close.svg";
        element[i].appendChild(img);
    }
}

function removeDeletebutton() {
    var element = document.getElementsByClassName("query-delete-button");

    for(let i = 0; i < element.length; i++ ) {e
        element[i].remove();
        //alert(i);
    }
}