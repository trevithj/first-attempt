(function () {

	const getEl = (sel) => document.querySelector(sel);
	const getEls = (sel) => document.querySelectorAll(sel);
	const random = max => Math.ceil(Math.random() * max);
	let intervalId;
	const INITIAL_CASH = 0;
	const INITIAL_RM = 900;


	const makeLine = id => {
		const rm = INITIAL_RM;
		const stores = [3,3,3,3,3,0];
		const tick = 0;
		const ops = [0,0,0,0,0,0];
		const cash = INITIAL_CASH;
		return { id, rm, stores, tick, ops, cash, msg:'Ready to run' };
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
	]

	const nextState = (thisState, n) => {
		const nextOps = nextOpsFns[n];
		const { id, tick } = thisState; //assume a line object
		const ops = nextOps(thisState);
		const st = [thisState.rm].concat(thisState.stores);
		ops.forEach((d, i) => {
			st[i] -= d;
			st[i+1] += d;
		});

		const revenue = 2* ops[ops.length-1];
		const expenses = tick === 299 ? 800 : 0;
		let cash = thisState.cash - ops[0] + revenue - expenses;
		const msgs = [
			`RM costs:$${ops[0]}`,
			`Revenue:$${revenue}`,
			`Fixed expenses:$${expenses}`,
			`Cash on hand:$${cash}`
		];
		return { id, tick: tick + 1, rm:st[0], stores:st.slice(1), ops, cash, msg: msgs.join('\t') };
	}

	const lineDivs = getEls('.lineDiv');
	const tickSpan = getEl('#ticks');
	const btnStep = getEl('#btnStep');
	const btnRunS = getEl('#btnRunS');
	const btnRunF = getEl('#btnRunF');
	const btnStop = getEl('#btnStop');

	const ticks = [lines];

	const render = (data) => {
		tickSpan.innerHTML = data[0].tick;
		lineDivs.forEach((div, index) => {
			// const failrate = JSON.parse(div.dataset.failrate);
			// const runtimes = JSON.parse(div.dataset.runtimes);
			// const stores = JSON.parse(div.dataset.stores);
			// console.log({ index, failrate, runtimes, stores });
			const { rm, stores, ops, cash, msg } = data[index];
			const html = [
				'<div>',
				`<button class="raw-material">${rm}</button>`,
				...stores.map((s, i) => {
					return [
						'<span>',
						'	<span>&#8680;</span>',
						`	<span class="op">${ops[i]}</span>`,
						'	<span>&#8680;</span>',
						`	<button class="store">${s}</button>`,
						'</span>'
					].join("");
				}),
				`<span class="cash">$${cash}</cash>`,
				`<pre>${msg}</pre>`,
				'</div>',
			];
			div.innerHTML = html.join('');
		});
	};

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
		if(ticks.length > 300) {
			doStop();
		}
	};
	const doRuns = delay => {
		doStop();
		intervalId = setInterval(doRun, delay);
	}
	btnStep.addEventListener('click', () => { doStop(); doRun(); });
	btnRunS.addEventListener('click', () => doRuns(500));
	btnRunF.addEventListener('click', () => doRuns(100));
	btnStop.addEventListener('click', doStop);
	document.addEventListener('beforeunload', doStop);

	render(ticks[0]);
})();
