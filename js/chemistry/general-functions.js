function createEl(eltype,classN,inner,click){
	var out = document.createElement(eltype);
	if(classN){
		out.className = classN;
	}
	if(inner){
		out.innerHTML = inner;
	}
	if(click){
		$(out).click(click);
	}
	return out;
}

function createInput(inputType,classN,value,click){
	var out = document.createElement("input");
	out.type = inputType;
	if(classN){
		out.className = classN;
	}
	if(value){
		out.value = value;
	}
	if(click){
		$(out).click(click);
	}
	return out;
}

function countkeys(object){
	var counter = 0;
	for(k in object){
		counter++;
	}
	return counter;
}

function objectToString(objin){
	var out = "";
		for(k in objin){
			out += k + " " + objin[k] + ", ";
		}
	return out;
}

function roundToSix(value){
	return Math.round(value*1000000)/1000000;
}
