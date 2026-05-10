import React from 'react';

import { PageWrapper } from '@/layout';
import { RegisterModule } from '@/modules';

const RegisterPage = () => {
    return (
        <PageWrapper
            layoutType="auth"
            title="Welcome!"
            caption="Enter your email and password to register."
        >
            <RegisterModule />
        </PageWrapper>
    );
};

export default RegisterPage;
