function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var url = window.location.href;
if (url.match('.html') && !url.match('player')) {
} else {
  var script = document.createElement('script');
  script.src = "https://live.sk-knower.com/lib/jquery-1.10.1.min.js";
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = function () {
    $('.chat-room__content').on('click', '.facebookvideo', function (e) {
      var fbid = $(this).data("fbid");
      $(this).html('<iframe width="100%" height="200" src="https://www.facebook.com/plugins/video.php?href='+fbid+'&amp;show_text=0&amp;width=300&height=200" frameborder="0" allowfullscreen="" style="vertical-align: middle;"></iframe>');
    });
    $('.chat-room__content').on('click', '.facebookclosevideo', function (e) {
      var fbid = $(this).data("fbid");
      $("."+fbid).html('');
    });
    function load_chatbg(live_login) {
      console.log('bg_ssok');
      sentpaneldata = "";
      var number = Math.floor((Math.random() * 10000000000000)+1);
      $.getJSON("https://live.sk-knower.com/dashboard2/function/listbg.php?id="+live_login+"&n"+number, function (c) {
        $('#chat_bg').css('background-image', 'url('+c[0]+')');
      });
    }

    $(document).on('click', "#sk_click_icon", function () {
      if (document.getElementById("sk_icon_set").className == "skicon_off") {
        document.getElementById("sk_icon_set").className = "skicon_on";
        document.getElementById("sk_icon_set").style.top = "50px";
        document.getElementById("sk_icon_set").style.right = "0px";
        document.getElementById("sk_icon_set").style.left = "inherit";
        document.getElementById("sk_click_icon").style.filter = "grayscale(0%)";
      } else {
        document.getElementById("sk_icon_set").className = "skicon_off";
        document.getElementById("sk_click_icon").style.filter = "grayscale(100%)";
      }
    });


    $(document).on('click', ".sk_icon", function () {
      var axxa = $(this).attr("alt");
      if (axxa != '') {
        var text = ' '+axxa+' ';
        updateChatInput(textbox, text);
      }
    });

    $(document).on('click', "#sk_set4 >.sk_botton ", function () {
      var axxa = this.innerHTML;
      if (axxa != '') {
        updateChatInput(textbox, axxa);
      }
    });

    $(document).on('click', '.emo-select-channel', function () {
      var iconset = $(this).data("name");
      $(".tags_select").css("display", "none");
      $("#"+iconset).css("display", "flex");
    });

    $(document).on('click', '.sktopappend', function () {
      var type = $(this).data("name");
      if (type == 'photo') {
        var text = '[s] 圖片網址 [e]';
      } else if (type == 'video') {
        var text = '[y] 影片連結 [t]';
      } else if (type == 'pid') {
        var text = '[p] P網id [i]';
      }
      updateChatInput(textbox, text, 4, 8);
    });


    sklivedebug='';
    dashboardspecial='';
    var url = window.location.href;
    //console.log(url);
    if (url.match('www.twitch.tv/message/')) {
    } else {
      console.log('[Sklive]Start');
      var counterror = '0';
      //Loop
      function waitForElement() {
        thistitle = window.location.pathname+$('.room-selector__header').text();
        if(sklivedebug!=''){
        console.log($('.channel-header-user-tab__user-content > .tw-font-size-5').length+thistitle);
        console.log("newinput:"+$('.rich-input-container').length);
        }
        if ($('#sk_icon_set').length == "1") {
          $("#sk_icon_set").remove();
          $("#acgranking").remove();;
          $("#chat_bg").remove();
          $("#sk_news").remove();
          $("#pastebtn").remove();
        }
        if ($('#sk_click_icon').length == "3") {
          foreverloop();
        } else {
          dashboardspecial='';
          var str1 = window.location.pathname;
          var str2 = "/embed/";
          var str3 = "/popout/";
          var str4 = "/moderator/";
          var str5 = "/stream-manager";
          if ($('.chat-room__notifications').length == "1" || str1.indexOf(str2) != -1 || str1.indexOf(str3) != -1 || str1.indexOf(str4) != -1|| str1.indexOf(str5) != -1) {
            //判定
            if (str1.indexOf(str2) != -1 || str1.indexOf(str3) != -1) {
              var IdContent = str1.replace("/popout/", '').replace("/embed/", '').replace("/chat", '');
            } else if (str1.indexOf(str4) != -1) {
              var IdContent = str1.replace('/moderator/', '');
            } else if ($("a[data-a-target='watch-mode-to-home']").length == "1") {
              var IdContent = $("a[data-a-target='watch-mode-to-home']").attr('href').replace('/', '');
            }else if(str1.indexOf(str5) != -1){
                var idset = str1.split("/");
                dashboardspecial=idset[2];
                var IdContent = idset[2];
            } else {
              setTimeout(function () {
                counterror++;
                waitForElement();
              }, 3000);
              return false;
            }
            console.log('sk:'+IdContent);
            var bcontent = document.createElement("div");
            bcontent.id = "sk_chat_bg";
            bcontent.className = "id_"+IdContent+"_bg";
            var news = document.createElement("div");
            news.style.cssText = 'display:none;';
            news.id = "sk_news";
            news.innerHTML = '<div class="skchat_emotes_header" id="c"><div style="width: 100%;padding: 5px;"><img src="https://acg.sk-knower.com/acgsk.png" height="20" style="left: 0px;"> SKLive插件 更新資訊</div><div onclick="newsclosees();" class="close"><div style="margin-top: 2px;">╳</div></div></div><div><div style="font-size: 12px;margin: 0PX 15px 5px;"><div style="font-weight: bold;font-size: 18px;">SK9Fish(傻魚)吉祥物貼圖上架!</div><div style="text-align: center;"><a href="https://line.me/S/sticker/21494417" target="_blank" style="color: white;"><img src="https://sk-knower.com/img/sk9fish_banner.png"></a></div><div style="text-align: center;"></div><div style="padding-top: 5px;"> - 首先要為大家介紹的是<傻魚>, 這是SKLive的原創吉祥物, 由即日起你可以在SKLive上使用到原創貼圖! 而且Line貼圖都已經上架!! 快來使用還有購買Line貼圖吧!</div><div style="padding-top: 5px;"> - SK9Fish <傻魚>, 由台友 非竜乗墳 (Uravenlx)設計, 我們還有特別的3D版本由 西啡(saifair)建模, 全40張Line版貼圖, 盡顯9魚搞鬼風格! 值得購買!</div></br><div style="font-weight: bold;font-size: 18px;">還有插件已經更新了!</div><div style="text-align: center;"><a href="https://sk-knower.com/img/skchat_designbanner.png" target="_blank" style="color: white;"><img src="https://sk-knower.com/img/skchat_designbanner.png"></a></div><div style="padding-top: 5px;"> - SKLive插件已經全面更新設計! 整理後的設定介面更易用了! 更多技術細節可以來Discord詳細了解喔!</div><div style="font-size: 25px;padding: 12px;"><div style="font-size: 12px;;">加入SKLive <a href="https://discord.gg/XdvKzXe2K8" target="_blank" style="color: white;"> Discord</a><div style="font-size: 12px;;"><div><a href="https://discord.gg/XdvKzXe2K8" target="_blank" style="color: white;"><img src="https://sk-knower.com/img/joinDC.png" style="height:50px;"></a></div></div>參與SKLive開發,動畫及遊戲討論!<div style="float: right;" id="vote_userid">23/12/2022 @Sundayla123</div></div></div></div></div>';

            var message = document.getElementsByClassName('tse-content');
            [].slice.call(message).forEach(function (skttv) {
              if (skttv.id == 'settings') {
              } else {
                skttv.id = 'sk_ttv';
              }
            });
            var meas = document.getElementsByClassName('chat-input__buttons-container flex justify-content-between mg-t-1');
            [].slice.call(meas).forEach(function (skttv_set) {
              skttv_set.id = 'sk_ttv_set';
            });
            var content2 = document.createElement("div");
            content2.id = "sk_icon_set";
            content2.className = "skicon_off";
            content2.innerHTML = '<div class="skchat_emotes_header" id="a"><div style="width:100%"><img src="https://acg.sk-knower.com/acgsk.png" height="20" style="margin: 3px 0px 3px 4px;"> SKLive插件<button id="s8" type="button" class="emo-select-channel" data-name="sk_setting" style="position: relative; height: 20px;line-height: 10px;">設定</button></div><div onclick="closees();" class="close"> <div style="margin-top: 2px;">╳</div> </div> </div> <div id="emo-select"><button id="s12" data-name="sk_user" type="button" class="emo-select-channel" style="display: initial; background: rgb(0, 140, 227);">本台</button></div> <div id="sk_setting" class="tags_select" style="display: none;"> <div class="sk_setitem"> <span class="settingleft">清空我自己的聊天室</span> <span class="settingright"><button type="button" onclick="cleanmychat()" class="sk_botton">立即清空</button></span> </div> <div class="sk_setitem"> <span class="settingleft">直接顯示圖片</span> <span class="settingright"> <button type="button" id="imgtagoff" onclick="imgtagoff()" class="sk_botton sk_bottonswitchOFF">關閉</button> <button type="button" id="imgtag" onclick="imgtag()" class="sk_botton sk_bottonswitchON">開啟</button> </span> </div> <div class="sk_setitem"> <span class="settingleft">直接顯示P網圖片</span> <span class="settingright"> <button type="button" id="plinkoff" onclick="plinkoff()" class="sk_botton sk_bottonswitchOFF">關閉</button> <button type="button" id="plinkon" onclick="plinkon()" class="sk_botton sk_bottonswitchON">開啟</button> </span> </div> <div class="sk_setitem"> <span class="settingleft">字體大小(px)</span> <span class="settingright"> <input type="range" min="5" max="30" oninput="updateTextInput(this.value);setword();" style="width: 150px;" id="fontrange"> <input type="text" id="textbox1" style="width: 20px;"> <button type="button" class="sk_botton" id="button1" style="width: auto;" onclick="deleteword()">清除設定</button> </span> </div> <div class="sk_setitem"> <span class="settingleft">文字粗體</span> <span class="settingright"> <button type="button" id="boldoff" onclick="sknobold()" class="sk_botton sk_bottonswitchOFF">關閉</button> <button type="button" id="boldon" onclick="setbold()" class="sk_botton sk_bottonswitchON">開啟</button> </span> </div> <div class="sk_setitem"> <span class="settingleft">聊天室名字白邊框</span> <span class="settingright"> <button type="button" id="darkwordsoff" onclick="setnodark2words()" class="sk_botton sk_bottonswitchOFF">關閉</button> <button type="button" id="darkwordson" onclick="dark2words()" class="sk_botton sk_bottonswitchON">開啟</button> </span> </div> <div class="sk_footer"><a href="https://sk-knower.com" target="_blank"><img src="https://sk-knower.com/img/SKLive_c_d22.png" style="vertical-align: middle;height: 40px;" alt="SKLive中文直播列表"><img src="https://sk-knower.com/img/SKGamer_d.png" style="vertical-align: middle;height: 40px;" alt="SKLive中文直播列表"><div>© 2022 SKLive/SK-Knower.com Sundayla123</div><a href="https://discord.gg/XdvKzXe2K8" target="_blank"><button type="button" class="sk_botton" style="margin-top: 0px;color: white;" id="lan_content">技術支援/問題回報請到: Discord</button></a><button id="button1" onclick="opennews()" style="color: white;text-align: center;" class="sk_botton">插件更新資訊</button></a></div> </div> <div id="sk_user" class="tags_select" style="display: flex; color: black; height: 300px; overflow: auto;"> <div id="channeldata" style="font-size:12px;color:white;padding:4px;line-height: 15px;"></div> <div id="usericonset" style="font-size:12px;"></div></div></div>';
            function function2() {
              if(dashboardspecial!=''){
                var IdContent = dashboardspecial;
              }else{
                var IdContent = $(".top-nav__username").text().toLowerCase();
              }
              console.log('username:'+IdContent);
              $(".chat-room").append(news);
              var content = document.createElement("a");
              content.id = "sk_click_icon";
              content.className = "sk_click_icon";
              setTimeout(function () {
                var meas = document.getElementsByClassName('chat-input__buttons-container');
                [].slice.call(meas).forEach(function (skttv_set) {
                  skttv_set.id = 'sk_ttv_set';
                });
                if ($('.sk_click_icon').length == '0') {
                  $("#sk_ttv_set > div:first").append(content);
                }
                if ($("#watchonsklive").length == 0) {
                  $('[data-target="channel-header-right"]').append('<dd id="watchonsklive" class="cn-tabs__button" style="padding-left: 5px;"><button type="button" onclick="gousersk();" original-title="在SKLive大屏幕觀看!" class="sk_botton" style="position: inherit !important;display: inline !important;opacity: inherit !important;margin: 0PX;line-height: 20px;padding: 5px 0px 5px 5px;border-radius: 5px;background: #0089ff;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><ccc style="margin-right: 5px;"><img src="http://acg.sk-knower.com/acgsk.png" height="20" width="20" style="left: 0px;"></ccc><span class="wosl" style="background-color: rgb(42, 96, 230);padding: 8px 5px 8px 5px;">在SKLive觀看直播</span></button></dd>');
                }
              }, 1000);
              //updatecheck
              $(".chat-input > div > div:first").prepend('<span id="pastebtn"><button id="pastephoto" data-name="photo" type="button" class="sk_botton sktoptag quikelink sktopappend" style="left: 0px;">圖片</button><button type="button" class="sk_botton sktoptag quikelink sktopappend" data-name="video" style="left: 32px;">影片</button><button type="button" class="sk_botton sktoptag quikelink sktopappend" data-name="pid" style="left: 64px;">Pixiv</button><a type="button" class="sk_botton sktoptag quikelink" onclick="opennews();"  style="right: 0px;width: auto;">SKLive更新資訊</a></span>');
              $(".OsGMV").css({ "padding-top": "15px" });
              $(".quikelink").on("mouseenter", function () {
                $(this).css({ "top": "-23px", "height": "23px" });
              });
              $(".quikelink").on("mouseleave", function () {
                $(this).css({ "top": "-17px", "height": "17px" });
              });


              /////////////////////////////////////////////////
              var str1 = window.location.pathname;
              var str2 = "/popout/";
              var str3 = "/embed/";
              var str4 = "/moderator/";
              var str5 = "/stream-manager";
              if (str1.indexOf(str2) != -1 || str1.indexOf(str3) != -1) {
                var channelid = str1.replace("/popout/", '').replace("/embed/", '').replace("/chat", '');
              } else if (str1.indexOf(str4) != -1) {
                var channelid = str1.replace('/moderator/', '');
              } else if ($("a[data-a-target='watch-mode-to-home']").length == "1") {
                var channelid = $("a[data-a-target='watch-mode-to-home']").attr('href').replace('/', '');
              }else if(str1.indexOf(str5) != -1){
                var idset = str1.split("/");
                dashboardspecial=idset[2];
                var channelid = idset[2];
              }else {
                var channelid = $('.tw-tab-item').attr('href').replace('/', '').replace('/videos/all', '').replace('/videos', '').replace('/', '');
              }
              console.log('本台id'+channelid);
              var bcontent = document.createElement("div");
              bcontent.id = "chat_bg";
              bcontent.style.zIndex = "auto";
              $(".chat-list--default").prepend(bcontent);
              load_chatbg(channelid);

              /////////////////////////////////////////


              $.getJSON("https://sk-knower.com/sklive_api/read/skchat_set.php?showset=public", function (setarray) {
                $.each(setarray.set, function (index, list) {
                  if (list.image != '') {
                    $("#emo-select").append('<div class="emo-select-channel" data-name="'+list.name+'" style="background-image: url('+list.image+');"></div>');
                    $("#sk_icon_set").append('<div id="'+list.name+'" class="tags_select" style="display:none;"></div>');
                  } else {
                    $("#emo-select").append('<div class="emo-select-channel" data-name="'+list.name+'">'+list.dis+'</div>');
                    $("#sk_icon_set").append('<div id="'+list.name+'" class="tags_select" style="display:none;"></div>');
                  }
                  if(list.about!=''){
                    if(list.action!=''){
                      var setaction = '<a href="'+list.url+'" target="_blank"><div class="aboutsetaction">'+list.action+'</div></a>';
                    }
                    $("#"+list.name).append('<div class="aboutset"><div style="width: 100%;padding: 2px 0px;">'+list.about+'</div>'+setaction+'</div>');
                    }
                  loadset(list.name)
                });
              });

              function loadset(iconset) {
                $.getJSON("https://sk-knower.com/sklive_api/read/skchat_icon.php?set="+iconset, function (iconarray) {
                  $.each(iconarray[iconset], function (index, list) {
                    if (list.id != '') {
                      var dis = list.dis;
                      var alt = list.alt;
                      var src = list.src;
                      if (dis == '') {
                        var dis = list.alt;
                      }
                      if(src){
                        $("#"+iconset).append("<div class='skchaticon sk_icon' alt='"+alt+"'><img class='sk_icon_show' src='"+src+"' alt='"+alt+"' title='"+dis+"' original-title='"+dis+"'></div>");
                      }else{
                        $("#"+iconset).append("<div class='skchaticon sk_icon sk_emoticon' alt='"+alt+"'>"+dis+"</div>"); 
                      }
                    }
                  });
                });
              }

              $.getJSON("https://live.sk-knower.com/lib/iconjsonp.php?channel="+channelid+"&callback=?", function (icon) {
                if (typeof icon === "undefined") {
                  $("#channeldata").append("你也可以為自己的頻道增加自訂GIF!</br>來SKLive Dashboard新增你的自訂貼圖吧!<div style='text-align: center;'><img src='https://images2.imgbox.com/96/c2/1h3xWzqS_o.jpg' height='110' style='left: 0px;'></div>如何新增本台自訂貼圖:<div style='margin-left:13px;    font-size: 12px;line-height: 15px;'>1. 登入SKLive Dashboard <a href='https://live.sk-knower.com/dashboard/new/emoticon' target='_blank' style='color: #ffffff;'>live.sk-knower.com/dashboard</a> </br>2. 連動你的Twitch帳號</br>3. 進入聊天室自訂表情, 照指示貼上你自備的圖片網址</br>4. F5你的Twitch聊天室就可以使用貼圖</br>你也可以製作本台專用的表情給觀眾使用!</div><div style='font-size: 12px;;'>更多資料可以來SKLive <a href='https://discord.gg/XdvKzXe2K8' target='_blank' style='color: #2B60E6;text-shadow: -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF;'> Discord</a><div style='float: right;' id='vote_userid'></div></div>");
                } else {
                  allusericon = icon.length;
                  $.each(icon, function (i, item) {
                    $("#usericonset").append("<div class='skchaticon sk_icon' alt='"+icon[i].alt+"'><img id='b"+icon[i].alt+"' class='sk_icon_show' src='"+icon[i].src+"' style='max-height:40px;' alt='"+icon[i].alt+"' original-title='"+icon[i].alt+"'></div>");
                  });
                  $("#s12").css("display", "initial");

                  $.getJSON("https://live.sk-knower.com/lib/chat_level.php?channel="+channelid+"&callback=?", function (expbar) {
                    if (expbar) {
                      var level = Math.sqrt(expbar / 10);
                      yourlevel = Math.floor(level);
                      if (level < 0) {
                        yourlevel = 0;
                      }
                      if (yourlevel < 25) {
                        var nowlevelexp = (yourlevel) * (yourlevel) * 10;
                        var nextlevelexp = (yourlevel+1) * (yourlevel+1) * 10;
                        var thislevelneed = nextlevelexp - nowlevelexp;
                        var thislevelhave = expbar - nowlevelexp;
                        var yourexp = thislevelhave / thislevelneed * 100;
                      } else {
                        var level = Math.sqrt(expbar / 20);
                        yourlevel = Math.floor(level);
                        if (expbar < 13520) {
                          yourlevel = 25;
                          var thislevelneed = 7270;
                          var thislevelhave = expbar - 6250;
                          var yourexp = thislevelhave / thislevelneed * 100;
                        } else {
                          var nextlevelexp = (yourlevel+1) * (yourlevel+1) * 20;
                          var nowlevelexp = (yourlevel) * (yourlevel) * 20;
                          var thislevelneed = nextlevelexp - nowlevelexp;
                          var thislevelhave = expbar - nowlevelexp;
                          var yourexp = thislevelhave / thislevelneed * 100;
                        }
                      }
                      $("#channeldata").append("台主新增/修改自訂表情請登入: <a href='https://live.sk-knower.com/dashboard/new/emoticon' target='_blank' style='color: #ffffff;'>SKLive Dashboard</a></br>使用SKChat: <a href='https://sk-knower.com/"+channelid+"' target='_blank' style='color: #ffffff;'>https://sk-knower.com/"+channelid+"</a></br>以下SKLive表情由本台台主上載,只限本聊天室使用");
                    } else {
                      $("#channeldata").append("台主新增/修改自訂表情請登入: <a href='https://live.sk-knower.com/dashboard/new/emoticon' target='_blank' style='color: #ffffff;'>SKLive Dashboard</a></br>使用SKChat: <a href='https://sk-knower.com/"+channelid+"' target='_blank' style='color: #ffffff;'>https://sk-knower.com/"+channelid+"</a></br>以下SKLive表情由本台台主上載,只限本聊天室使用");
                    }
                  });
                }
              });


              var foreverloop = function () {
                emoloop = [];
                $.getJSON("https://sk-knower.com/sklive_api/read/skchat_set.php?showset=public", function (setarray) {
                  $.each(setarray.set, function (index, list) {
                    $.getJSON("https://sk-knower.com/sklive_api/read/skchat_icon.php?set="+list.name, function (iconarray) {
                      emoloop.push(iconarray[list.name]);
                    });
                  });
                  $.getJSON("https://live.sk-knower.com/lib/iconjsonp.php?channel="+channelid+"&callback=?", function (uicon) {
                    if (typeof uicon === "undefined") {
                      var uicon = [
                        {
                          "code": /sk_sklogo/gi,
                          "src": "https://live.sk-knower.com/flag/sklive.png",
                          "width": 50,
                          "height": 50,
                          "alt": "sk_sklogo",
                          "isRegex": true
                        }
                      ];
                    }
                    (function updateCounter() {
                      if ($(".chat-line__status")[0]) {
                        if ($(".addedsklink")[0]) {
                        } else {
                          $(".chat-line__status").append(' <button type="button" onclick="gousersk();" original-title="在SKLive大屏幕觀看!" class="sk_botton addedsklink" style="width: auto;position: inherit !important;display: inline !important;opacity: inherit !important;margin: 0PX;line-height: 20px;padding: 5px 0px 5px 5px;border-radius: 5px;background: #0089ff;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><ccc style="margin-right: 5px;"><img src="http://acg.sk-knower.com/acgsk.png" height="20" width="20" style="left: 0px;"></ccc><span class="wosl" style="background-color: rgb(42, 96, 230);color: white;padding: 8px 5px 8px 5px;">在SKLive觀看直播</span></button>');
                        }
                      }
                      $(".chat-line__message:not(.skClass)").each(function (index) {
                        $(this).addClass("skClass");
                        $("span[data-a-target='chat-message-text']:not(.skactive)").each(function (index) {
                          $(this).addClass("skactive");
                          var a = $(this).text();
                          var result = $(this).html();
                          if (a == '!setbg') {
                            load_chatbg(channelid);
                          }
                          var setimg = localStorage.getItem("setimg");
                          if (setimg != 'off') {
                            if ($(this).text().match(/\[s\]/g)) {
                              var b = $(this).next("a").attr('href');
                              var type = 'normal';
                              if (typeof b == 'undefined') {
                                var b = $(this).text().match(/\[s\](.*)\[e\]/);
                                if (b !== null) {
                                  var b = b[1];
                                }
                                var type = 'oldver';
                              } else {
                                var b = b.replace('[', '')
                              }
                              $(this).next("a").css("display", "none");
                              if (b) {
                                if (b.match(/youtu/g) && !b.match(/img/g) && !b.match(/jpg/g)) {
                                  if (b.match(/watch?/g)) {
                                    v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                  } else {
                                    v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                    var t = getParameterByName('t', url);
                                  }
                                  var e = '<iframe width="300" height="150" src="https://www.youtube.com/embed/'+v+'" frameborder="0" allowfullscreen></iframe>';
                                } else if (b.match(/steampowered/g) || b.match(/steamcommunity/g)) {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  burl = b.match("app/([0-9]+)");
                                  if (burl) {
                                    var e = '<iframe id="'+number+'" width="100%" height="190px" src="https://store.steampowered.com/widget/'+burl[1]+'" frameborder="0" allowfullscreen></iframe><a href="steam://store/'+burl[1]+'" target="_blank"><div style="color: #d2efa9;text-shadow: 1px 1px 2px rgba( 0, 0, 0, 0.3 );text-align: center;padding: 0px 11px;line-height: 34px;border-radius: 2px;text-transform: unset;background: #75b022;">以Steam程式查看商店頁面</div></a>';
                                  } else {
                                    var e = '<a href="'+b+'" target="_blank">[SK-Live]錯誤steam網址</a>';
                                  }
                                } else if (b.match(/static-cdn.jtvnw.net/g)) {
                                  var e = '<a href="'+b+'" target="_blank">[SK-Live]此域名限制圖片外連</a>';
                                } else if (b.match(/.webm$/g) || b.match(/.mp4$/g) || b.match(/.webm\?/g) || b.match(/.mp4\?/g)) {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  var e = '<video id="'+number+'" onclick="vodgif('+number+');" autoplay="true" loop="true" playsinline="true" muted="true"  style="max-height: 200px;  max-width: 250px;" src="'+b+'"></video>';
                                } else {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  var e = '<a href="'+b+'" target="_blank"><img id="'+number+'" alt="[s]'+b+'[e]" src="'+b.replace('gifv', 'gif')+'" style="max-height: 200px;  max-width: 250px;  vertical-align: text-top;"/></a>';
                                }
                                if (type == 'oldver') {
                                  var result = result.replace(/\[s](.*)\[e]/, e);
                                } else {
                                  var result = result.replace("[s]", e);
                                }
                                if ($(this).next("a").next("span").text().match(/e\]/g)) {
                                  $(this).next("a").next("span").html($(this).next("a").next("span").html().replace("e]", '').replace("[", ''));
                                }
                              }
                            }

                            if ($(this).text().match(/\[img\]/g)) {
                              var b = $(this).next("a").attr('href');
                              var type = 'normal';
                              if (typeof b == 'undefined') {
                                var b = $(this).text().match("[img](.*)[/img]");
                                var b = b[1].replace(']', '').replace('[', '');
                                var type = 'oldver';
                              } else {
                                var b = b.replace('[', '')
                              }
                              $(this).next("a").css("display", "none");
                              if (b) {
                                if (b.match(/youtu/g) && !b.match(/img/g) && !b.match(/jpg/g)) {
                                  if (b.match(/watch?/g)) {
                                    v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                  } else {
                                    v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                    var t = getParameterByName('t', url);
                                  }
                                  var e = '<iframe width="300" height="150" src="https://www.youtube.com/embed/'+v+'" frameborder="0" allowfullscreen></iframe>';
                                } else if (b.match(/steampowered/g) || b.match(/steamcommunity/g)) {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  burl = b.match("app/([0-9]+)");
                                  if (burl) {
                                    var e = '<iframe id="'+number+'" width="100%" height="190px" src="https://store.steampowered.com/widget/'+burl[1]+'" frameborder="0" allowfullscreen></iframe><a href="steam://store/'+burl[1]+'" target="_blank"><div style="color: #d2efa9;text-shadow: 1px 1px 2px rgba( 0, 0, 0, 0.3 );text-align: center;padding: 0px 11px;line-height: 34px;border-radius: 2px;text-transform: unset;background: #75b022;">以Steam程式查看商店頁面</div></a>';
                                  } else {
                                    var e = '<a href="'+b+'" target="_blank">[SK-Live]錯誤steam網址</a>';
                                  }
                                } else if (b.match(/static-cdn.jtvnw.net/g)) {
                                  var e = '<a href="'+b+'" target="_blank">[SK-Live]此域名限制圖片外連</a>';
                                } else if (b.match(/.webm/g) || b.match(/.mp4/g)) {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  var e = '<video id="'+number+'" onclick="vodgif('+number+');" autoplay="true" loop="true" playsinline="true" muted="true"  style="max-height: 200px;  max-width: 250px;" src="'+b+'"></video>';
                                } else {
                                  var number = Math.floor((Math.random() * 100000)+1);
                                  var e = '<a href="'+b+'" target="_blank"><img id="'+number+'" alt="[s]'+b+'[e]" src="'+b.replace('gifv', 'gif')+'" style="max-height: 200px;  max-width: 250px;  vertical-align: text-top;"/></a>';
                                }
                                if (type == 'oldver') {
                                  var result = result.replace("[img]"+b+"[/img]", e);
                                } else {
                                  var result = result.replace("[img]", e);
                                }
                                if ($(this).next("a").next("span").text().match(/\/img\]/g)) {
                                  $(this).next("a").next("span").html($(this).next("a").next("span").html().replace("/img]", '').replace("[", ''));
                                }
                              }
                            }
                          }
                          if ($(this).text().match(/\[p\]/g)) {
                            var start = $(this).text().indexOf('[p]');
                            var end = $(this).text().indexOf('i]');
                            var eend = $(this).html().indexOf('[i]');
                            if (end > start && end >= 0 && start >= 0) {
                              var b = $(this).text().substring(start, end); // contents between #start# and #end#
                              var c = $(this).text().substring(0, start); // w/e before #start#
                              var d = $(this).html().substring(eend+3).replace('[i]', '');  // w/e after #end#
                              b = b.replace('[p]', '').replace('[', '').replace(/ /g, '').replace(/[\r\n]/g, "").replace('http://www.pixiv.net/member_illust.php?mode=medium&illust_id=', '');
                              if (b == '' || b == 'P網id') {
                                b = '52402701';
                              }
                              if (d.match(/18+/g)) {
                                var e = '<span class="mention-fragment--sender"><a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+b+'" target="_blank" style="color: #FFFFFF;background-color: #000;">18+ pixiv id='+b+'</a></span>';
                              } else {
                                var plink = localStorage.getItem("plink");
                                if (d.match(/show/g) || plink != 'off') {
                                  var number = Math.floor((Math.random() * 1000)+1);
                                  e = '<a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+b+'" target="_blank"><img id="'+number+'" alt="[p]'+b+'[i]" src="http://embed.pixiv.net/decorate.php?illust_id='+b+'" style="max-height: 200px;  max-width: 250px;vertical-align: text-bottom;"/></a>';
                                } else {
                                  var e = '<span class="mention-fragment--sender"><a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+b+'" target="_blank">pixiv id='+b+'</a></span>';
                                }
                              }
                              a = c+e+d; // result

                              var result = a;
                              $('#'+number).load(function () {
                                scroller();
                              });
                              console.log(e);
                            }
                          }


                          if (result.match(/\[r\]/g)) {
                            var replaymessage = result.match("[r](.*)[m]")
                            var restmessage = result.match("[m](.*)");
                            if (replaymessage[1]) {
                              var b = replaymessage[1].replace(']', '').replace('[', '').split(",");
                              if (b[1]) {
                                var e = '<span class="mention-fragment--sender" style="font-size: 10px;">SKChat引用:'+b[0]+'</span> ';
                              }
                              var result = e+restmessage[1].replace(']', '');
                            }
                          }


                          if ($(this).text().match(/\[y\]/g)) {
                            var b = $(this).next("a").attr('href');
                            if (typeof b != 'undefined') {
                              var b = b.replace('[', '')
                            }
                            $(this).next("a").css("display", "none");
                            var setimg = localStorage.getItem("setimg");
                            if (b && setimg != 'off') {
                              if (b.match(/youtu/g) && !b.match(/img/g) && !b.match(/jpg/g)) {
                                if (b.match(/watch?/g)) {
                                  v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                } else {
                                  v = b.replace('https://www.youtube.com/watch?v=', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/embed/', '').replace('&feature=youtu.be', '').replace('https://www.youtube.com/shorts/', '').replace('https://youtube.com/shorts/', '');
                                  var t = getParameterByName('t', url);
                                }
                                var e = '<iframe width="300" height="150" src="https://www.youtube.com/embed/'+v+'" frameborder="0" allowfullscreen></iframe>';
                              } else if (b.match(/facebook/g)) {
                                var fbvideoid = b.match("videos/(.*?)/");
                                if (fbvideoid !== null) {
                                  var fbvideoid = fbvideoid[1];
                                } else {
                                  var fbvideoid = '';
                                }
                                console.log(fbvideoid);
                                var e = '<div><div style="padding: 5px;background: rgba(0, 0, 0, 0.45098039215686275);color: white;border-radius: 5px 5px 0px 0px;">Facebook <i class="facebookclosevideo material-icons" data-fbid="'+fbvideoid+'" class="material-icons" style="cursor:pointer;font-size: 20px;float: right;" >close</i> </div><div style="min-width: 250px;text-align: center;line-height: 200px;height: 200px;box-shadow: none;color: white;position: relative;overflow: hidden;background: black;cursor: pointer;" data-fbid="'+b+'" class="facebookvideo '+fbvideoid+'"><div style="Background-image: url(https://graph.facebook.com/'+fbvideoid+'/picture);position: absolute;color: white;z-index: 0;width: 100%;height: 100%;opacity: 0.5;background-size: contain;background-repeat: no-repeat;background-position: center;"></div><div>播放</div></div></div>';
                              } else if (b.match(/twitter/g)) {
                                var e = '<blockquote class="twitter-video" data-lang="zh-tw"><a href="'+b+'"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
                              } else if (b.match(/static-cdn.jtvnw.net/g)) {
                                var e = '<a href="'+b+'" target="_blank">[SK-Live]此域名限制圖片外連</a>';
                              } else if (b.match(/.webm/g) || b.match(/.mp4/g)) {
                                var number = Math.floor((Math.random() * 100000)+1);
                                var e = '<video id="'+number+'" onclick="vodgif('+number+');" autoplay="true" loop="true" playsinline="true" muted="true" style="max-height: 200px;  max-width: 250px;" src="'+b+'"></video>';
                              } else {
                                var number = Math.floor((Math.random() * 100000)+1);
                                var e = '<a href="'+b+'" target="_blank"><img id="'+number+'" alt="[s]'+b+'[e]" src="'+b.replace('gifv', 'gif')+'" style="max-height: 200px;  max-width: 250px;  vertical-align: text-top;"/></a>';
                              }
                              var result = result.replace("[y]", e);
                              if ($(this).next("a").next("span").text().match(/t\]/g)) {
                                $(this).next("a").next("span").html($(this).next("a").next("span").html().replace("t]", '').replace("[", ''));
                              }
                            }
                          };


                          var split_source = result.split(" ");
                          $.each(split_source, function (ix, eachsplit) {
                            if (eachsplit.length > 1) {
                              $.each(emoloop, function (i, item) {
                                $.each(item, function (i, item) {
                                  if(item.height!=0){
                                  var aregex = new RegExp("^"+item.code+"$", "gi");
                                  if (eachsplit.match(aregex)) {
                                    split_source[ix] = "<img class='skicon' src='"+item.src+"' height='"+item.height+"' alt='"+item.alt+"'></img>";
                                  }
                                 }
                                });
                              });
                              $.each(uicon, function (i, item) {
                                var aregex = new RegExp("^"+item.alt+"$", "gi");
                                if (eachsplit.match(aregex)) {
                                  split_source[ix] = "<img class='skicon' src='"+item.src+"' height='"+item.height+"' alt='"+item.alt+"'></img>";
                                }
                              });
                            }
                          });
                          result = split_source.join(" ");

                          $(this).html(result);
                          scroller();
                          setTimeout("scroller()", 1000);
                        });
                        scroller();
                      });
                      if ($('#pastephoto').length == "0") {
                        setTimeout(function () {
                          //console.log('404 chatroom not found:'+counterror);
                          counterror++;
                          waitForElement();
                        }, 3000);
                      } else {
                        var nowtitle = window.location.pathname+$('.room-selector__header').text();
                        if (thistitle == nowtitle) {
                          setTimeout(updateCounter, 0);
                        } else {
                          console.log('(`・ω・´)Change');
                          if (document.getElementById('sk_chat_bg') == null) {
                            setTimeout(function () {
                              //console.log('404 chatroom not found:'+counterror);
                              counterror++;
                              waitForElement();
                            }, 3000);
                          } else {


                            function showpanel() {
                              if (document.getElementById('sk_chat_bg') == null) {
                                setTimeout(function () {
                                  //console.log('404 chatroom not found:'+counterror);
                                  counterror++;
                                  waitForElement();
                                }, 3000);
                              } else {
                                thistitle = window.location.pathname+$('.room-selector__header').text();
                                setTimeout(updateCounter, 0);
                              }
                            }

                            setTimeout(showpanel, 1000)
                          }
                        }
                      }
                    })();
                  });
                }, true);
              }
              foreverloop();

              if (foreverloop == false) {
                foreverloop();
              }




              function getId(id) {
                return document.getElementById(id)
              };

              function dragPrototype(dragControl, dragContent) {
                var _x = 0, _y = 0, _drag = false, cw, ch, sw, sh;
                var dragContent = typeof dragContent == "undefined" ? dragControl : dragContent;

                getId(dragControl).onmousedown = function (e) {
                  _drag = true;

                  e = window.event ? window.event : e;
                  cw = document.documentElement.clientWidth;
                  ch = document.documentElement.clientHeight;
                  sw = parseInt(getId(dragContent).offsetWidth);
                  sh = parseInt(getId(dragContent).offsetHeight);

                  _x = e.clientX - getId(dragContent).offsetLeft;
                  _y = e.clientY - getId(dragContent).offsetTop;

                  document.onmousemove = function (e) {
                    if (_drag) {
                      e = window.event ? window.event : e;
                      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                      document.body.setCapture && getId(dragContent).setCapture();

                      var x = e.clientX - _x;
                      var y = e.clientY - _y;

                      var myElem = document.getElementById('ember1131');
                      if (myElem == null) {
                        x = x < -250 ? x = -250 : x < (cw - sw+250) ? x : (cw - sw+250);
                        y = y < 0 ? y = 0 : y < (ch - sh+100) ? y : (ch - sh+100);
                      } else {
                        x = x < -99999 ? x = -99999 : x < (cw - sw+250) ? x : (cw - sw+250);
                        y = y < -99999 ? y = -99999 : y < (ch - sh+100) ? y : (ch - sh+100);
                      }
                      getId(dragContent).style.left = x+"px";
                      getId(dragContent).style.top = y+"px";
                    }
                    ;
                  };

                  document.onmouseup = function () {
                    _drag = false;
                    document.body.releaseCapture && getId(dragContent).releaseCapture();
                  };
                };
              }

              dragPrototype("a", "sk_icon_set");
              dragPrototype("c", "sk_news");

              var skupdate = localStorage.getItem("skupdate24");
              $.getJSON("https://live.sk-knower.com/setcookies.php", function () {
              });
              if (skupdate == null) {
                $("#sk_news").show();
              }
            }

            var mybody = document.getElementsByTagName("body");
            if (document.getElementById('channel') == null) {
              document.body.appendChild(news);
              $.when(document.body.appendChild(content2)).then(function2());
            } else {
              setTimeout(function () {
                var mes = document.getElementsByClassName('chat-container js-chat-container');
                [].slice.call(mes).forEach(function (skttv_emo) {
                  skttv_emo.id = 'sk_ttv_emo';
                });
                var skemo = document.getElementById("sk_ttv_emo");
                skemo.appendChild(content2);
                skemo.appendChild(news);
                $('[data-target="channel-header-right"]').append('<dd id="watchonsklive" class="cn-tabs__button" style="padding-left: 5px;"><button type="button" onclick="gousersk();" original-title="在SKLive大屏幕觀看!" class="sk_botton" style="position: inherit !important;display: inline !important;opacity: inherit !important;margin: 0PX;line-height: 20px;padding: 5px 0px 5px 5px;border-radius: 5px;background: #0089ff;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"><ccc style="margin-right: 5px;"><img src="http://acg.sk-knower.com/acgsk.png" height="20" width="20" style="left: 0px;"></ccc><span class="wosl" style="background-color: rgb(42, 96, 230);padding: 8px 5px 8px 5px;">在SKLive觀看直播</span></button></dd>');
                function2();
              }, 2000);
            }


            //first load

            var sktext = localStorage.getItem("sktext");
            if(sktext){
              $("<style id='sktext'>.chat-line__message{font-size:"+sktext+"px !important;.chat-line__timestamp{font-size:"+sktext+"px !important;}</style>").appendTo("head");
              $("#fontrange").val(sktext);
              $("#textbox1").val(sktext);
            }

            var sk2bold = localStorage.getItem("sk2bold");
            if (sk2bold != 'true') {
              $("#boldoff").css("border-bottom", "4px solid #FFFFFF");
            } else {
              setbold();
            }
            var whiteborder = localStorage.getItem("dark2words");
            if (whiteborder != 'true') {
              $("#darkwordsoff").css("border-bottom", "4px solid #FFFFFF");
            } else {
              dark2words();
            }
            var setimg = localStorage.getItem("setimg");
            if (setimg != 'off') {
              $("#imgtag").css("border-bottom", "4px solid #FFFFFF");
              $("#imgtagoff").css("border-bottom", "");
            } else {
              $("#imgtagoff").css("border-bottom", "4px solid #FFFFFF");
              $("#imgtag").css("border-bottom", "");
            }
            var plink = localStorage.getItem("plink");
            if (plink != 'off') {
              $("#plinkon").css("border-bottom", "4px solid #FFFFFF");
              $("#plinkoff").css("border-bottom", "");
            } else {
              $("#plinkoff").css("border-bottom", "4px solid #FFFFFF");
              $("#plinkon").css("border-bottom", "");
            }


            $(function () {
              if ('415' > $(this).height()) {
                $("#sk_icon_set").css({
                  "height": '220',
                });
                $(".tags_select").css({
                  "height": '142',
                });
              } else {
                $("#sk_icon_set").css({
                  "height": '380',
                });
                $(".tags_select").css({
                  "height": '300',
                });
              }
              $(window).resize(function () {
                if ('415' > $(this).height()) {
                  $("#sk_icon_set").css({
                    "height": '225',
                  });
                  $(".tags_select").css({
                    "height": '142',
                  });
                } else {
                  $("#sk_icon_set").css({
                    "height": '380',
                  });
                  $(".tags_select").css({
                    "height": '300',
                  });
                }

              });
            });
          } else {
            setTimeout(function () {
              //console.log('404 chatroom not found:'+counterror);
              counterror++;
              waitForElement();
            }, 3000);
          }
        }
      }

      waitForElement();


    }
  };
}
commandcd = '';
setInterval(function () {
  commandcd++;
}, 1000);




function vodgif(id) { document.getElementById(id).paused ? document.getElementById(id).play() : document.getElementById(id).pause(); }

String.prototype.cleanup = function () {
  return this.toLowerCase().replace(/[^a-zA-Z0-9_]+/g, "");
}


function closees() {
  document.getElementById("sk_icon_set").className = "skicon_off";
}


function newsclosees() {
  $("#sk_news").css("display", "none");
  setnewsread();
}

function setnewsread() {
  localStorage.setItem("skupdate24", "get");
}

function opennews() {
  $("#sk_news").show();
}

function setword() {
  var sktext = document.getElementById("textbox1").value;
  localStorage.setItem("sktext", sktext);
  if (document.contains(document.getElementById("sktext"))) {
    document.getElementById("sktext").remove();
  }
  $("<style id='sktext'>.chat-line__message{font-size:"+sktext+"px !important;.chat-line__timestamp{font-size:"+sktext+"px !important;}</style>").appendTo("head");
}

function deleteword() {
  localStorage.removeItem('sktext');
  document.getElementById("sktext").remove();
}




function setbold() {
  var style = document.createElement('style');
  style.id = 'setbold'
  style.innerHTML = '.skClass {font-weight: bold;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  localStorage.setItem("sk2bold", "true");
  $("#boldon").css("border-bottom", "4px solid #FFFFFF");
  $("#boldoff").css("border-bottom", "");
}

function sknobold() {
  document.getElementById("setbold").remove();
  localStorage.removeItem('sk2bold');
  $("#boldoff").css("border-bottom", "4px solid #FFFFFF");
  $("#boldon").css("border-bottom", "");
}


function cleanmychat() {
  $('.chat-scrollable-area__message-container>.skClass').remove();
}

function dark2words() {
  var style = document.createElement('style');
  style.id = 'namneborder'
  style.innerHTML = '.chat-author__display-name, .chat-author__intl-login{text-shadow: -1px -1px 0 #FFFFFF, 1px -1px 0 #FFFFFF, -1px 1px 0 #FFFFFF, 1px 1px 0 #FFFFFF;}';
  document.getElementsByTagName('head')[0].appendChild(style);
  localStorage.setItem("dark2words", "true");
  $("#darkwordson").css("border-bottom", "4px solid #FFFFFF");
  $("#darkwordsoff").css("border-bottom", "");
}

function setnodark2words() {
  document.getElementById("namneborder").remove();
  localStorage.setItem("dark2words", "");
  $("#darkwordsoff").css("border-bottom", "4px solid #FFFFFF");
  $("#darkwordson").css("border-bottom", "");
}

function updateTextInput(val) {
  document.getElementById('textbox1').value = val;
}

function updateskiconTextInput(val) {
  document.getElementById('textbox1skicon').value = val;
}

function imgtag() {
  localStorage.setItem("setimg", "");
  $("#imgtag").css("border-bottom", "4px solid #FFFFFF");
  $("#imgtagoff").css("border-bottom", "");
}

function imgtagoff() {
  localStorage.setItem("setimg", "off");
  $("#imgtagoff").css("border-bottom", "4px solid #FFFFFF");
  $("#imgtag").css("border-bottom", "");
}

function plinkon() {
  localStorage.setItem("plink", "on");
  $("#plinkon").css("border-bottom", "4px solid #FFFFFF");
  $("#plinkoff").css("border-bottom", "");
}

function plinkoff() {
  localStorage.setItem("plink", "off");
  $("#plinkoff").css("border-bottom", "4px solid #FFFFFF");
  $("#plinkon").css("border-bottom", "");
}

function gousersk() {
  var str1 = window.location.pathname;
  var str2 = "/popout/";
  var str3 = "/embed/";
  var str5 = "/stream-manager";
  if (str1.indexOf(str2) != -1 || str1.indexOf(str3) != -1) {
    var channelid = str1.replace("/popout/", '').replace("/embed/", '').replace("/chat", '');
  } else if ($("a[data-a-target='watch-mode-to-home']").length == "1") {
    var channelid = $("a[data-a-target='watch-mode-to-home']").attr('href').replace('/', '');
  }else if(str1.indexOf(str5) != -1){
    var idset = str1.split("/");
    dashboardspecial=idset[2];
    var channelid = idset[2];
  } else {
    var channelid = $('.tw-tab-item').attr('href').replace('/', '').replace('/videos/all', '').replace('/videos', '').replace('/', '');
  }
  window.location.href = "http://sk-knower.com/twitch/"+channelid;
}




function scroller() {
  var $chatScrollContent = $("div[data-a-target='chat-scroller']>.simplebar-scroll-content");
  var $chatContent = $("div[data-a-target='chat-scroller']>.simplebar-scroll-content>.simplebar-content");
  var scrollBottom = $chatContent.height() - $chatScrollContent.scrollTop() - $chatScrollContent.height();
  if (scrollBottom < '200') {
    $chatScrollContent.scrollTop(999999);
    $(".more-messages-indicator").click();
    //console.log('啟動( ´-ω ･)▄︻┻┳══━');
    gpaneldata();
  }
}


function gpaneldata() {
  if (sentpaneldata != 'true') {
    var str1 = window.location.pathname;
    var str2 = "/popout/";
    var str3 = "/embed/";
    var str4 = "/moderator/";
    var str5 = "/stream-manager";
    if (str1.indexOf(str2) != -1 || str1.indexOf(str3) != -1) {
      var channelid = str1.replace("/popout/", '').replace("/embed/", '').replace("/chat", '');
    } else if (str1.indexOf(str4) != -1) {
      var channelid = str1.replace('/moderator/', '');
    } else if ($("a[data-a-target='watch-mode-to-home']").length == "1") {
      var channelid = $("a[data-a-target='watch-mode-to-home']").attr('href').replace('/', '');
    }else if(str1.indexOf(str5) != -1){
      var idset = str1.split("/");
      dashboardspecial=idset[2];
      var channelid = idset[2];
    } else {
      var channelid = $('.tw-tab-item').attr('href').replace('/', '').replace('/videos/all', '').replace('/videos', '').replace('/', '');
    }
    channelid = channelid;
    paneldata = "";
    $(".channel-panels-container > div").each(function (index) {
      var data = $(this).html();
      if ($(this).html().indexOf("extension_panel_selector") == -1) {
        paneldata += "<div class='part1'>"+data+"</div>";
      }
    });
    if (paneldata != "") {
      $.post("//sk-knower.com/twitch_api/paneldata.php?id="+channelid, {
        paneldata: paneldata,
      });
      sentpaneldata = "true";
    }
  }
}

//BetterTTV!
function getChatInput(element = null) {
  let chatInput;
  try {
    chatInput = searchReactParents(
      getReactInstance(element),
      (n) => n.memoizedProps
        && n.memoizedProps.componentType != null
        && n.memoizedProps.value != null
    );
  } catch (_) { }
  return chatInput;
}

function getChatInputEditor(element = null) {
  let chatInputEditor;
  try {
    chatInputEditor = searchReactParents(
      getReactInstance(element),
      (n) => n.stateNode?.state?.slateEditor != null
    );
  } catch (_) { }

  return chatInputEditor?.stateNode;
}

function getReactInstance(element) {
  for (const key in element) {
    if (key.startsWith('__reactInternalInstance$')) {
      return element[key];
    }
  }
  return null;
}

function searchReactParents(node, predicate, maxDepth = 15, depth = 0) {
  try {
    if (predicate(node)) {
      return node;
    }
  } catch (_) { }
  if (!node || depth > maxDepth) {
    return null;
  }
  const { return: parent } = node;
  if (parent) {
    return searchReactParents(parent, predicate, maxDepth, depth+1);
  }
  return null;
}

function updateChatInput(textbox0, text, selectionSart = 0, selectionEnd = 0) {
  var textbox = document.querySelector('div[role="textbox"]');
  var chatInput = getChatInput(textbox);
  var chatInputEditor = getChatInputEditor(textbox);

  
  var currentInputLength = chatInput.memoizedProps.value.length;

  newText = currentInput+text;
  chatInput.memoizedProps.value = newText;
  chatInput.memoizedProps.setInputValue(newText);
  chatInput.memoizedProps.onValueUpdate(newText);

  if (selectionEnd > 0) {
    chatInputEditor.focus();
    chatInputEditor.setSelectionRange(currentInputLength+selectionSart, currentInputLength+selectionEnd);
  } else {
    chatInputEditor.focus();
  }

  return null;
}

var textbox = document.querySelector('div[role="textbox"]');