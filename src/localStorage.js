export function loadState(key) {
	try {
		const val = localStorage.getItem(key);
		if(val === null) {
			return undefined;
		}
		return val;
	} catch (err) {
		return undefined;
	}
}

export function saveState(key, val) {
	try {
		localStorage.setItem(key, val); 
	} catch (err) {
		console.log(err);
	}
}

export function clearState() {
	try{
		localStorage.clear();
	} catch (err) {
		console.log(err);
	}
}