import {atom} from "jotai";

const messages = atom({
	info: [],
	success: [],
	warning: [],
	error: []
});

const messagesAtom = atom(
	get => get(messages),
	(get, set, payload) => {
		let mess = get(messages);
		if(!payload) {
			set(messages, {
				info: [],
				success: [],
				warning: [],
				error: []
			})
		} else {
			set(messages, m => ({
				...m,
				[payload.type]: payload.reset ?
					[]
					:
					m[payload.type].includes(payload.message) ?
						[...m[payload.type]]
						:
						[...m[payload.type], payload.message]
			}))
		}
	}
)

export default messagesAtom;