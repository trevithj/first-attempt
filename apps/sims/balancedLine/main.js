(function () {

	const { getEl, render, makeLine, nextState } = BASE;
	const renderOpts = { hideDetails: true };
	let intervalId;
	const MAX_TICKS = 400;
	const lines = [0,1,2,3,4].map(makeLine);
	lines[0].title = 'Balanced line, zero variation ("perfect")';
	lines[1].title = 'Balanced line, small random variation';
	lines[2].title = 'Balanced line, medium random variation';
	lines[3].title = 'Balanced line, large random variation';
	lines[4].title = 'Unbalanced line, large random variation';

	lines[0].desc = 'Each operation is able to process exactly 3 units per tick.';
	lines[1].desc = 'Each operation is able to process from 2 to 4 units per tick, with a mean of 3.';
	lines[2].desc = 'Each operation is able to process from 1 to 5 units per tick, with a mean of 3.';
	lines[3].desc = 'Each operation is able to process from 0 to 6 units per tick, with a mean of 3.';
	lines[4].desc = 'As above, except first operation can process from 0 to 5 units per tick, with a mean of 2.5.';

	const getSt = state => {
		return [state.rm].concat(state.stores.slice(0, -1));
	};

	//returns array of arrays [[capacity, maximumAvailable], ...]
	const nextOpsFns = [
		state => getSt(state).map(v => [3, v]),
		state => getSt(state).map(v => [random(3)+1, v]),
		state => getSt(state).map(v => [random(5), v]),
		state => getSt(state).map(v => [random(7)-1, v]),
	];

	const btnStep = getEl('#btnStep');
	const btnRunS = getEl('#btnRunS');
	const btnRunF = getEl('#btnRunF');
	const btnStop = getEl('#btnStop');
	const btnShow = getEl('#btnShow');

	const ticks = [lines];

	const doTick = () => {
		const thisLines = ticks[ticks.length-1];
		const nextLines = thisLines.map(nextState);
		ticks.push(nextLines);
		//console.log(nextLines[0].stores);
	}

	//console.log(ticks[0].stores);

	const doStop = () => clearInterval(intervalId);
	const doRun = () => {;
		doTick();
		render(ticks[ticks.length-1], renderOpts);
		if(ticks.length > MAX_TICKS) {
			doStop();
		}
	};
	const doRuns = delay => {
		doStop();
		intervalId = setInterval(doRun, delay);
	}
	const toggleDetails = () => {
		renderOpts.hideDetails = !renderOpts.hideDetails;
		render(ticks[ticks.length-1], renderOpts);
	}
	btnStep.addEventListener('click', () => { doStop(); doRun(); });
	btnRunS.addEventListener('click', () => doRuns(500));
	btnRunF.addEventListener('click', () => doRuns(50));
	btnStop.addEventListener('click', doStop);
	btnShow.addEventListener('click', toggleDetails);
	document.addEventListener('beforeunload', doStop);

	render(ticks[0], renderOpts);
})();
