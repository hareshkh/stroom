var selectedx=-1;
var selectedy=-1;
var flag=0;
var socket = io();
var color = 0;
var reversed = false;
var render = function () {
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    var i;
    var j;
    var offset=50;

    var offsety = 0;
    var offsetx = 27;
    ctx.drawImage(verImage,0, 0);
    ctx.drawImage(horImage,0+offsetx, 400);
    for(i=0;i<8;i++)
    {
        for(j=0;j<8;j++)
        {
            if(selectedy==i&&selectedx==j)
            {
                if(selectedReady)
                    ctx.drawImage(selectedImage , offset * j+offsetx,offset * i+offsety);
                if(game[i][j]!=-1)
                {   //if(ready[game[i][j]])
                    {
                            ctx.drawImage(img[game[i][j]],offset * j+offsetx, offset * i+offsety);
                    }
                }
            }
            else if((i+j)%2==0)
            {
                if (evenReady)
                    ctx.drawImage(evenImage,offset * j+offsetx,offset * i+offsety);
                //if(i==toY && j==toX)
                //  ctx.drawImage(toImage,offset * j+offsetx, offset * i+offsety);
                if(i===fromY && j==fromX)
                {
                    ctx.globalAlpha = 0.3;
                    if (fromstate!=-1)
                        ctx.drawImage(img[fromstate],offset * j+offsetx, offset * i+offsety);
                    ctx.globalAlpha = 1.0;
                }

                if(check==game[i][j])
                    ctx.drawImage(checkMateImage , offset * j+offsetx,offset * i+offsety);
                if(game[i][j]!=-1)
                {   //if(ready[game[i][j]])
                    {
                        ctx.drawImage(img[game[i][j]],offset * j+offsetx, offset * i+offsety);
                    }
                }
            }
            else
            {

                if(oddReady)
                    ctx.drawImage(oddImage,offset * j+offsetx ,offset * i+offsety);

            //  if(i==toY && j==toX)
            //      ctx.drawImage(toImage,offset * j+offsetx, offset * i+offsety);
                if(i===fromY && j==fromX)
                {
                    ctx.globalAlpha = 0.5;
                    if (fromstate!=-1)
                        ctx.drawImage(img[fromstate],offset * j+offsetx, offset * i+offsety);
                    ctx.globalAlpha = 1.0;
                }
                if(check==game[i][j])
                    ctx.drawImage(checkMateImage , offset * j+offsetx,offset * i+offsety);
                if(game[i][j]!=-1)
                {   //if(ready[game[i][j]])
                    {
                        ctx.drawImage(img[game[i][j]],offset * j+offsetx, offset * i+offsety);
                    }
                }
            }
            if(possible[i][j]==1)
                ctx.drawImage(dotImage,offset * j+offsetx, offset * i+offsety);
        }
    }
};
var fromX = -1;
var fromY = -1;
var toX  = -1;
var toY = -1;
var game;
var check = -3;
var fromstate = -1;
var init = function () {
    game =
    [
        [ 1, 2, 3, 4, 5, 3, 2, 1],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1,-1],
        [ 6, 6, 6, 6, 6, 6, 6, 6],
        [ 7, 8, 9, 10, 11, 9, 8, 7]
    ];
    possible =
    [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ];



    canvas.addEventListener("mousedown", clickDown, false);
}
document.getElementById("drawButton").addEventListener("click", function(){
    socket.emit("drawClicked",true);
});
function clickDown(event)
{
     var x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
     var y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
     x -= canvas.offsetLeft + 27;
     y -= canvas.offsetTop;
     x=x/50;
     y=y/50;
     x=parseInt(x);
     y=parseInt(y);
     if(color==1)
        y = 7-y;
     var a1=[x,y];
     socket.emit ('press',a1);
     //else
     {
     }
     render();
}
function reverseArray(arr)
{
    var gametemp = JSON.parse(JSON.stringify(arr));;
    for(i=0;i<8;i++)
    {
        for(j=0;j<8;j++)
            gametemp[i][j] = arr[7-i][j];
    }
    return gametemp;
}
var temp="&#9812; &#9813; &#9814;";

socket.on('room11',function(val){
    alert(val);
});

 socket.on('validFirstMove',function(index){
    selectedx=index[0];
    selectedy=index[1];
    if(color==1)
        selectedy = 7-selectedy;
    render();
 });
 socket.on('onSecondThoughts',function(index){
    selectedx=-1;
    selectedy=-1;
    render();
 });
 socket.on('validSecondMove',function(index){
    if(color==1)
        index[1] = 7-index[1];
    fromstate = game[selectedy][selectedx];
    addMove(game[selectedy][selectedx],String.fromCharCode(97 + selectedx)+" "+( 7 -selectedy+1),String.fromCharCode(97 + index[0])+" "+(7 - index[1]+1));
    game[selectedy][selectedx]=-1;
    fromX = selectedx;
    fromY = selectedy;
    toX = index[0];
    toY = index[1];
    selectedx=-1;
    selectedy=-1;
    var x=index[0];
    var y=index[1];
    game[y][x]=index[2];
    render();
 });

 socket.on('castle',function(move){
    game[selectedy][selectedx]=-1;
    console.log("castle "+move+"color "+color);
    if((move == 1&&color==0)||(color==1&&move == 3))
    {
      fromX = 4;
      fromY = 0;
      if(color==0)
      {
          game[0][4] = -1;
          game[0][6] = 5;
          game[0][5]=1;
          game[0][7]=-1;
          addMoveCastle(5,"Castle ",String.fromCharCode(97 + selectedx)+" "+(9 -selectedy+1));
          fromstate = 5;
      }
      else
      {
          game[0][4] = -1;
          game[0][6] = 11;
          game[0][5]=7;
          game[0][7]=-1;
          addMoveCastle(11,"Castle ",String.fromCharCode(97 + selectedx)+" "+(9 -selectedy+1));
          fromstate = 11;
      }
    }
    if((move == 2&&color==0)||(move==4&&color==1))
    {

      fromX = 4;
      fromY = 0;
      if(color==0)
      {
          game[0][4] = -1;
          game[0][2] = 5;
          game[0][3]=1;
          game[0][0]=-1;
          addMoveCastle(5,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 5;
      }
      else
      {
          game[0][4] = -1;
          game[0][2] = 11;
          game[0][3]=7;
          game[0][0]=-1;
          addMoveCastle(11,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 11;
      }
    }
    if((move == 3&&color==0)||(move==1&&color==1))
    {
      fromX = 4;
      fromY = 7;
      if(color==0)
      {
          game[7][4] = -1;
          game[7][6] = 11;
          game[7][5]=7;
          game[7][7]=-1;
          addMoveCastle(11,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 11;
      }
      else
      {

          game[7][4] = -1;
          game[7][6] = 5;
          game[7][5]=1;
          game[7][7]=-1;
          addMoveCastle(5,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 5;
      }
    }
    if((move == 4 && color==0)||(move==2&&color==1))
    {
      fromX = 4;
      fromY = 7;
      if(color==0)
      {
          game[7][4] = -1;
          game[7][2] = 11;
          game[7][3]=7;
          game[7][0]=-1;
          addMoveCastle(11,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 11;
      }
      else
      {
          game[7][4] = -1;
          game[7][2] = 5;
          game[7][3]= 1;
          game[7][0]= -1;
          addMoveCastle(5,"Castle ",String.fromCharCode(97 + selectedx)+" "+(7 -selectedy+1));
          fromstate = 5;
      }
    }
    selectedx=-1;
    selectedy=-1;
    render();
 });

 socket.on('wrongMove',function(msg){
    alertMessage (msg);
 });
 socket.on('press', function(index){
    var x=index[0];
    var y=index[1];
    selectedx=index[2];
    selectedy=index[3];
    if(validMove(x,y))///which it always will be
    {
        selectedy=-1;
        selectedx=-1;
        flag=0;
    }
     render();
  });


 socket.on('possibleMoves',function(arr){
    possible=JSON.parse(JSON.stringify(arr));
    if(color==1)
        possible = reverseArray(possible);
    render();
 });


 socket.on('reachedEnd',function(arr){
    if(color==1)
        arr[1] = 7-arr[1];
    game[arr[1]][arr[0]] = arr[2];
    render();
 });

 socket.on('myMessage', function(index){
  });


 socket.on('currentArray', function(arr){
    game = JSON.parse(JSON.stringify(arr));
    if(color==1)
    {
        game = reverseArray(game);
        reversed = true;
    }
    render();
  });

 socket.on('alertLink', function(msg){
    alertLink("Give This Link To Your Friend", msg, true);
    var clipboard = new Clipboard('button.cancel', {
        target: function (trigger) {
            return $(".sweet-alert p:first")[0];
        }
    });

    function selectText(element) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(element);
            window.getSelection().addRange(range);
        }
    }

    clipboard.on('error', function (e) {
        console.log(e);
        console.log('Failed');
        setTimeout(function () {
            alertLink("Copy failed, press Ctrl + C to copy", msg);
            selectText($(".sweet-alert p:first")[0]);
        }, 1000);
    });
  });

 socket.on('won', function(msg){
    Won();
  });
 socket.on('lost', function(msg){
    Lost();
  });
 socket.on('draw', function(msg){
    Draw();
  });
 socket.on('wait', function(msg){
    Wait();
  });
 socket.on('askForDraw', function(msg){
    if (confirm("Opposition has requested for a draw") == true) {
        socket.emit('drawAccepted',true);
    } 
    else {
        socket.emit('drawRejected',false);
    }
 });
 socket.on('drawReject', function(msg){
    DrawReject();
 });
 socket.on('keepPlaying', function(msg){
    KeepPlaying();
 });
 socket.on('white',function(usr){
    white(usr);
 });
 socket.on('black',function(usr){
    black(usr);
    render();
 });
 socket.on('reverse',function(usr){
    console.log("reversed");
    game = reverseArray(game);
    reversed = true;
    color = 1;
    render();
 });

 socket.on('check', function(msg){
    if(msg==0)
        check = 5;
    else
        check = 11;
    render();
  });

 socket.on('noCheck', function(msg){
    check = -3;
  });

 socket.on('players', function(pl){
    white(pl[0]);
    black(pl[1]);
  });


var main = function ()
{
    var now = Date.now();
    var delta = now - then;
    render();
    then = now;
    if(evenReady==false||oddReady==false||ready[0]==false||ready[1]==false||ready[2]==false||ready[3]==false||ready[4]==false||ready[5]==false||ready[6]==false||ready[7]==false||ready[8]==false||ready[9]==false||ready[10]==false||ready[11]==false)
        requestAnimationFrame(main);
};

init();

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
main();

window.onbeforeunload = function(e) {
    socket.emit('unload','unloaded');
    socket.emit('disconnect');
};
