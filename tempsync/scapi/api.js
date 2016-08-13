var p;
SC.initialize({
  client_id: '8a73a4efdb1f7a965c562f75716551ee'
});

SC.stream('/tracks/235152782').then(function(player){
	p= player;
	p.play();
});

function f() {
	p.seek(p.currentTime()+10000);
}