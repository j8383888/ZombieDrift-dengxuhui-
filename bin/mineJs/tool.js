

/**获取URL中的参数值 */
function GetSearchString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return "0";
    }
}

function audio_Go(){
    try{
        wx.onAudioInterruptionEnd(function(){
            manager.TsJsmanager.playMusic();                
        })

        wx.onShow(function () {
           manager.TsJsmanager.playMusic();
        })
    }catch(e){
        console.log("onAudioInterruptionEnd ------------- error!");
    }
}

audio_Go();

/**获取前端的IP地址 */
function getIP() {
    return returnCitySN['cip'];
}