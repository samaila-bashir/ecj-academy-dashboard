interface TextInputProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  columnMd?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  columnMd = "col-md-6",
}) => {
  return (
    <div className={`${columnMd} mb-3`}>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className={`form-control ${error && touched ? "is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched ? <div className="text-danger">{error}</div> : null}
    </div>
  );
};

export default TextInput;
