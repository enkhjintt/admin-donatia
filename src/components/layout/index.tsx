import MaxWidthWrapper from '../max-width-wrapper';
import Footer from './footer/footer';
import SideBar from './sidebar/sidebar';
import TopBar from './topbar/topbar';

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className={`w-full h-screen`}>
      <TopBar />

      <SideBar
        collapsed={false}
        toggleCollapsed={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default PageLayout;
