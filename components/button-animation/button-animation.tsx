import './styles.css'

const ButtonAnimation = ({ children }: { children: string }) => {
    return (
        <button>
            <span className="button_top">{children}</span>
        </button>
    )
}

export default ButtonAnimation
