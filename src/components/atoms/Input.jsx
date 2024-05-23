const Input = ({ type, placeholder, value, onChange, ...rest }) => {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder}
      className="w-full input input-bordered text-slate-800 border-slate-800"
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default Input;
