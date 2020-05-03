import React from "react";
import PropTypes from "prop-types";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  render() {
    // const { value } = this.state;
    const { options, onChangeHandler, value } = this.props;
    return (
      <select onChange={onChangeHandler} value={value}>
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    );
  }
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Select;
