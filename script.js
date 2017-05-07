
var toggleOn = true;
var toggleOff = false;
var toggleClosed = false;

function tglOn() { 
    switch(toggleOn) {

case true:
  $("#displayOn").css("display", "none");
  $("#btnOn").html("Show Online");
toggleOn = false;
break;

case false:
  $("#displayOn").css("display", "inline");
  $("#btnOn").html("Hide Online");
toggleOn = true;
break;
  }
}

function tglOff() { 
    switch(toggleOff) {

case true:
  $("#displayOff").css("display", "none");
  $("#btnOff").html("Show Offline");
toggleOff = false;
break;

case false:
  $("#displayOff").css("display", "inline");
  $("#btnOff").html("Hide Offline");
toggleOff = true;
break;
  }
}

function tglClosed() { 
    switch(toggleClosed) {

case true:
  $("#displayClosed").css("display", "none");
  $("#btnClosed").html("Show Closed");
toggleClosed = false;
break;

case false:
  $("#displayClosed").css("display", "inline");
  $("#btnClosed").html("Hide Closed");
toggleClosed = true;
break;
  }
}

function getNewInfo() {
  $("#displayOn").empty();
  $("#displayOff").empty();
  $("#displayClosed").empty();

getInfo();
}

var channels = ["0ver_zer0", "amoney_tv", "al0t97", "bango_rl", "Chrome", "dappur", "findablecarpet", "friisisch", "gmsxay", "halcyon", "j_knappers", "jacoblol", "jamesbot", "jessie", "jhzer", "johnnyboi_i", "KayDop", "killerno7", "klassux", "kronovi", "Lachinio", "lawler", "lethamyr_rl", "low5ive", "lunatian", "m1k3rules", "marcoostream", "maestro", "markydooda", "memorycodegames", "metsanauris", "miztik", "mognus1", "Moses", "alexmout02", "mye_bipod_4shor", "paschy90", "plutorl", "prem_rl", "pwndxrl", "quinnlobdell", "remkoe", "Rizzo", "sad_junior", "scrubkillarl_", "sebadam2011", "Sizz", "sjon_kanon", "skylinerl", "snaski", "SquishyMuffinz", "timi_f", "tormentrl", "turbopolsa", "turtle", "vogan", "x3mw", "snowarsdash", "zanejackey", "continuumvision", "corruptedg", "rocketleaguecentral", "gibbs0o0", "fireburner", "dogu", "xelmp", "doomsee", "espeon", "fairypeak", "DeevoRL", "uhfreakii", "gambitrl", "garrettg", "rocketleague", "hotwheelssid", "dcarmody32", "subparbutinhd", "rewindrl", "boostlegacy", "nexusgamingrl", "texasrl", "prorivalry", "multiplay_rocket"];


function getInfo() {

  channels.sort(function(a,b){return a.localeCompare(b);});

  channels.forEach(function(channel) {
    function makeURL(type, name) {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    }

    
    $.getJSON(makeURL("channels", channel), function(data) {
      // console.log(data);
      var status;
      var game;

      if (data.hasOwnProperty('error')) {
    var logo = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRL4agDI36Fj4ZHP7_17TWgh8rlMVlh1YLgBGWbHP8amP3MHo-TFMGpHnk",
        name =  channel,
        description = "Account Closed";
        game = "";
        status = "Account Closed";
        html = '<a href="' + 
          data.url + '" target="_blank"><div class="row closed"><div class="col-xs-1 col-sm-1" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-xs-3 col-sm-3" id="name">' + 
          name + '</div><div class="col-xs-8 col-sm-8" id="streaming">'+ 
          game + '<span class="hidden-xs">' + 
          description + '</span></div></div></a>';
        $("#displayClosed").append(html);

      } else {
      status = "offline";
      game = "Offline";
    $.getJSON(makeURL("streams", channel), function(data) {   
      if (data.stream === null) {
        
      } else {
        game = data.stream.game;
        status = "online";
      }
      $.getJSON(makeURL("channels", channel), function(data) {
        var logo = data.logo !== null ? data.logo : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRL4agDI36Fj4ZHP7_17TWgh8rlMVlh1YLgBGWbHP8amP3MHo-TFMGpHnk",
          name = data.display_name !== null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";

          html = '<a href="' + 
          data.url + '" target="_blank"><div class="row ' + 
          status + '"><div class="col-xs-1 col-sm-1" id="icon"><img src="' + 
          logo + '" class="logo"></div><div class="col-xs-3 col-sm-3" id="name">' + 
          name + '</div><div class="col-xs-8 col-sm-8" id="streaming">'+ 
          game + '<span class="hidden-xs">' + 
          description + '</span></div></div></a>';

        status === "online" ? $("#displayOn").append(html) : $("#displayOff").append(html);

      });
    });
   }});
  });
  setTimeout(getNewInfo, 60000);
}

$(document).ready(function() {
  getInfo();

$("#btnOn").click(function() {
tglOn();
});

$("#displayOff").css("display", "none");
$("#btnOff").click(function() {
  tglOff();
  });

$("#displayClosed").css("display", "none");
$("#btnClosed").click(function() {
  tglClosed();
  });




});