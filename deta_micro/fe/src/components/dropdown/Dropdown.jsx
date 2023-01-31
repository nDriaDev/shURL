import {Fragment, memo, useCallback, useId, useMemo, useState} from "react";
import './Dropdown.css';
import {bool, object, oneOf, string} from "prop-types";

const Dla = ({children})=>{
	return (<>
		{children}
	</>);
}
const DropdownLabel = memo(Dla);
DropdownLabel.displayName = "DropdownLabel";

const Dl = ({alignRight, className, style, children}) => {
	const idElement = useId();
	const classes = "dropdown-content " + (className || "") + (alignRight ? " right" : "");
	const styles = style || {};
	const elements = useMemo(() => (
		Array.isArray(children) ?
			children.map((el, index) => {
				let key=idElement+'-'+index;
				return (
					<Fragment key={key}>
						{el}
					</Fragment>
				)
			})
			:
			children
	), [children]);

	return (
		<div className={classes} style={styles}>
			{elements}
		</div>
	);
}
const DropdownList = memo(Dl);
DropdownList.displayName = "DropdownList";
DropdownList.propTypes = {
	alignRight: bool,
	className: string,
	style: object,
}

const Di = ({className, style, onClick, children}) => {
	const classes = "dropdown-item " + (className || "");
	const styles = style || {};
	const clickHandler = useMemo(() => {
		if(!onClick) {
			return {};
		} else {
			return {onClick}
		}
	}, [onClick]);
	return (
		<div className={classes} style={styles} {...clickHandler}>
			{children}
		</div>
	)
};

const DropDownItem = memo(Di);
DropDownItem.displayName = "DropdownItem";
DropDownItem.propTypes = {
	className: string,
	style: object
}

const Dc = ({type, className, style, children}) => {
	if(!Array.isArray(children) || children.length !== 2) {
		throw Error("DropdownContainer must have DropdownLabel and DropdownList as children")
	}
	if(children[0].type.displayName !== DropdownLabel.displayName) {
		throw Error("DropdownContainer child not is DropdownLabel")
	}
	if(children[1].type.displayName !== DropdownList.displayName) {
		throw Error("DropdownContainer child not is DropdownList")
	}

	const styles = style || {};
	const [clicked, setClicked] = useState(false);

	const openDropDown = useCallback(e => {
		setClicked(c => !c);
	}, []);

	const classes = useMemo(() => {
		if(type === "hover") {
			return "dropdown hover " + (className || "");
		} else {
			return "dropdown" + (clicked ? " clickable" : " ") + (className || "");
		}
	}, [clicked, type]);

	const onClick = useMemo(() => {
		return type === "hover" ? {} : {onClick: openDropDown}
	}, [type]);

	return (
		<div className={classes} style={styles} {...onClick}>
			{children}
		</div>
	)
}
const DropdownContainer = memo(Dc)
DropdownContainer.displayName = "DropdownContainer";
DropdownContainer.propTypes = {
	type: oneOf(["hover", "clickable"]).isRequired,
	className: string,
	style: object,
}
// const Dropdown = ({children}) => {
// 	const id = useId();
// 	const options = useMemo(() => children.filter((el, index) => index!==0), [children]);
// 	const elements = useMemo(() => {
// 		return (
// 			<div className="dropdown-content">
// 				{options.map((el, index) => (
// 					<Fragment key={id+"-"+index}>
// 						{el}
// 					</Fragment>
// 				))}
// 			</div>
// 		)
// 	}, [options]);
// 	return (
// 		<div className="dropdown" role="dropdown">
// 			{children[0]}
// 			{elements}
// 		</div>
// 	)
// };

export const Dropdown = {
	DropdownLabel,
	DropDownItem,
	DropdownList,
	DropdownContainer
};

export {DropdownContainer, DropdownLabel, DropDownItem, DropdownList};