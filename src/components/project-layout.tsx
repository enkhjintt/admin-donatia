type IProps = {
  children: React.ReactNode;
};

const ProjectLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">
      <div className="row-span-2">{children}</div>
      <div className="col-span-2">{children}</div>
      <div className="row-span-1 col-span-2">{children}</div>
    </div>
  );
};

export default ProjectLayout;
