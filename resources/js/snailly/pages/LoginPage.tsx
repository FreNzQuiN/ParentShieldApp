import React from 'react';

import { PageWrapper } from '@/layout';
import { LoginModule } from '@/modules';

const LoginPage = () => {
    return (
        <PageWrapper
            layoutType="auth"
            title="Welcome!"
            caption="Enter your email and password to login."
        >
            <LoginModule />
        </PageWrapper>
    );
};

export default LoginPage;
