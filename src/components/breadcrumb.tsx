import Link from "next/link";
import Image from "next/image";
import Dot from "@../../../public/svg/dot.svg";

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
            <p className="font-normal text-sm text-gray-700 cursor-not-allowed">
              {link.label}
            </p>
          ) : (
            <>
              <Link
                href={link.href}
                className="font-normal text-sm cursor-pointer text-gray-500"
              >
                {link.label}
              </Link>

              <span className={"text-gray-500"}>
                {index < links.length - 1 && (
                  <Image
                    src={Dot}
                    alt=""
                    width={3}
                    height={3}
                    className="mx-3"
                  />
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
