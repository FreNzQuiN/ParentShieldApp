import { FormEvent } from "react";

export interface CurrentUser {
    email: string;
    id: string;
    name: string;
}
export interface SettingForm {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SettingViewProps {
    data: SettingForm;
    isLoading: boolean;
    formOnSubmit: (event: FormEvent<HTMLFormElement>) => void;
    inputFormOnChange: (e: FormEvent<HTMLInputElement>) => void;
    currentUser: CurrentUser;
}