(function () {

	const { getEl, render, makeLine, nextState } = BASE;
	let intervalId;
	const MAX_TICKS = 400;
	const lines = [0,1,2,3].map(makeLine);

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

	const ticks = [lines];

	const doTick = () => {
		const thisLines = ticks[ticks.length-1];
		const nextLines = thisLines.map(nextState);
		ticks.push(nextLines);
		//console.log(nextLines[0].stores);
	}

	//console.log(ticks[0].stores);

	const doStop = () => clearInterval(intervalId);
	const doRun = () => {
		doTick();
		render(ticks[ticks.length-1]);
		if(ticks.length > MAX_TICKS) {
			doStop();
		}
	};
	const doRuns = delay => {
		doStop();
		intervalId = setInterval(doRun, delay);
	}
	btnStep.addEventListener('click', () => { doStop(); doRun(); });
	btnRunS.addEventListener('click', () => doRuns(500));
	btnRunF.addEventListener('click', () => doRuns(50));
	btnStop.addEventListener('click', doStop);
	document.addEventListener('beforeunload', doStop);

	render(ticks[0]);
})();
