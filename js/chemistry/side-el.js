function Sideofel(title){
	//creating elements
		var elSide = createEl("div","side");
		var elTitle = createEl("h1",0,title);
		var elError = createEl("span","error-side");
		var eladdmol = createEl("span","button change-quantity","make new molecule",addEl);

		document.body.appendChild(elSide);
		elSide.appendChild(elTitle);
		elSide.appendChild(elError);
		elSide.appendChild(eladdmol);

	var mols = [];
	var limiting = false;

	function addEl(){
		mols.push(new Molecule(elSide));
	}

	this.listofelements = function(){
		return getElements();
	}

	function getElements(){
		var out = {};
		$(mols).each(function(index){
			var newEls = mols[index].provideElements();
			for(el in newEls){
				if(out[el]){
					out[el] += newEls[el];
				} else {
					out[el] = newEls[el];
				}
			}
		});
		return out;
	}

	this.findLimiting = function(){
		for(var a =0; a < mols.length; ++a){
			mols[a].resetBasedOffInputMass();
			var molsOfCurrent = mols[a].mols()/mols[a].quantity();
			if(!limiting || molsOfCurrent < limiting){
				limiting = molsOfCurrent;
			}
		}
		applyLimitting();
		return limiting;
	}

	function applyLimitting(){
		for(var a =0; a < mols.length; ++a){
			mols[a].mols(limiting*mols[a].quantity());
		}
	}

	this.limiting = function(inlimit){
		if(inlimit < limiting || !limiting){
			limiting = inlimit;
			applyLimitting();
		}
	}

	this.givingMols = function(){

	}

	this.setFailed = function(){
		$(elTitle).removeClass("balanced-equation");
		$(elTitle).addClass("failed-equation");
	}

	this.setPassed = function(){
		$(elTitle).removeClass("failed-equation");
		$(elTitle).addClass("balanced-equation");
	}

	this.setError = function(errorin){
		elError.innerHTML = errorin;
	}
	// {"molsQuan":3,"elements":[{"elName":"H","quan":2},{"elName":"O","quan":1}]}
	this.addMolsAddEl = function(elementsIn){
		for(var a = 0 ; a < elementsIn.length; ++a){
			mols.push(new Molecule(elSide));
			mols[a].addMolAndEl(elementsIn[a]["molsQuan"],elementsIn[a]["elements"]);
		}
	}

	this.resetMass = function(){
		limiting = false;
		for(var a =0; a < mols.length; ++a){
			mols[a].resetBasedOffInputMass();
		}
	}

}