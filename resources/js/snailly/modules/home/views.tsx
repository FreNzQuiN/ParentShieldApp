import React from "react";

import { Link } from "@/components";
import { Paragraph } from "@/typography";
import { KidsIcon, ParentIcon, LogoSnaily } from "@/assets";

import {
  sHomeModule,
  sHomeModuleRole,
  sHomeModuleLogo,
  sHomeModuleHeading,
  sHomeModuleContent,
  sHomeModuleRoleItem,
  sHomeModuleRoleWrapper,
} from "./styles";

const HomeViews = () => {
  
  return (
    <div className={sHomeModule}>
      <div className={sHomeModuleContent}>
        <div className={sHomeModuleLogo}>
          <LogoSnaily />
        </div>
        <div className={sHomeModuleHeading}>
          <Paragraph variant="l" weight="bold" white>
            Let me know who are you?
          </Paragraph>
          <Paragraph variant="s" white>
            Choose one of those role and click continue to access.
          </Paragraph>
        </div>
        <div className={sHomeModuleRoleWrapper}>
          <Link href="/auth/login">
            <button className={sHomeModuleRole}>
              <div className={sHomeModuleRoleItem}>
                <ParentIcon />
                <Paragraph white>Parent</Paragraph>
              </div>
            </button>
          </Link>
          <Link href="/auth/login-child">
            <button className={sHomeModuleRole}>
              <div className={sHomeModuleRoleItem}>
                <KidsIcon />
                <Paragraph white>Kids</Paragraph>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeViews;
