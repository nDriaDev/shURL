import {useLayoutEffect} from "react";

export default function useMetaDescription(description) {
	useLayoutEffect(() => {
		document.head.querySelector('meta[name="description"]')
			.setAttribute("content",description);
	}, []);
}