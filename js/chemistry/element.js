function Element(elname, parent, quantityIn){
	//creating element
		var element = ptable({symbol:elname}).first();
		var quantity = 1;
		var mass;
		var mols;
		if(quantityIn){
			quantity = quantityIn;
		}

		var elContainer = createEl("div","el-container");
		var elName = createEl("span","el-name",element.symbol);
		var elQuantity = createEl("span","el-quan",quantity);
		var elinfo = createEl("span","el-info")
		var elAdd = createEl("span","button change-quantity","+",add);
		var elSub = createEl("span","button change-quantity","-",sub);
		var elStrucNeed = createEl("span","change-structure hide");

		parent.appendChild(elContainer);
		elinfo.appendChild(elName);
		elinfo.appendChild(elQuantity);
		elContainer.appendChild(elinfo);
		elContainer.appendChild(elStrucNeed);
		elContainer.appendChild(elAdd);
		elContainer.appendChild(elSub);

	function add(){
		++quantity;
		elQuantity.innerHTML = quantity;
	}

	function sub(){
		--quantity;
		elQuantity.innerHTML = quantity;
		if(quantity < 1){
			elContainer.parentNode.removeChild(elContainer);
		}
	}

	this.value = function(){
		return {"element":element.symbol,"quantity":quantity,"awieght":element.atomic_weight};
	}

	this.quant = function(){
		return quantity;
	}

	this.mass = function(newMass){
		if(newMass){
			mass = newMass;
		} else {
			return mass;
		}
	}
	this.mols = function(newMols){
		if(newMols){
			mols = newMols;
		} else {
			return mols;
		}
	}
	this.aMass = function(){
		return element.atomic_weight;
	}
	this.element = function(){
		return element.symbol;
	}
	this.quantity = function(newQuantity){
		if(newQuantity){
			quantity = newQuantity;
		} else {
			return quantity;
		}
	}

	//returns [available electrons, needed electrons]
	this.structure =function(){
		elStrucNeed.innerHTML = element.eNeed;
		return [element.tVa*quantity,element.eNeed*quantity]
	}
}


/*{
	"named_type": "Other_nonmetals", 
	"eNeed": 8,
	"atomic_weight": 12.011, 
	"ionic_radius pm": "", 
	"melting_point K": 3820, 
	"tE": 6, "atomic_radius pm": 91, 
	"specific_heat (@20\u00b0C J/g mol)": 0.711, 
	"group": "14", 
	"density g/cm": "2.25 (graphite)", 
	"fusion_heat (kJ/mol)": "-", 
	"type": "nonmetals", 
	"lattice_structure": "DIA", 
	"pauling_negativity": 2.55, 
	"atomic_number": 6, 
	"thermal_conductivity (@25\u00b0C W/m K) ": 1.59, 
	"symbol": "C", 
	"first_ionizing kJ/mol": 1085.7, 
	"base": "He", 
	"oxidation_states": "4, 2, -4", 
	"evaporation_heat (kJ/mol)": "-", 
	"covalent_radius pm": 77, 
	"valence": [
		{"loc": "2", "type": "s", "e": "2"}, 
		{"loc": "2", "type": "p", "e": "2"}
		], 
	"boiling_point K": 5100, 
	"element": "Carbon", 
	"lattice_constant ang": 3.57, 
	"electronic_configuration": 
	"[He]2s\u00b22p\u00b2", 
	"atomic_volume cm3/mol": 5.3, 
	"tVa": 4
	}
*/