import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";

const spinner = atom({value: false, counter:0});
const spinnerAtom = atom(
	(get) => get(spinner).value,
	(get, set, newValue) => {
		let {counter} = get(spinner);
		if(newValue) {
			set(spinner, {value: true, counter: counter+1});
		} else {
			set(spinner, {value: counter>1, counter: counter>1?counter-1: 0});
		}
	}
);
export default spinnerAtom;
