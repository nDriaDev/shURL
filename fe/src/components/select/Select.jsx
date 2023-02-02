import {memo, useCallback, useId, useMemo} from "react";
import {arrayOf, shape, any, bool, func, object, string, oneOfType} from "prop-types";

const Select = ({className, style, value, disabled, onChange, list, firstEmptyOption, placeholder}) => {
	const id = useId();

	const firstEmpOpt = useMemo(() => (
		<opt value="" disabled={true}></opt>
	), []);

	const firstPlaceholderOpt = useMemo(() => (
		<opt value="" disabled={true}>{placeholder}</opt>
	), [placeholder]);

	const options = useMemo(() => {
		let opts = list.map((el,index) => {
			if(el.optionsGroupLabel) {
				let options = el.optionsGroupOptions.map((el2, index2) => (
					<option
						key={id+"-"+index+"-"+index2}
						value={el2.value}
						disabled={el2.disabled || false}
						className={el2.className || ""}
						style={el2.style || {}}
					>
						{el2.label}
					</option>
				));
				placeholder ? (options = [firstPlaceholderOpt, ...options]) : firstEmptyOption ? (options = [firstEmpOpt, ...options]) : null;
				return (
					<optgroup
						key={id+"-"+index}
						label={el.optionsGroupLabel}
						disabled={el.optionsGroupDisabled || false}
						className={el.optionsGroupClassName || ""}
						style={el.optionsGroupStyle || {}}
					>
						{options}
					</optgroup>
				)
			} else {
				return(
					<option
						key={id+"-"+index}
						value={el.value}
						disabled={el.disabled || false}
						className={el.className || ""}
						style={el.style || {}}
					>
						{el.label}
					</option>
				)
			}
		});
		list[0] && !list[0]?.optionsGroupLabel && placeholder ? (opts = [firstPlaceholderOpt, ...opts]) : firstEmptyOption ? (opts = [firstEmpOpt, ...opts]) : null;
		return opts
	}, [list, firstPlaceholderOpt, placeholder, firstEmptyOption]);

	const onChangeSelect = useCallback(e => {
		onChange(e.target.value);
	}, [onChange]);

	return (
		<select
			className={className || ""}
			style={style || {}}
			value={value}
			disabled={disabled || false}
			onChange={onChangeSelect}
		>
			{options}
		</select>
	)
}

Select.displayName = "Select";

Select.propTypes = {
	className: string,
	style: object,
	value: any,
	disabled: bool,
	onChange: func,
	firstEmptyOption: bool,
	placeholder: string,
	list: arrayOf(
		oneOfType([
			shape({
			label: string.isRequired,
			value: any.isRequired,
			disabled: bool,
			className: string,
			style: object
			}),
			shape({
				optionsGroupLabel: string.isRequired,
				optionsGroupDisabled: bool,
				optionsGroupClassName: string,
				optionsGroupStyle: object,
				optionsGroupOptions: shape({
					label: string.isRequired,
					value: any.isRequired,
					disabled: bool,
					className: string,
					style: object
				})
			})
		])
	).isRequired
}

export default memo(Select);