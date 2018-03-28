var lnt = document.querySelector("#lng").value,
    lat = document.querySelector("#lat").value;
var map;

function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
    map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(lnt,lat);
    map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//创建marker
function addMarker(){
    var marker = new BMap.Marker(new BMap.Point(lnt, lat));                  // 创建标注
    map.addOverlay(marker);                                                         // 将标注添加到地图中
    var circle = new BMap.Circle(new BMap.Point(lnt, lat), 30, {fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);                                                         //增加圆
    marker.show();
    circle.show();
}

initMap();
