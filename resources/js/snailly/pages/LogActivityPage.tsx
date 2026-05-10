import React from 'react';

import { PageWrapper } from '@/layout';
import LogActivityModule from '@/modules/log-activity';
import { withAuth } from '@/hoc';

const LogActivityPage = () => {
    return (
        <PageWrapper layoutType="base" title="Log Activity">
            <LogActivityModule />
        </PageWrapper>
    );
};

export default withAuth(LogActivityPage);
