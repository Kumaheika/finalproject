$(document).ready(init);

        //網頁上所有的DOM都載入後
        function init() {
            addMarker();
        }
        //加入標記點
        function addMarker() {
            $.ajax(
            {
                url: 'http://data.kaohsiung.gov.tw/Opendata/DownLoad.aspx?Type=2&CaseNo1=AF&CaseNo2=2&FileType=2&Lang=C&FolderType=O',
                type: 'GET',
                async: false,
                data: {},
                dataType: 'json',
                success: function (data) {


                    var first = true;
                    var map;
                    var infowindow = new google.maps.InfoWindow();
                    //var focusInfoWindow;
                    for (var index in data) {

                        if (first == true) {//第一次執行迴圈
                            /*以哪個緯經度中心來產生地圖*/
                            var latlng = new google.maps.LatLng(data[index].緯度Lat, data[index].經度Lng);
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
                        var myLatlng = new google.maps.LatLng(data[index].緯度Lat, data[index].經度Lng);
                        //加一個Marker到map中
                        var image = 'images/policeman.png';
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            icon: image,
                            //title: data[index].測照地點
                        });
                       
                        var content='<div class="activity-info"><p>' + data[index].單位 +'</p><p>'+data[index].地址 +'</p><p>'+data[index].電話 +'</p></div>';
                        attachSecretMessage(marker,content) ;
                       
                        function attachSecretMessage(marker, content) {
                        var infowindow = new google.maps.InfoWindow({
                        content: content,
                        });

                        var currentInfoWindow = '';
                        google.maps.event.addListener(marker, 'click', function() 
                        {   
                        if(currentInfoWindow != '')   
                        {    
                        currentInfoWindow.close();   
                        currentInfoWindow = '';   
                        }   
                        infowindow.open(marker.get('map'), marker);
                        currentInfoWindow = infowindow;   
                        });  
                        
                        /*google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(marker.get('map'), marker);
                           });*/
                        }

                        
                       marker.addListener('click', function() {
                         if (focusInfoWindow != null) {
                         focusInfoWindow.close();
                         }
                        infoWindow.open(map, marker);
                        focusInfoWindow = infoWindow;
                        var listCount = Number(dataCount) + 1;
        /**
        $('html,body').animate({
            scrollTop: $('#list > li:nth-child(' + listCount + ')').offset().top
        }, 2000);
        **/

                         });

                         //addMarker(marker);
                         //markers.push(marker);
                         //infoWindows.push(infoWindow);


                    } //End for (var index in data) 
                }     //End success: function (data) 
            });       //End jQuery Ajax
        }             //End function addMarker() 


