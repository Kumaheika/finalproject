$(document).ready(init);
        //網頁上所有的DOM都載入後
        function init() {
            addMarker();
        }
        //加入標記點
        function addMarker() {
            $.ajax(
            {
                url: 'https://raw.githubusercontent.com/yu19941994/map/gh-pages/accidentya.json',
                type: 'GET',
                async: false,
                data: {},
                dataType: 'json',
                success: function (data) {
                    
                    var first = true;
                    var map;
                    for (var index=0; index<data.length; index++) {
                        if (first == true) {//第一次執行迴圈
                            /*以哪個緯經度中心來產生地圖*/
                            var latlng = new google.maps.LatLng(data[index].lat, data[index].lng);
                            var myOptions = {
                                zoom: 14,
                                center: latlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            };
                            /*產生地圖*/
                            map = new google.maps.Map($("#div_showMap")[0], myOptions);
                            first = false;
                        } //End if (first == true) 
                        //建立緯經度座標
                        var myLatlng = new google.maps.LatLng(data[index].lat, data[index].lng);
                        
                        var info = data[index].發生路段;
                        var year = data[index].排名;
                        
                        //加一個Marker到map中

                        var image;
                        
                        var markers = [];
                        var infoWindows = [];
                        createMarker(year);
                        function createMarker(year){
                            if(year == 102){
                                image = 'images/death_102.png';
                            }
                            else if(year == 103){
                                image = 'images/death_103.png';
                            }
                            else{
                                image = 'images/death_104.png';
                            }
                        }
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: image
                        });
                        var content = '<div class=infowin><p>'+info+'</p></div>';
                        attach(marker,content);
                        

                        function attach(marker,content){
                            var infowindow = new google.maps.InfoWindow({  
                                    content: content
                                    });
                            google.maps.event.addListener(marker, 'click', function() {
                                    infowindow.open(marker.get('map'), marker);
                                    });
                            }
                        
                    } //End for (var index in data) 
                }     //End success: function (data)
                
                         
            });       //End jQuery Ajax
        }             //End function addMarker() 