import Link from "next/link";
import DotIcon from "./icons/dot-icon";

type IProps = {
  links: {
    href: string;
    label: string;
    noLink?: boolean;
  }[];
};

const BreadCrumb: React.FC<IProps> = ({ links }) => {
  return (
    <li className="flex mt-0.5">
      {links.map((link, index) => (
        <div key={index} className="flex items-center justify-center">
          {link.noLink ? (
            <p className="font-normal text-lg text-gray-700 cursor-not-allowed">
              {link.label}
            </p>
          ) : (
            <>
              <Link
                href={link.href}
                className="font-normal text-lg cursor-pointer text-gray-700 hover:text-primary-normal"
              >
                {link.label}
              </Link>
              <span className={"text-gray-500"}>
                {index < links.length - 1 && (
                  <div className="mx-4">
                    <DotIcon />
                  </div>
                )}
              </span>
            </>
          )}
        </div>
      ))}
    </li>
  );
};

export default BreadCrumb;
