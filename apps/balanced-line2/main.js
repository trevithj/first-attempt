(function () {

	const { getEl, render } = BASE;
	const random = max => Math.ceil(Math.random() * max);
	let intervalId;
	const INITIAL_RM = 1200;
	const MAX_TICKS = 400;
	const MONEY = {
		variable: 0,
		fixed: 0,
		revenue: 0
	};
	const STATS = {
		meanCap: [0,0,0,0,0,0,0],
		meanUse: [0,0,0,0,0,0,0]
	};

	const makeLine = id => {
		const rm = INITIAL_RM;
		const stores = [3,3,3,3,3,3,0];
		const tick = 0;
		const ops = [0,0,0,0,0,0,0];
		const money = {...MONEY};
		const stats = {...STATS};
		return { id, rm, stores, tick, ops, money, stats };
	};
	const lines = [0,1,2,3].map(makeLine);

	const getSt = state => {
		return [state.rm].concat(state.stores.slice(0, -1));
	};

	const nextOpsFns = [
		state => getSt(state).map(v => Math.min(3, v)),
		state => getSt(state).map(v => Math.min(random(3)+1, v)),
		state => getSt(state).map(v => Math.min(random(5), v)),
		state => getSt(state).map(v => Math.min(random(7)-1, v)),
	];

	const nextMoney = (money, ops) => {
		const newMoney = {...money };
		newMoney.variable += ops[0]; // $1 per unit
		newMoney.revenue += 2* ops[ops.length-1]; //$2 per unit
		newMoney.fixed += 2; //$2 per tick
		return newMoney;
	}

	const nextStats = (stats, ops) => {
		const newStats = { ...stats};
		return newStats;
	}

	const nextState = (thisState, n) => {
		const nextOps = nextOpsFns[n];
		const { id, tick } = thisState; //assume a line object
		const ops = nextOps(thisState);
		const st = [thisState.rm].concat(thisState.stores);
		ops.forEach((d, i) => {
			st[i] -= d;
			st[i+1] += d;
		});

		const money = nextMoney(thisState.money, ops);
		const stats = nextStats(thisState.stats, ops);
		return { id, tick: tick + 1, rm:st[0], stores:st.slice(1), ops, money, stats };
	};

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
