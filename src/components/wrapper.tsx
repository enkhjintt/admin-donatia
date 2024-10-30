type IProps = { children: React.ReactNode; className?: string };

const Wrapper: React.FC<IProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} bg-base-white border-gray-200 rounded-lg shadow-lg`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
