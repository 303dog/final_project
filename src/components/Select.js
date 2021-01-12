import React from "react";

function Select(props) {
    return (
        <select onChange={props.handleOnChange}>
            {props.options.map((value, index) => (
                <option key={index} value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}

export default Select;