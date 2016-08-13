$(document).ready(function () {
	var topbar = new Topbar({application: 'chess'});
	$(document).bind("move:append", function (e) {
		$("#rcorners2").animate({ scrollTop: $("#rcorners2")[0].scrollHeight }, "slow");
	});
});
