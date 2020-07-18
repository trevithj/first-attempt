(function() {

	//basic pattern
	BASE.listen("SOMETHING_HAPPENED", function(data) {
		BASE.dispatch("DO_SOMETHING", {});
	});

	$('#btnMove').on('click', () => BASE.dispatch("MOVE"));
	$('#btnLeft').on('click', () => BASE.dispatch("LEFT"));
	$('#btnRght').on('click', () => BASE.dispatch("RIGHT"));
	$('#btnRept').on('click', () => BASE.dispatch("REPORT"));

}());
