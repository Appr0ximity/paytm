export function InputBox({label, placeholder, type, value, onChange}){
    return(<div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type={type?type:""} onChange={onChange} value={value} placeholder={placeholder} className="w-full px-2 py-1 border rounded-md"></input>
    </div>)
}