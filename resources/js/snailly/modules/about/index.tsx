import { sAbout, sAboutLogo, sAboutDodo } from "./styles";

import { LogoSnailyGreen } from "@/assets";
import { Paragraph } from "@/typography";
import { DodoLoginSmall } from "@/assets";

const AboutModule = () => {
    return (
        <>
            <div className={sAbout}>
                <div className={sAboutLogo}>
                    <LogoSnailyGreen />
                </div>
                <Paragraph variant="s" weight="normal" darkGreen>
                    Snailly: Safe browsing for the children <br />
                    version 1.0 &copy;<br />
                    Copyright 2024 UNIKOM CODELABS. <br />
                    All rights reserved. <br />
                </Paragraph>
                <Paragraph variant="s" weight="normal" darkGreen>
                    Snailly is an application for parents to control and supervise their children's activities on the internet, where children can explore the world of the internet safely and parents will not worry about the dangers of the internet.
                </Paragraph>
                <div className={sAboutDodo}>
                    <DodoLoginSmall />
                </div>
            </div>
        </>
    );
};

export default AboutModule;
