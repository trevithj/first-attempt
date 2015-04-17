/*globals angular, d3, console */
//Balanced line app
(function() {
	"use strict";
	var app = angular.module("DiceGame",[]);
	app.factory("OpsFactory", function() {
		function pushTo(a, n) {
			a.forEach(function(v,i) {
				a[i] = v+n;
			});
		}
		function pullFrom(a, n) {
			var insufficient = false;
			a.forEach(function(v,i) {
				a[i] = v-n;
				if(a[i]<0) { insufficient = true; }
			});
			if(insufficient) {
				pushTo(a,n); //reverse
				return 0;
			}
			return n;
		}
		function makeOp(inputs, outputs, runtime, failrate) {
			var wip = 0,
			tick = 0,
			op = {};
			runtime = runtime || 4;
			failrate = failrate || 0;
			op.process = function() {
				if(Math.random() < failrate) {
					return; //breakdown... maybe update colour?
				}
				tick = (tick > 0 ) ? tick-1 : tick;
				if(tick===0) {
					if(wip>0) {
						pushTo(outputs, wip);
					}
					wip = pullFrom(inputs, 1);
					if(wip>0) {
						tick = runtime;
					}
				}
			};
			op.getTick = function() { return tick; };
			op.getOutputs = function() { return outputs; };
			return op;
		}
		return {
			make: makeOp,
			pushTo: pushTo,
			pullFrom: pullFrom
		};
	});

	app.controller("GameCtrl", function($scope, $interval, OpsFactory) {
		var runner = null;
		$scope.count = 0;
		//TODO: replace set/clearInterval with $interval calls
		function start(ms) {
			stop();
			runner = $interval(function() {
				$scope.$broadcast("tick", null);
				$scope.count+=1;
			}, ms, 218);
		}

		function stop() {
			if(runner!==null) {
				$interval.cancel(runner);
			}
			runner=null;
		}

		$scope.start = start;
		$scope.stop = stop;
//		$scope.soh = function(s) {
//			var soh = "000"+ m.stores[s];
//			return soh.substring(soh.length-3);
//		};
	});

	function drawTheOps(theVis, ops) {
		// var theVis = d3.select(el);
		var update = theVis.selectAll("rect").data(ops);
		update.enter().append("rect");
		update.exit().remove();	
		update
		.attr("x", function(op, i) { return 100 + (i * 100); })
		.attr("y", "20")
		.attr("width", 30)
		.attr("height", 30)
		.attr("fill", "lime");
		update = theVis.selectAll("text.op").data(ops);
		update.enter().append("text");
		update.exit().remove();	
		update
		.attr("class", "op")
		.attr("x", function(op, i) { return 100 + (i * 100); })
		.attr("y", "35")
		.attr("fill", "black")
		.text(function(op) { return op.getTick(); });
		// console.log("nodes rendered");
	}

	function drawStores(theVis, stores) {
		// var theVis = d3.select(el);
		var update = theVis.selectAll("text.soh").data(stores);
		update.enter().append("text");
		update.exit().remove();	
		update
		.attr("class", "soh")
		.attr("x", function(st, i) { return 50 + (i * 100); })
		.attr("y", "35")
		.attr("fill", "blue")
		.text(function(st) { return st; });
		// console.log("nodes rendered");
	}
	/* Assume that the directive applies to a div attribute.
	*/
	app.directive("jtLineSvg", function(OpsFactory) {
		var divD3, svg, theBG, path, theVis;
		return {
			scope: {
				failrate:"=",
				runtimes:"=",
				stores:"="
			},
			compile: function(tElem){
				divD3 = d3.select(tElem[0]);
				svg = divD3.append("svg")
				.attr("width", "100%")
				.attr("height", "100%");
				theBG = svg.append("rect")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("class", "background");
				theVis = svg.append("g")
				.attr("class", "theVis");
				path = theVis.append("path")
				.attr("fill", "silver");

				// initializing behaviors
			},
			controller: function($scope) {
				$scope.ops = [];
				$scope.stores.forEach(function(store, i) {
					if(i>0) {
						$scope.ops.push(OpsFactory.make($scope.stores[i-1], $scope.stores[i], 4));
					}
				});
				drawTheOps(theVis, $scope.ops);
				drawStores(theVis, $scope.stores);
				$scope.$watch("stores", function(newStores) {
					console.log("stores changed");
				});
			}
		};
	});

/* Assume that the directive applies to a div attribute.
	*/
	app.directive("jtLineHtml", function(OpsFactory) {
		function processAll(ops) {
			ops.forEach(function(op) {
				op.process();
			});
		};

		return {
			scope: {
				failrate:"=",
				runtimes:"=",
				stores:"="
			},
			controller: function($scope) {
				$scope.ops = [];
				$scope.stores.forEach(function(store, i) {
					if(i>0) {
						var rate = $scope.failrate[i-1];
						var runtime = $scope.runtimes[i-1];
						$scope.ops.push(OpsFactory.make(
							$scope.stores[i-1],
							$scope.stores[i],
							runtime, rate
						));
					}
				});
				$scope.$watch("stores", function(newStores) {
					console.log("stores changed");
				});
				$scope.$on("tick", function() {
					processAll($scope.ops);
				});
			},
			template: ["<div>",
				'<button class="store">{{stores[0]}}</button>',
				'<span ng-repeat="op in ops">',
				'	<span>&#8680;</span>',
				'	<button class="op">{{op.getTick()}}</button>',
				'	<span>&#8680;</span>',
				'	<button class="store">{{op.getOutputs()}}</button>',
				'</span>',
				'</div>'].join("")
		};
	});
}());