"use client";

import TopImage from "@/components/(routes)/home/images/top-images";
import SectionLayout from "@/components/section-layout";
import Wrapper from "@/components/wrapper";

export default function HomeForm() {
  return (
    <>
      <SectionLayout >
        <Wrapper className="h-100 bg-gradient-to-r to-secondary-normal from-pink-normal">
          <TopImage />
        </Wrapper>

      </SectionLayout>
    </>
  );
}
