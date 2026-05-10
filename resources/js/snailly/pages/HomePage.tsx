import React from 'react';

import { PageWrapper } from '@/layout';
import { HomeModule } from '@/modules';

const HomePage = () => {
    return (
        <PageWrapper layoutType="plain">
            <HomeModule />
        </PageWrapper>
    );
};

export default HomePage;
