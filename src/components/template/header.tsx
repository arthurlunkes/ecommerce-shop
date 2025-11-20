interface propsHeader {
  title: string;
  icon?: React.ReactNode;
}

const Header: React.FC<propsHeader> = ({ title }: propsHeader) => {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
}

export default Header;