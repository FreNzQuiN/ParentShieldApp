import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { zustand } from '@/services';

import { axiosGet, displayErrorMessage } from '@/utils';
import { useSnackbar } from 'notistack';
import LoginChildViews from './views';

const LoginChild = () => {
  const state = zustand();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const childAccountButtonHandler = async (data: {
    child_id: string;
    token: string;
  }) => {
    try {
      setIsLoading(true);
      await axiosGet('/auth/me', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      await axiosGet(
        `/classified-url/dangerous-website/${data.child_id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      // Note: systemTray functionality is desktop-only
      // In web context, child mode is not currently implemented
      enqueueSnackbar('Child mode is not available in web version', { variant: 'info' });
    } catch (error) {
      displayErrorMessage(error, enqueueSnackbar);
    } finally {
      setIsLoading(false);
      navigate('/home');
    }
  };

  return (
    <LoginChildViews
      childrenList={state.childrenList}
      childAccountButtonHandler={childAccountButtonHandler}
      isLoading={isLoading}
    />
  );
};

export default LoginChild;
