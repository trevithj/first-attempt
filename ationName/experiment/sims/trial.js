(function(){
	BASE.listen('STATE_CHANGED', state => {
		console.log(state);
	});


	BASE.initState((state, action) => {
		return {
			actionType: action.type,
		};
	});

}());

console.log('done');

