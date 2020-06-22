(function () {
	const getEl = (sel) => document.querySelector(sel);
	const getEls = (sel) => document.querySelectorAll(sel);
	const random = max => Math.ceil(Math.random() * max);
	let intervalId;

	const makeLine = id => {
		const stores = [900,0,0,0,0,0];
		const tick = 0;
		const ops = [0,0,0,0,0];
		return { id, stores, tick, ops };
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
		return { id, tick: tick + 1, stores, ops };
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
			const { stores, ops } = data[index];
			const html = [
				'<div>',
				...stores.map((s, i) => {
					return i===0 ? `<button class="store">${stores[0]}</button>` : [
						'<span>',
						'	<span>&#8680;</span>',
						`	<span class="op">${ops[i-1]}</span>`,
						'	<span>&#8680;</span>',
						`	<button class="store">${s}</button>`,
						'</span>'
					].join("");
				}),
				'</div>',
			];
			div.innerHTML = html.join('');
		});
	};

	const doTick = () => {
		const thisLines = ticks[ticks.length-1];
		const nextLines = thisLines.map(nextState);
		ticks.push(nextLines);
		console.log(nextLines[0].stores);
	}

	console.log(ticks[0].stores);


	const doRun = () => {
		doTick();
		render(ticks[ticks.length-1]);
	};
	const doRuns = delay => {
		clearInterval(intervalId);
		intervalId = setInterval(doRun, delay);
	}
	btnStep.addEventListener('click', () => doRun());
	btnRunS.addEventListener('click', () => doRuns(500));
	btnRunF.addEventListener('click', () => doRuns(100));
	btnStop.addEventListener('click', () => clearInterval(intervalId));
})();
