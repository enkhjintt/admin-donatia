type IProps = { length: number };

const ValueCounter: React.FC<IProps> = ({ length }) => {
  return (
    <div>
      <span className="font-semibold">{length}</span> илэрц
    </div>
  );
};

export default ValueCounter;
