import React from 'react';

import { PageWrapper } from '@/layout';
import { SettingModule } from '@/modules';
import { withAuth } from '@/hoc';

const SettingPage = () => {
    return (
        <PageWrapper layoutType="base" title="Settings">
            <SettingModule />
        </PageWrapper>
    );
};

export default withAuth(SettingPage);
