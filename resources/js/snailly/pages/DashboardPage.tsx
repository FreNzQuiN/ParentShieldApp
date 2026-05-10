import React from 'react';

import { PageWrapper } from '@/layout';
import { DashboardModule } from '@/modules';
import { withAuth } from '@/hoc';

const DashboardPage = () => {
    return (
        <PageWrapper layoutType="base" title="Dashboard">
            <DashboardModule />
        </PageWrapper>
    );
};

export default withAuth(DashboardPage);
