(function () {

	const getEl = (sel) => document.querySelector(sel);
	const getEls = (sel) => document.querySelectorAll(sel);
	const random = max => Math.ceil(Math.random() * max);
	let intervalId;
	const INITIAL_CASH = 0;
	const INITIAL_RM = 900;


	const makeLine = id => {
		const stores = [INITIAL_RM,3,3,3,3,0];
		const tick = 0;
		const ops = [0,0,0,0,0];
		const cash = INITIAL_CASH;
		return { id, stores, tick, ops, cash, msg:'Ready to run' };
	};
	const lines = [makeLine(0), makeLine(1), makeLine(2)];


	const opsFns = [
		v => Math.min(3, v),
		v => Math.min(random(3)+1, v),
		v => Math.min(random(7)-1, v)
	]

	const nextState = (thisState, n) => {
		const { id, tick } = thisState; //assume a line object
		const st = thisState.stores;
		const ops = st.map(opsFns[n]);
		ops.pop(); //ignore last entry
		const stores = [...st];
		ops.forEach((d, i) => {
			stores[i] -= d;
			stores[i+1] += d;
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
		return { id, tick: tick + 1, stores, ops, cash, msg: msgs.join('\t') };
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
			const { stores, ops, cash, msg } = data[index];
			const html = [
				'<div>',
				...stores.map((s, i) => {
					return i===0 ? `<button class="raw-material">${stores[0]}</button>` : [
						'<span>',
						'	<span>&#8680;</span>',
						`	<span class="op">${ops[i-1]}</span>`,
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
