import React, {ChangeEvent, useEffect, useState} from "react";
import { useSnackbar } from "notistack";

import { zustand } from "@/services";
import { axiosGet, axiosPut, displayErrorMessage } from "@/utils";

import { SettingForm, CurrentUser } from "./types";
import SettingView from "./views";

const SettingModule = () => {
    const { enqueueSnackbar } = useSnackbar();

    const state = {
      user: zustand((zustandState) => zustandState.user),
    };
    const { user } = state;

    const defaultSettingForm: SettingForm = {
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<SettingForm>({
        ...defaultSettingForm,
    })
    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        id: "",
        email: "",
        name: "",
    })

    const inputFormOnChange = (element: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = element.target;

        setData({
            ...data,
            [name]: value,
        });
    };

    const getCurrentUser = async () => {

        try {
            const response = await axiosGet("/auth/me", {
                headers: {
                Authorization: `Bearer ${user.accessToken}`,
                },
            });

            const responseData = response.data.data;
            setCurrentUser(responseData);
                
            // Update the data state with the currentUser values
            setData({
                name: responseData.name,
                email: responseData.email,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error){
            displayErrorMessage(error, enqueueSnackbar);
        } finally {
            setIsLoading(false);
        }
    }


    const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
        const { newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Password tidak sama", { variant: "error" });

            setIsLoading(false);

            return;
        }

        enqueueSnackbar("Mengubah password akun", { variant: "info" });
        
        try {
          const response = await axiosPut(
            `/profile/${currentUser.id}`,
            {
              ...data,
            },
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );
          const responseData = response.data;

          setData({ ...data, ...defaultSettingForm });
          // Call getCurrentUser to update currentUser state with the latest data
          getCurrentUser();

          enqueueSnackbar(responseData.message, {
            variant: "success",
          });
        }
        catch (error) {
            displayErrorMessage(error, enqueueSnackbar);
        }
        finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <SettingView
            data={data}
            isLoading={false}
            formOnSubmit={formOnSubmit}
            inputFormOnChange={inputFormOnChange}
            currentUser={currentUser}
        />
    );
};

export default SettingModule;
