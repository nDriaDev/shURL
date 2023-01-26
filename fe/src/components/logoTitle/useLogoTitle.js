import {useEffect, useRef, useState} from "react";
import CONSTANTS from "../../utils/constants.js";

/**
 *
 * @returns {{classes: {translateText2: string, translateText1: string, containerText: string, hideText: string}}}
 */
const useLogoTitle = () => {
	const [classes, setClasses] = useState({
		containerText: '',
		translateText1: '',
		hideText: '',
		translateText2: ''
	});

	const mount = useRef(true);

	useEffect(() => {
		if(mount.current) {
			mount.current = false;
			if(sessionStorage.getItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED)) {
				setClasses({
					containerText: 'text',
					translateText1: 'translate-text-1',
					hideText: 'hide-text',
					translateText2: 'translate-text-2'
				});
			} else {
				sessionStorage.setItem(CONSTANTS.STORAGE_VARS.TITLE_VIEWED, "true");
				setClasses({
					containerText: 'text animate',
					translateText1: 'translate-text-1 animate',
					hideText: 'hide-text animate',
					translateText2: 'translate-text-2 animate',
				});
			}
		}
	}, []);

	return {
		classes
	}
};

export default useLogoTitle;