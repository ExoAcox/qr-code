

interface Props {
    children: React.ReactNode
    onClick: () => void;
    className?: string;
}

const Button: React.FC<Props> = ({ children, onClick, className }) => {
    return <button onClick={onClick} className={`w-full bg-red-400 font-semibold py-2 rounded text-white ${className ?? ""}`}>
        {children}
    </button>
}


export default Button