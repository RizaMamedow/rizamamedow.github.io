interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => (
    <div className={`px-10 md:px-50 ${className}`}>
        {children}
    </div>
)

export default Container;