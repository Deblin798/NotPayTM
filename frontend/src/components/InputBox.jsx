const InputBox = ({label, placeHolder, onChange}) => {
  return (
    <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeHolder} className="w-full px-2 py-1 border rounded border-slate-200" onChange={onChange} required={true}/>
    </div>
  )
}

export default InputBox