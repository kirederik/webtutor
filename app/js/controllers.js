'use strict';

/* Controllers */


function MainCtrl() {}
MainCtrl.$inject = [];


function ExpressionsCtrl($scope) {
	$scope.exp = new Expr()
	$scope.exp.generateValue();

	$scope.newExp = function() {
		console.log("msg")
		$scope.exp.generateValue();
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
	}
}

Expr.prototype = {
	randomize: function(seed) {
		return Math.floor((Math.random()*seed)+1);
	}, 
	generateValue: function() {
		var seed = this.randomize(this.rulesAmount-3);
		var currentRule = this.rules["R"+seed];
		var exprLenght = 0;
		while (currentRule.indexOf("EXPR") > 0) {
			console.debug("Current Rule", currentRule);		

			/* Split the expression and expand the EXPR */
			var splited = currentRule.split(" ");
			

			seed = this.randomize(this.rulesAmount)
			currentRule = this.rules["R"+seed];
			if (exprLenght >= 5) {
				currentRule = this.rules["R15"];
			}
			exprLenght++;
		}
		this.val = "222222"
	}
}

/*


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