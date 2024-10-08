import './styles.css'

const ButtonAnimation = ({
    children,
    className,
    onClick,
}: {
    children: string
    className: string
    onClick: () => void
}) => {
    return (
        <button onClick={onClick}>
            <span className={`button_top ${className}`}>{children}</span>
        </button>
    )
}

export default ButtonAnimation
