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
				if(el == "molecule"){
					for(subel in newEls[el]){
						console.log(subel);
						if(out[subel]){
							out[subel] += newEls[el][subel];
						} else {
							out[subel] = newEls[el][subel];
						}
					}
				} else {
					if(out[el]){
						out[el] += newEls[el];
					} else {
						out[el] = newEls[el];
					}
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

	//function for adding molecules to molecules
		var tobedropped = null;
		$(elSide).on("mouseup",triggerAddSubMol);
		function triggerAddSubMol(){
			var dragger = $(".dragging")[0];
			if(dragger){
				tobedropped = dragger.id;
				findMolthatDropped(tobedropped);
			}
		}

		function findMolthatDropped(dropping){
			var addingTo = null;
			var adding = null;
			var toremove = null;
			for(var a =0; a < mols.length; ++a){
				if(mols[a].dropped()){
					addingTo = mols[a];
					mols[a].dropped(false);
				} else if(mols[a].id()==dropping){
					adding = mols[a];
					toremove = a;
				}
			}
			if(toremove || toremove === 0){
				mols.splice(toremove,1);
			}

			if(addingTo && adding){
				addingTo.addSubMol(adding);
				addingTo.renderSubMol();
			} else {
				console.log("something went wrong... element was not dropped on an other element, on the same element as self, something happed out of order...");
				// alert("both elements where not found, most likely because they where the same element!!!");
			}
		}
}








