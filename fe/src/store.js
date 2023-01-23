import {create} from "zustand";

const store = create((set, get) => ({
	spinner: {
		value: false,
		counter: 0
	},
	enableSpinner: () => set(state => {
		if(state.spinner.counter === 0) {
			return {
				...state,
				spinner: {
					value: true,
					counter: 1
				}
			}
		} else {
			return {
				...state,
				spinner: {
					value: true,
					counter: state.spinner.counter++
				}
			}
		}
	})	,
	disableSpinner: () => set(state => {
		if(state.spinner.counter === 0) {
			return state;
		} else if(state.spinner.counter === 1) {
			return {
				...state,
				spinner: {
					value: false,
					counter: 0
				}
			}
		} else {
			return {
				...state,
				spinner: {
					value: true,
					counter: state.spinner.counter--
				}
			}
		}
	})
}))

export default store;