interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => (
    <div className={`px-5 md:px-20 lg:px-50 ${className}`}>
        {children}
    </div>
)

export default Container;