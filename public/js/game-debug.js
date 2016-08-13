var selectedx=-1;
var selectedy=-1;
var flag=0;
var socket = io();


var render = function () {
	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
	var i;
	var j;
	var offset=75;
	for(i=0;i<8;i++)
	{
		for(j=0;j<8;j++)
		{
			if(selectedy==i&&selectedx==j)
			{
				if(selectedReady)
					ctx.drawImage(selectedImage , offset * j,offset * i);
				if(game[i][j]!=-1)
				{	//if(ready[game[i][j]])
					{
						ctx.drawImage(img[game[i][j]],offset * j, offset * i);
					}
				}
			}
			else if((i+j)%2==0)
			{
				if (evenReady)
					ctx.drawImage(evenImage,offset * j,offset * i);
			
				if(game[i][j]!=-1)
				{	//if(ready[game[i][j]])
					{
						ctx.drawImage(img[game[i][j]],offset * j, offset * i);
					}
				}
			}
			else
			{
				if(oddReady)
					ctx.drawImage(oddImage,offset * j ,offset * i);
				if(game[i][j]!=-1)
				{	//if(ready[game[i][j]])
					{
						ctx.drawImage(img[game[i][j]],offset * j, offset * i);
					}
				}
			}
			if(possible[i][j]==1)
				ctx.drawImage(dotImage,offset * j, offset * i);
		}
	}
};

var game;
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
function clickDown(event)
{
	 var x = event.clientX + document.body.scrollLeft +
	    document.documentElement.scrollLeft;
	 var y = event.clientY + document.body.scrollTop +
	    document.documentElement.scrollTop;
	 x -= canvas.offsetLeft;
	 y -= canvas.offsetTop;
	 x=x/75;
	 y=y/75;
	 x=parseInt(x);
	 y=parseInt(y);
	 var a1=[x,y];
	 socket.emit ('press',a1);
 	 //else
 	 {
 	 	/*
 	 	else if(validMove(x,y))
 	 	{
 	 		var a1=[x,y,selectedx,selectedy];
 	 		socket.emit('press', a1);
 	 		selectedy=-1;
 	 		selectedx=-1;
 	 	 	flag=0;
 	 	}
 	 	else
 	 		alert("x:" + x + " y:" + y + "you cant move here");
 	 	*/
 	 }
 	 render();
}
var temp="&#9812; &#9813; &#9814;";
socket.on('disconnect',function(val){
document.getElementById("demo").innerHTML = "Your partner disconnected..<br>Refresh to start new game"; 	
});
socket.on('room11',function(val){
	alert(val);
});
 socket.on('start',function(val){
 	document.getElementById("demo").innerHTML = temp;
 	render();
 });

 socket.on('myMessage',function(val){
 	document.getElementById("demo2").innerHTML = val;
 	render();
 });

 socket.on('validFirstMove',function(index){
 	selectedx=index[0];
 	selectedy=index[1];
 	render();
 });
 socket.on('onSecondThoughts',function(index){
 	selectedx=-1;
 	selectedy=-1;
 	render();
 });
 socket.on('validSecondMove',function(index){
 
 	game[selectedy][selectedx]=-1;
 	selectedx=-1;
 	selectedy=-1;
 	var x=index[0];
 	var y=index[1];
 //	alert("y "+index[0]+"x "+index[1]+"val "+index[2]);

 	game[y][x]=index[2];
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
 	render();
 });

 socket.on('myMessage', function(index){
 	console.log(index);
  });


 socket.on('check', function(msg){
	document.getElementById("checkMessage").innerHTML = msg;
  });
  socket.on('checkMate', function(msg){
	document.getElementById("checkMessage").innerHTML = msg;
  });

 socket.on('noCheck', function(msg){
	document.getElementById("checkMessage").innerHTML = msg;
  });

 socket.on('currentArray', function(arr){
 	game = JSON.parse(JSON.stringify(arr));
	render();
  });

 socket.on('alertLink', function(msg){
 	alertLink(msg);
  });
 socket.on('won', function(msg){
 	Won();
  });
 socket.on('lost', function(msg){
 	Lost();
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