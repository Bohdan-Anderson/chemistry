function Main(){
	//creationg elements 
		var elHeader = createEl("div","header");
		var elFooter = createEl("div","footer");
		var elDevide = createEl("div","devide","-->")
		//function buttons
		var elBalance = createEl("span","button","Check Balance",clickbalance);
		var elMakeMass = createEl("span","button","Calc Mass\'",clickmass);
		var elResetMass = createEl("span","button","Reset Mass",resetMass);
		// var elStrucCalc = createEl("span","button","Calc Structure",calcStructures)
		//display buttons
		var elSelectQuant = createEl("div","button","Ratios",showQuantity);
		var elSelectMass = createEl("div","button","Mass",showMass);
		//var elSelectStructure = createEl("div","button","Structure",showStruct);

		document.body.appendChild(elHeader);
		elHeader.appendChild(elSelectQuant);
		//elHeader.appendChild(elSelectStructure);
		elHeader.appendChild(elSelectMass);

	var left = new Sideofel("Reactants");
	document.body.appendChild(elDevide);
	var right = new Sideofel("Products");

	// left.addMolsAddEl([
	// 	{"molsQuan":4,"elements":[{"elName":"H","quan":2},{"elName":"O","quan":1}]},
	// 	{"molsQuan":1,"elements":[{"elName":"Al","quan":2}]}
	// 	]);
	// right.addMolsAddEl([
	// 	{"molsQuan":2,"elements":[{"elName":"Al","quan":1},{"elName":"O","quan":2}]},
	// 	{"molsQuan":4,"elements":[{"elName":"H","quan":2}]}
	// 	]);

	left.addMolsAddEl([
		{"molsQuan":8,"elements":[{"elName":"C","quan":1},{"elName":"H","quan":3},{"elName":"N","quan":1},{"elName":"H","quan":2}]},
		{"molsQuan":20,"elements":[{"elName":"O","quan":2}]}
		]);
	right.addMolsAddEl([
		{"molsQuan":8,"elements":[{"elName":"C","quan":1},{"elName":"O","quan":2}]},
		{"molsQuan":4,"elements":[{"elName":"N","quan":2},{"elName":"O","quan":1}]},
		{"molsQuan":20,"elements":[{"elName":"H","quan":2},{"elName":"O","quan":1}]}
		]);
	// showStruct();

	// left.addMolsAddEl([
	// 	{"molsQuan":1,"elements":[{"elName":"H","quan":2},{"elName":"O","quan":1}]},
	// 	{"molsQuan":1,"elements":[{"elName":"O","quan":2}]}
	// 	]);

	// right.addMolsAddEl([
	// 	{"molsQuan":1,"elements":[{"elName":"H","quan":2},{"elName":"O","quan":1}]},
	// 	{"molsQuan":1,"elements":[{"elName":"O","quan":2}]}
	// 	]);

	document.body.appendChild(elFooter);
	elFooter.appendChild(elBalance);
	elFooter.appendChild(elMakeMass);
	elFooter.appendChild(elResetMass);
	//elFooter.appendChild(elStrucCalc);

	function showMass(){
		hideAllEl();
		$(".change-mass").each(function(){
			$(this).removeClass("hide");
		});
	}

	function showQuantity(){
		hideAllEl();
		$(".change-quantity").each(function(){
			$(this).removeClass("hide");
		});
	}

	// function showStruct(){
	// 	calcStructures();
	// 	hideAllEl();
	// 	$(".change-structure").each(function(){
	// 		$(this).removeClass("hide");
	// 	});
	// }

	function hideAllEl(){
		hideEl(".change-quantity");
		hideEl(".change-mass");
		hideEl(".change-structure");
	}
	function hideEl(className){
		$(className).each(function(){
			if(!$(this).hasClass("hide")){
				$(this).addClass("hide");
			}
		});
	}

	function clickbalance(){
		console.log("left");
		var leftEl = left.listofelements();
		console.log(leftEl);
		console.log("right");
		var rightEl = right.listofelements();
		console.log(rightEl);
		var passed = true;
		for(el in leftEl){
			if(rightEl[el] && rightEl[el] == leftEl[el]){
				delete leftEl[el];
				delete rightEl[el];
			} else if(rightEl[el]){
				if(rightEl[el]>leftEl[el]){
					rightEl[el] = rightEl[el] - leftEl[el];
					delete leftEl[el];
				} else {
					leftEl[el] = leftEl[el] - rightEl[el];
					delete rightEl[el];
				}
				passed = false;
			} else {
				passed = false;
			}

		}

		if(countkeys(rightEl) != 0){
			passed = false;
		}

		if(passed){
			left.setError("");
			right.setError("");
			setHeadsPassed();
			return true;
		} else {
			left.setError("extra " + objectToString(leftEl));
			right.setError("extra " + objectToString(rightEl));
			setHeadsFailed();
			return false;
		}
	}

	function resetMass(){
		left.resetMass();
		right.resetMass();
	}

	function clickmass(){
		showMass();
		if(clickbalance()){
			var leftLimit = left.findLimiting();
			var rightLimit = right.findLimiting();
			console.log(leftLimit, rightLimit);
			if(!rightLimit || rightLimit > leftLimit){
				right.limiting(leftLimit);
			}
			if(!leftLimit || leftLimit > rightLimit){
				left.limiting(rightLimit);
			}

		} else {
			alert("The equation is not balanced yet, please balance it before calculating the mass of the equation");
		}
	}

	// function calcStructures(){
	// 	left.calcStructure();
	// 	right.calcStructure();
	// }

	function setHeadsFailed(){
		left.setFailed();
		right.setFailed();
	}
	function setHeadsPassed(){
		left.setPassed();
		right.setPassed();
	}
}