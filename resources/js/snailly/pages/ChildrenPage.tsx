import React from 'react';

import { PageWrapper } from '@/layout';
import { ChildrenModule } from '@/modules';
import { withAuth } from '@/hoc';

const ChildrenPage = () => {
    return (
        <PageWrapper layoutType="base" title="Children Data">
            <ChildrenModule />
        </PageWrapper>
    );
};

export default withAuth(ChildrenPage);
