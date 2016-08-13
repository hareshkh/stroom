function alertLink(title, link, cancelNeeded) {
  if (!link) {
    link = title;
    title = "Give this link to your friend";
  }

  if (!cancelNeeded) {
    cancelNeeded = false;
  }

  swal({
    title: title,
    cancelButtonText: "Copy link",
    showCancelButton: cancelNeeded ? true : false,
    text: link});
}

function alertMessage(msg) {
  swal({   title: "Ping!",   text: msg,   timer: 1400, });
}

function Won() {
  swal({   title: "Congratulations",   text:"You Won",   });
}

function Lost() {
  swal({   title: "You Lost",   text:"Better Luck Next Time!", });
}

function Draw(){
  swal({   title: "Drawn",   text:"Game Ended In Draw", });
}

function Wait(){
  swal({   title: "Waiting For Opposition To Respond",   text:"", });
}

function DrawReject(){
  swal({   title: "Opposition Has Rejected To Draw",   text:"Keep Playing", });
}

function KeepPlaying(){
  swal({   title: "Keep Playing",   text:"", });
}

function white(usr) {
  document.getElementById("whiteArea").innerHTML = usr.toUpperCase();
}

function black(usr) {
  document.getElementById("blackArea").innerHTML = usr.toUpperCase();
}

var left = 0;

function addMove(img,a,b) {
  if(img>=6)
    img = img - 6;
  else
    img = '_'+img;
  if(!left)
    $( "#leftMove" ).append( '<img src = "/util/images/'+img+'.png" style = "width:50px;margin-right:115px;"><div class="arrow_right" style = "float:left;margin-left:20px;">'+a+' '+b+'</div><br><br><br>');
  else
    $( "#leftMove" ).append( '<img src = "/util/images/'+img+'.png" style = "width:50px;margin-left:120px;"><div class="arrow_left" style = "float:right;margin-right:15px;">'+a+' '+b+'</div><br><br><br>');
  left = left^1;
  $.event.trigger('move:append');
}

function addMoveCastle(img,a,b) {
  addMove(img,a, b);
}
window.addEventListener('beforeunload', function(event) {
  alert('I am the 2nd one.');
});
window.addEventListener('unload', function(event) {
  alert('I am the 4th and last one…');
});
