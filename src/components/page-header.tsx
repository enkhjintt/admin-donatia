import BreadCrumb from "./breadcrumb";
import Button from "./button";
import Title from "./title";
import TopBar from "./layout/topbar/topbar";
import Link from "next/link";
import Wrapper from "./wrapper";

type IProps = {
  title: string;
  links?: {
    href: string;
    label: string;
    noLink?: boolean;
  }[];
  button?: React.ReactNode;
  secondButton?: React.ReactNode;
  hidden?: boolean;
  backUrl?: string;
};

const PageHeader: React.FC<IProps> = ({
  title,
  links,
  button,
  secondButton,
  hidden,
  backUrl,
}) => {
  return (
    <Wrapper>
      <div className="flex justify-between p-4">
        <div className="flex justify-between w-full  border-solid">
          <div>
            <Title className="text-gray-700" title={title} />

            {links && <BreadCrumb links={links} />}
          </div>
        </div>

        <div className="flex items-center  gap-4 ">
          {backUrl && (
            <Link href={backUrl}>
              <Button placeholder="Буцах"></Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <div>{!hidden && secondButton}</div>
            <div>{!hidden && button}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PageHeader;
