var horReady = false;
var horImage = new Image();
horImage.onload = function () {
	horReady = true;
};
horImage.src = "/util/images/hor2.png";

var verReady = false;
var verImage = new Image();
verImage.onload = function () {
	verReady = true;
};
verImage.src = "/util/images/ver2.png";


var evenReady = false;
var evenImage = new Image();
evenImage.onload = function () {
	evenReady = true;
};
evenImage.src = "/util/images/evenNew.png";

var oddReady=false;
var oddImage=new Image();
oddImage.onload = function () {
	oddReady=true;
}
oddImage.src="/util/images/oddNew.png";
var dotReady=false;
var dotImage=new Image();
dotImage.onload = function () {
	dotReady=true;
}
dotImage.src="/util/images/dot.png";
var selectedReady=false;
var selectedImage=new Image();
selectedImage.onload = function() {
	selectedReady=true;
}

var fromReady=false;
var fromImage=new Image();
fromImage.onload = function () {
	fromReady=true;
}
fromImage.src="/util/images/from.png";

var checkMateImage=false;
var checkMateImage=new Image();
checkMateImage.onload = function () {
	checkMateReady=true;
}
checkMateImage.src="/util/images/checkMate.png";

var toReady=false;
var toImage=new Image();
toImage.onload = function () {
	toReady=true;	
}

toImage.src="/util/images/to.png";


selectedImage.src="/util/images/selected.png";

var img = new Array (12);
var ready = new Array (12);

var i=0;
for(i=0;i<12;i++)
{
	ready[i]=false;
	img[i]=new Image();
	img[i].onload = function ()
	{
		ready[i]=true;
	}
}
img[0].src="/util/images/_0.png";
img[1].src="/util/images/_1.png";
img[2].src="/util/images/_2.png";
img[3].src="/util/images/_3.png";
img[4].src="/util/images/_4.png";
img[5].src="/util/images/_5.png";
img[6].src="/util/images/0.png";
img[7].src="/util/images/1.png";
img[8].src="/util/images/2.png";
img[9].src="/util/images/3.png";
img[10].src="/util/images/4.png";
img[11].src="/util/images/5.png";

img[0].onload = function ()
{
	ready[0]=true;
}
img[1].onload = function ()
{
	ready[1]=true;
}
img[2].onload = function ()
{
	ready[2]=true;
}
img[3].onload = function ()
{
	ready[3]=true;
}
img[4].onload = function ()
{
	ready[4]=true;
}
img[5].onload = function ()
{
	ready[5]=true;
}
img[6].onload = function ()
{
	ready[6]=true;
}
img[7].onload = function ()
{
	ready[7]=true;
}
img[8].onload = function ()
{
	ready[8]=true;
}
img[9].onload = function ()
{
	ready[9]=true;
}
img[10].onload = function ()
{
	ready[10]=true;
}
img[11].onload = function ()
{
	ready[11]=true;
}
