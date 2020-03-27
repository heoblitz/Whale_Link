var urlList = [
    ["네이버 부동산", "https://new.land.naver.com/search?sk={query}}", "https://land.naver.com/favicon.ico", "부동산"],
    ["네이버 쇼핑", "https://search.shopping.naver.com/search/all.nhn?query={query}", "https://ssl.pstatic.net/imgshopping/cnsv/p/im/home/favicon.ico", "쇼핑"],
    ["네이버 지도", "https://map.naver.com/v5/search/{query}", "https://map.naver.com/v5/assets/icon/favicon-32x32.png", "지도"],
    ["네이버 사전", "https://dict.naver.com/search.nhn?query={query}", "https://dict.naver.com/favicon.ico", "사전"],
    ["네이버 지식인", "https://kin.naver.com/search/list.nhn?query={query}", "https://kin.naver.com/favicon.ico", "지식인"],
    ["네이버 포스트", "https://post.naver.com/search/post.nhn?keyword={query}", "https://post.naver.com/favicon.ico", "포스트"],
    ["네이버 TV", "https://tv.naver.com/search/clip?query={query}", "https://tv.naver.com/favicon.ico", "tv"],
    ["네이버 검색", "https://search.naver.com/search.naver?query={query}", "https://www.naver.com/favicon.ico", "검색"],
    ["네이버 플레이스", "https://store.naver.com/restaurants/list?query={query}", "https://store.naver.com/favicon.ico", "플레이스"],
    ["네이버 웹툰", "https://comic.naver.com/search.nhn?keyword={query}", "https://ssl.pstatic.net/static/comic/favicon/webtoon_favicon_32x32.ico", "웹툰"],
];

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

var Posts = new Map();

if (localStorage.getItem("Posts") == null) {
    for (let i = 0; i < urlList.length; i++) {
        let data = new DataDto(urlList[i][0], urlList[i][1], urlList[i][2], urlList[i][3]);
        Posts.set(urlList[i][3], data);
    }

    Posts = mapToObj(Posts);

    localStorage.setItem("Posts", JSON.stringify(Posts));
    Posts = JSON.parse(localStorage.getItem("Posts"));

    renderPosts();
}

else {
    Posts = JSON.parse(localStorage.getItem("Posts"));
    renderPosts();
}

function renderPosts() {
    let container = document.getElementsByClassName("container")[0];

    for(let hotKey in Posts ) {
        container.insertAdjacentHTML('beforeend', createHtmlList(Posts[hotKey]))
    }

    //alert("render is complete!");
}

function createHtmlList(data) {
    let htmlCode = "<li class=\"contents-list\">" +
                        "<img src=\"" + data["faviconUrl"] + "\" class=\"contents-image\">" +
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
