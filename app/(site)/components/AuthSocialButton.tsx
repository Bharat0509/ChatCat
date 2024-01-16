import { IconType } from "react-icons";
interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick,
}) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className='inline-flex  justify-center rounded-md bg-white p-4 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-200 focus:outline-offset-0 w-fit'
        >
            <Icon size={20} />
        </button>
    );
};

export default AuthSocialButton;
