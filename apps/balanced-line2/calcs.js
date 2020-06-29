(function () {

	const random = max => Math.ceil(Math.random() * max);
	const INITIAL_RM = 1500;
	const MONEY = {
		variable: 0,
		fixed: 0,
		revenue: 0
	};
	const STATS = {
		meanCap: [0,0,0,0,0,0,0],
		meanAct: [0,0,0,0,0,0,0],
		wip: 0,
	};

	BASE.makeLine = id => {
		const rm = INITIAL_RM;
		const stores = [3,3,3,3,3,3,0];
		const tick = 0;
		const ops = [0,0,0,0,0,0,0];
		const money = {...MONEY};
		const stats = {...STATS};
		return { id, rm, stores, tick, ops, money, stats };
	};

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

	const nextMoney = (money, ops) => {
		const newMoney = {...money };
		newMoney.fixed += 2; //$2 per tick
		newMoney.variable += (3 * ops[0]); // $3 per unit
		newMoney.revenue += (4 * ops[ops.length-1]); //$4 per unit
		return newMoney;
	}

	const nextStats = (state, rawOps) => {
		const { stats, tick, stores } = state;
		const caps = rawOps.map(va => va[0]);
		const acts = rawOps.map(va => Math.min(va[0], va[1]));
		const meanCap = stats.meanCap.map((last, i) => {
			return ((last * tick) + caps[i]) / (tick + 1);
		});
		const meanAct = stats.meanAct.map((last, i) => {
			return ((last * tick) + acts[i]) / (tick + 1);
		});

		const fg = stores[stores.length-1];
		const wip = -fg + stores.reduce((acc, cur) => acc + cur);

		const newStats = { ...stats, meanCap, meanAct, wip};
		return newStats;
	}

	BASE.nextState = (thisState, n) => {
		const nextOps = nextOpsFns[n];
		const { id, tick } = thisState; //assume a line object
		const rawOps = nextOps(thisState);
		const ops = rawOps.map(([cap, act]) => Math.min(cap, act));
		const st = [thisState.rm].concat(thisState.stores);
		ops.forEach((d, i) => {
			st[i] -= d;
			st[i+1] += d;
		});

		const money = nextMoney(thisState.money, ops);
		const stats = nextStats(thisState, rawOps);
		return { id, tick: tick + 1, rm:st[0], stores:st.slice(1), ops, money, stats };
	};

})();
