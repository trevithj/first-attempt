/* global BASE */
(function () {

	const { getEl, getEls } = BASE;

	const lineDivs = getEls('.lineDiv');
	const simPanel = getEl('.simPanel');
	const tickSpan = getEl('#ticks');

	const renderMoney = money => {
		const { revenue, fixed, variable, wip } = money;
		const np = revenue - fixed - variable;
		const msgs = [
			`Revenue:$${revenue}`,
			`Variable costs:$-${variable}`,
			`Fixed costs:$-${fixed}`,
			`Net Profit:$${np}   Work-in-process:${wip}`,
		];
		return { np, msg: msgs.join('\t') };
	}

	const renderStats = stats => {
		const { meanCap, meanAct, wip } = stats;
		const toFixd = n => Number.parseFloat(n).toFixed(2);
		const msgs = [
			'mean capacities:  ',
			meanCap.map(toFixd).join(', '),
			'\nmean utilization: ',
			meanAct.map(toFixd).join(', '),
			'\nefficiencies (%): ',
			meanCap.map((cap, i) => {
				const act = meanAct[i];
				return act===cap ? "100%" : Number.parseFloat(act/cap*100).toFixed(1);
			}).join('  '),
		];
		return msgs.join('');
	};

	BASE.render = (data) => {
		tickSpan.innerHTML = data[0].tick;
		const html = [];
		data.forEach((state, i) => {
			const { rm, stores, ops, money, stats, title, desc } = state;
			const { np, msg } = renderMoney(money);
			html.splice(html.length, 0,
				'<div class="lineDiv">',
				`<h5>Line ${i+1} - ${title}</h5>`,
				`<p>${desc}</p>`,
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
				`<span class="cash">$${np}</span>`,
				`<pre class="stats">${msg}\n${renderStats(stats)}</pre>`,
				'</div>'
			);
		});
		simPanel.innerHTML = html.join('');
	};

})();
