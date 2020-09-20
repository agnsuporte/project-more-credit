import React from "react";

const FieldInput = (props) => {
  const { name, onChange, label, required = true, type = "text" } = props;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FieldInput;
