import React from 'react'

import { DodoLoginSmall } from "@/assets";
import { Paragraph } from '@/typography'
import { Input, Button } from '@/components'

import { SettingViewProps } from './types'
import { sSetting, sSettingDodo, sSettingHeading, sSettingForm, sSettingButton } from "./styles";
import PageTitle from '@/components/pagetitle';

const SettingView = ({
    data,
    isLoading,
    formOnSubmit,
    inputFormOnChange,
    currentUser,
}: SettingViewProps) => {
    return (
      <div>        
        <div className={sSettingHeading}>
            <PageTitle title="Setting" />
            <Paragraph variant="m" lightGreen>
                You can change your password here
            </Paragraph>
        </div>
        <form onSubmit={formOnSubmit} className={sSetting}>
            <div className={sSettingForm}>
                    <Input
                        type="password"
                        name="oldPassword"
                        label="Old Password"
                        value={data.oldPassword}
                        onChange={inputFormOnChange}
                        placeholder="Type your old password here"
                        disabled={isLoading}
                        required
                        />
                    <Input
                        type="password"
                        name="newPassword"
                        label="New Password"
                        value={data.newPassword}
                        onChange={inputFormOnChange}
                        placeholder="Type your new password here"
                        disabled={isLoading}
                        required
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        value={data.confirmPassword}
                        onChange={inputFormOnChange}
                        placeholder="Confirm your new password here"
                        disabled={isLoading}
                        required
                    />
                <div className={sSettingButton}>
                    <Button type="submit" disabled={isLoading} fullWidth>
                     Save
                    </Button>
                </div>
            </div>
            <div className={sSettingDodo}>
                <DodoLoginSmall />
            </div>
        </form>
      </div>
  );
}

export default SettingView