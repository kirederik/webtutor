'use strict';

/* Controllers */


function MainCtrl() {}
MainCtrl.$inject = [];



function DerivativeCtrl($scope) {
	$scope.problem = new ProblemFunction()
}

var FunctionRule = function(rule) {
	this.generators = [
		{	
			name: "exponencial",
			rule: "x ^ n",
			derivative: {
				rule: "n * x ^ (n - 1)",
				tex: "n * x ^ {(n - 1)}"
			},
			number: null
		}
	]
	return this.generators[rule];
}

var ProblemFunction = function() {
	this.f = {}
	this.derivative = {};
	this.r = "";
	this.regex = /n/g;
	return this.generate();
}

ProblemFunction.prototype = {
	randomize: function(seed) {
		return Math.floor((Math.random()*seed));
	}
	, expandFunction: function(val) {
		this.f.fn = this.r.rule.replace(this.regex, val+2);
		this.r.number = val + 2;
		console.log("expanding rule: ", this.r.rule, " to ", this.f.fn);
	}
	, expandDerivative: function() {
		this.derivative.rule = this.r.derivative.rule.replace(this.regex, this.r.number);
		this.derivative.tex = this.r.derivative.tex.replace(this.regex, this.r.number);
		console.log("expanding derivative rule: ", this.r.derivative.rule, " to ", this.derivative);
	}
	, setValues: function() {
		this.f.x = this.randomize(7)+2;
		this.f.h = 1 / Math.pow(10, this.randomize(4) + 1.0);
	}
	, applyRule: function() {
		this.expandFunction(this.randomize(5));
		this.expandDerivative();
	}
	, generate: function() {
		this.r = new FunctionRule(this.randomize(0));
		console.log("rule selected: ", this.r);
		this.applyRule();
		this.setValues();
		console.log(this);
		return this;
	}
}

function ExpressionsCtrl($scope) {
	$scope.exp = new Expr()
	$scope.exp.generate();

	$scope.newExp = function() {
		console.log("msg")
		$scope.exp.generate();
	}
}


ExpressionsCtrl.$inject = ["$scope"];


/** Expression Class definition **/
var Expr = function (initValue) {
	this.val = initValue,
	this.rulesAmount = 15,
	this.rules = {
		/* ( Rules ) */
		R1: "( NUMB OP EXPR )"
		, R2: "( EXPR OP NUMB )"
		, R3: "( NUMB OP EXPR ) OP EXPR"
		, R4: "( EXPR OP NUMB ) OP EXPR"
		/* [ Rules ] */
		, R5: "[ NUMB OP EXPR ]"
		, R6: "[ EXPR OP NUMB ]"
		, R7: "[ NUMB OP EXPR ] OP EXPR"
		, R8: "[ EXPR OP NUMB ] OP EXPR"
		/* { Rules } */
		, R9:  "{ NUMB OP EXPR }"
		, R10: "{ EXPR OP NUMB }"
		, R11: "{ NUMB OP EXPR } OP EXPR"
		, R12: "{ EXPR OP NUMB } OP EXPR"
		/* Terminal Rules */
		, R13: "NUMB OP EXPR"
		, R14: "EXPR OP NUMB"
		, R15: "NUMB"
	},
	this.mask = {
		NUMB: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		OP: ["+", "-", "*", "/"]
	},
	this.exprMax = 0;
}

Expr.prototype = {
	randomize: function(seed) {
		return Math.floor((Math.random()*seed)+1);
	}
	, merge: function(from, dest, index) {
		from[index] = dest;
		return from.join().split(',');
	}
	, expand: function(current, max) {
		// var seed = this.randomize(this.rulesAmount-3);
		// var currentRule = this.rules["R"+seed];

		// var expanded;
		// var expression;
		// if (currentLenght >= this.exprMax) {
		// 	currentRule = this.rules["R15"];
		// }
		// while (currentRule.indexOf("EXPR") > 0) {
		// 	var splitted = currentRule.split(" ");
		// 	var index = splitted.indexOf("EXPR");
		// 	while (index >= 0) {
		// 		var expanded = this.expand(1);
		// 		console.log(expanded);
		// 		expression = this.merge(expression, expanded, index);
		// 		splitted = currentRule.split(" ");
		// 		index = splitted.indexOf("EXPR");	
		// 	}
		// 	seed = this.randomize(this.rulesAmount)
		// 	currentRule = this.rules["R"+seed];

		// }
		// return expression;
		var i = current || 0;
		var max = max || 1;
		var rule;
		var expanded;
		while (i < max) {
			i += 1;
			var seed = this.randomize(this.rulesAmount);
			rule = this.rules["R"+seed];
			expanded = rule.split(" ");
			var index = expanded.indexOf("EXPR");
			while (index > 0) {
				if (i >= max) {
					var exp = "NUMB"
				} else {
					var exp = this.expand(i)					
				}
				expanded = this.merge(expanded, exp, index)
				index = expanded.indexOf("EXPR");
			}
		}
		// console.log(expanded);
		return expanded;
	} 
	, generate: function() {
		var seed = this.randomize(this.rulesAmount-3);
		var currentRule = this.rules["R"+seed];
		var len = 0;
		var total = currentRule.split(" ");
		while (currentRule.indexOf("EXPR") > 0 && len <= this.exprMax) {
			var splitted = currentRule.split(" ");
			var index = splitted.indexOf("EXPR");
			var expanded = this.expand();
			total = this.merge(total, expanded, index);
			seed = this.randomize(this.rulesAmount)
			currentRule = this.rules["R"+seed];
		}

		// var v1 = this.expand();
		console.log(total);
		return total;
	}
}

/*

		var seed = this.randomize(this.rulesAmount-3);
		var currentRule = this.rules["R"+seed];
		var exprLenght = 0;
		while (currentRule.indexOf("EXPR") > 0) {
			// console.debug("Current Rule", currentRule);		

			/* Split the expression and expand the EXPR 
			var splited = currentRule.split(" ");

			

			seed = this.randomize(this.rulesAmount)
			currentRule = this.rules["R"+seed];
			if (exprLenght >= 5) {
				currentRule = this.rules["R15"];
			}
			exprLenght++;
		}
		this.val = "222222"
Numb: [0-9] | NumbNumb
Op: [*-+/]
Exp: (Numb Op Exp) Op Exp | [Numb Op Exp] Op Exp | {Numb Op Exp} Op Exp | Numb Op Exp | Numb



Numb: [0-9] 
Op: [*-+/]
R3: (Numb Op Exp) Op Exp 
R4: [Numb Op Exp] Op Exp 
R5: {Numb Op Exp} Op Exp 
R6: Numb Op Exp 
R7: Numb
R8: (Numb Op Exp) 
R9: [Numb Op Exp]
R10: {Numb Op Exp}

12 + 4 - (7 + {2 + 5})

12 + Exp 						--> R6
12 + 4 - Exp					--> R6
12 + 4 - (7 + Exp) 				--> R8
12 + 4 - (7 + {2 + Exp})		--> R10
12 + 4 - (7 + {2 + 5})			--> R7

		
		R1: "( NUMB OP EXPR ) OP EXPR",
		R2: "[ NUMB OP EXPR ] OP EXPR",
		R3: "{ NUMB OP EXPR } OP EXPR",
		R4: "( NUMB OP EXPR )",
		R5: "[ NUMB OP EXPR ]",
		R6: "{ NUMB OP EXPR }",
		R7: "( EXPR OP NUMB ) OP EXPR",
		R8: "[ NUMB OP EXPR ] OP EXPR",
		R9: "{ NUMB OP EXPR } OP EXPR",
		R10: "( NUMB OP EXPR )",
		R11: "[ NUMB OP EXPR ]",
		R12: "{ NUMB OP EXPR }",
		R13: "( NUMB OP EXPR ) OP EXPR",
		R14: "[ NUMB OP EXPR ] OP EXPR",
		R15: "{ NUMB OP EXPR } OP EXPR",
		R16: "( NUMB OP EXPR )",
		R17: "[ NUMB OP EXPR ]",
		R18: "{ NUMB OP EXPR }",
		R19: "NUMB OP EXPR",
		R20: "NUMB"

*/