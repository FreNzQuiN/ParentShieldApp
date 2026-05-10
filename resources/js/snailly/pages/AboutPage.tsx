import React from 'react';

import { PageWrapper } from '@/layout';
import { AboutModule } from '@/modules';
import { withAuth } from '@/hoc';

const AboutPage = () => {
    return (
        <PageWrapper layoutType="base" title="About">
            <AboutModule />
        </PageWrapper>
    );
};

export default withAuth(AboutPage);
