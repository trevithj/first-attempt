/* global BASE */
(function () {

	const { getEl, getEls } = BASE;

	const lineDivs = getEls('.lineDiv');
	const tickSpan = getEl('#ticks');

	const renderMoney = money => {
		const { revenue, fixed, variable } = money;
		const np = revenue - fixed - variable;
		const msgs = [
			`Revenue:$${revenue}`,
			`Variable costs:$-${variable}`,
			`Fixed costs:$-${fixed}`,
			`Net Profit:$${np}`
		];
		return { np, msg: msgs.join('\t') };
	}

	const renderStats = stats => {
		const { meanCap, meanAct, wip } = stats;
		const toFixd = n => Number.parseFloat(n).toFixed(2);
		const msgs = [
			`mean capacities :${JSON.stringify(meanCap.map(toFixd))}\n`,
			`mean utilization:${JSON.stringify(meanAct.map(toFixd))}\n`,
			`Work in process:${wip}`,
		];
		return msgs.join('');
	};

	BASE.render = (data) => {
		tickSpan.innerHTML = data[0].tick;
		lineDivs.forEach((div, index) => {
			// const failrate = JSON.parse(div.dataset.failrate);
			// const runtimes = JSON.parse(div.dataset.runtimes);
			// const stores = JSON.parse(div.dataset.stores);
			// console.log({ index, failrate, runtimes, stores });
			const { rm, stores, ops, money } = data[index];
			const { np, msg } = renderMoney(money);
			const html = [
				'<div>',
				`<div class="box raw-material">${rm}</div>`,
				...stores.map((s, i) => {
					return [
						'<span>',
						'	<span>&#8680;</span>',
						`	<div class="box op">${ops[i]}</div>`,
						'	<span>&#8680;</span>',
						`	<div class="box store">${s}</div>`,
						'</span>'
					].join("");
				}),
				`<span class="cash">$${np}</cash>`,
				`<pre>${msg}</pre>`,
				'</div>',
			];
			div.innerHTML = html.join('');
		});
	};

})();
