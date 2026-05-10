import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Global } from '@/styles';
import { zustand } from '@/services';
import { axiosGet, ensureCsrfCookie } from '@/utils';

import AppRoutes from './routes';

import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

const App = () => {
    const { setUser, setChildrenList, setIsAuthenticating } = zustand();

    useEffect(() => {
        const bootstrap = async () => {
            try {
                await ensureCsrfCookie();
                const responseMe = await axiosGet('/auth/me', {});
                const user = responseMe.data.data;

                setUser(user);

                const responseChildren = await axiosGet('/child', {});
                setChildrenList(responseChildren.data.data ?? []);
            } catch (error) {
                setUser(undefined);
                setChildrenList([]);
            } finally {
                setIsAuthenticating(false);
            }
        };

        bootstrap();
    }, [setUser, setChildrenList, setIsAuthenticating]);

    return (
        <SnackbarProvider
            maxSnack={1}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
        >
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Global />
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </LocalizationProvider>
        </SnackbarProvider>
    );
};

export default App;
