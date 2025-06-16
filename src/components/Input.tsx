

interface Props {
    value: string;
    onChange: (value: string) => void
    placeholder?: string;
}

const Input: React.FC<Props> = ({ value, onChange, placeholder }) => {
    return <div className="px-2 py-3 bg-gray-100 rounded-lg">
        <input className="bg-gray-100 px-2" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
}


export default Input