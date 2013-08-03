function Molecule(parent){
	var el = [];
	var quantity = 1;
	var totalMass;
	var totalAMass;
	var mols;

	// creating the elements
		var elMol = createEl("span","mole");

		//mol Menu
		var elMolMenue = createEl("span", "mol-menue");
		var elSelectEl = createEl("select");
		elSelectEl.className = "change-quantity";
		$(arrayofelemenysymbols).each(function(index){
			var el = document.createElement("option");
			el.value=arrayofelemenysymbols[index];
			el.innerHTML = arrayofelemenysymbols[index];
			elSelectEl.appendChild(el);
		});
		var eladdEl = createEl("span","button change-quantity","add",addEl);
		var elEldetails = createEl("span","mol-detailbutton button change-quantity ","&#9776;",detailView);

		//element container
		var elContainer = createEl("div");
		var elQuantity = createEl("span");

		//add and sub buttons
		var elAdd = createEl("span","button change-quantity","+",addMol);
		var elSub = createEl("span","button change-quantity","-",subMol);

		//mass outcomes
		var elMassContainer = createEl("span","change-mass hide");
		var elInputMass = createInput("number","change-mass hide");
		$(elInputMass).on("change",massInputChange);
		var elUnits = createEl("span",0,"g");
		var elInputMols = createInput("number","change-mass hide");
		var elUnitsMols = createEl("span",0,"mol");
		$(elInputMols).on("change",molsInputChange);
		var elMassOutcome = createEl("span","change-mass hide");

		parent.appendChild(elMol);

		elMol.appendChild(elMolMenue);
		elMolMenue.appendChild(elSelectEl);
		elMolMenue.appendChild(eladdEl);
		elMolMenue.appendChild(elEldetails);

		elMol.appendChild(elContainer);
		elContainer.appendChild(elQuantity);

		elMol.appendChild(elAdd);
		elMol.appendChild(elSub);

		elMol.appendChild(elMassContainer);
		elMassContainer.appendChild(elInputMols)
		elMassContainer.appendChild(elUnitsMols);
		elMassContainer.appendChild(elInputMass)
		elMassContainer.appendChild(elUnits);
		elMassContainer.appendChild(elMassOutcome);




	// if not argumenents then it adds 1 to quantity, if argument, quantity is then argument
	function addMol(multipleMols){
		if(multipleMols>0){			//might fail because not testing type!
			quantity = multipleMols;
		} else {
			++quantity;
		}
		if(quantity != 1){
			elQuantity.innerHTML = quantity;
		}
	}

	//subtraction and removal of elements, asks for confirmation of deletion
	function subMol(){
		--quantity;
		if(quantity > 1){
			elQuantity.innerHTML = quantity;
		} else {
			elQuantity.innerHTML = "";
		}
		if(quantity < 1 && confirm("do you want to delete the molecule")){
			elMol.parentNode.removeChild(elMol);
			el = 0;
		} else if(quantity<1){
			quantity = 1;
		}
	}

	//add new element based off of what is selected in elSelectEl
	function addEl(){
		el.push(new Element(elSelectEl.value,elContainer));
	}

	//returns array of el with total quantities
	this.provideElements = function(){
		var out = {};
		$(el).each(function(index){
			var elin = el[index].value();
			if(elin["quantity"] > 0){
				if(out[elin["element"]]){
					out[elin["element"]] += elin["quantity"]*quantity;
				} else {
					out[elin["element"]] = elin["quantity"]*quantity;
				}
			} else {
				el.splice(index,1);
			}
		});
		return out;
	}

	//when input of mass is changed triggers calculation
	function massInputChange(){
		totalMass = elInputMass.value*1;
		if(totalMass){
			findAMass();
			mols = totalMass/totalAMass;
			elInputMols.value = mols;
			elMassOutcome.innerHTML = "<br>" + roundToSix(mols) + "mol<br>" + roundToSix(totalMass) + "g";
		}
	}

	//when input of Mols is changed triggers calculation
	function molsInputChange(){
		mols = elInputMols.value*1;
		if(mols){
			findAMass();
			totalMass = mols*totalAMass;
			elInputMass.value = totalAMass;
			elMassOutcome.innerHTML = "<br>" + roundToSix(mols) + "mol<br>" + roundToSix(totalMass) + "g";
		}
	}

	//zeros the molecule so that we can find the lowest denominator properly for second time running equation
	this.resetBasedOffInputMass = function(){
		totalAMass = NaN;
		totalMass = NaN;
		mols = NaN;
		elMassOutcome.innerHTML="";
		massInputChange();
	}

	//determine the mass of Molecules
	function findAMass(){
		totalAMass = 0;
		for(var a = 0; a < el.length; ++a){
			totalAMass += el[a].aMass()*el[a].quantity();
		}
	}

	//determine the mass of Molecules
	function findMassFromMols(){
		if(mols){
			totalMass = mols*totalAMass;
		} else {
			console.log("couldn't calc findMassFromMols because no MOLS given")
		}
	}

	//for assigning mols, used in assigning the limiting # of elements
	//if no Arg returns and calcs mols of el
	this.mols = function(newMols){
		if(newMols){
			elInputMass.value = NaN;
			elInputMols.value = NaN;
			mols = newMols;
			findAMass();
			findMassFromMols();
			elMassOutcome.innerHTML = "<br>" + roundToSix(mols) + " mols<br>" + roundToSix(totalMass) + " g";
		} else {
			mols = totalMass/totalAMass;
			return mols
		}
	}

	this.quantity = function(){return quantity;}

	//input would be addMolAndEl(3,[{"elName":"H","quan":2},{"elName":"O","quan":1}])
	this.addMolAndEl = function(molsQuant, elementsToAdd){
		for(var i = 0; i < elementsToAdd.length; ++i){
			el.push(new Element(elementsToAdd[i]["elName"],elContainer,elementsToAdd[i]["quan"]))
		}
		addMol(molsQuant);
	}


	////// the detail view ///////////
		//creating the elements
		var container = createEl("div", "overlay");
		var close = createEl("div","over-close button","x",closeover)

		//structure
		var elStructureContainer = createEl("div","change-structure structure-container");
		var elStructureTitle = createEl("span","change-structure structure-title","Structure")
		var elStructureAvailable = createEl("span","change-structure");
		var elStructureNeeded = createEl("span","change-structure");
		var elStructureBonds = createEl("span","change-structure");

		container.appendChild(elStructureContainer);
		elStructureContainer.appendChild(elStructureTitle);
		elStructureContainer.appendChild(elStructureAvailable);
		elStructureContainer.appendChild(elStructureNeeded);
		elStructureContainer.appendChild(elStructureBonds);

		var placeholder = createEl("div","place-holder","There will be means to render Molecules here!");

		container.appendChild(placeholder);


	function detailView(){
		document.body.appendChild(container);
		container.appendChild(close);
		calcStructure();
	}

	function calcStructure(){
		var totalAvailableElectrons = 0;
		var totalNeededElectrons = 0;
		for(var a = 0; a < el.length; ++a){
			var thisEl = el[a].structure();
			totalAvailableElectrons += thisEl[0];
			totalNeededElectrons += thisEl[1];
		}
		elStructureAvailable.innerHTML = totalAvailableElectrons + " Available Electrons " + "<br>";
		elStructureNeeded.innerHTML = totalNeededElectrons + " Needed Electrons " + "<br>";
		elStructureBonds.innerHTML = ((totalNeededElectrons-totalAvailableElectrons)*0.5) + " Total Bonds " + "<br>";
	}

	function closeover(){
		var toRemove = $(".overlay")[0];
		toRemove.parentNode.removeChild(toRemove);
	}

}