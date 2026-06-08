function InputNumber({
    divClassName,
    labelClassName,
    name,
    labelText,
    ref,
    min,
    max,
    inputClassName,
    inputOnChange,
    inputOnFocus,
    inputDefaultValue,
    inputValue,
    autoComplete,
    required,
    readOnly,
    maxLength,
    useValue
  }) {
  return (
    <div className={ divClassName }>
      <label className={ labelClassName } htmlFor={ name }>{ labelText }</label><br />
      { !useValue &&
      <input
        ref={ ref }
        type="number"
        placeholder=">"
        min={ min }
        max={ max }
        className={ inputClassName }
        onChange={ inputOnChange }
        onFocus={ inputOnFocus }
        name={ name }
        id={ name }
        defaultValue={ inputDefaultValue }
        autoComplete={ autoComplete }
        required={ required }
        readOnly={ readOnly }
        maxLength={ maxLength }
      />
      }
      { useValue &&
      <input
        ref={ ref }
        type="number"
        placeholder=">"
        min={ min }
        max={ max }
        className={ inputClassName }
        onChange={ inputOnChange }
        onFocus={ inputOnFocus }
        name={ name }
        id={ name }
        value={ inputValue }
        autoComplete={ autoComplete }
        required={ required }
        readOnly={ readOnly }
        maxLength={ maxLength }
      />
      }
    </div>
  );
}

export default InputNumber;
