"use client";

import { useState } from "react";

import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import { LoginSteps } from "@/types/auth";

import LoginOTPStep from "./login-steps/otp-step";
import LoginPhoneStep from "./login-steps/phone-step";

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const [value, setValue] = useState(LoginSteps.phone);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agree, setAgree] = useState(false);

  const handleChange = (newValue: LoginSteps) => {
    setValue(newValue);
  };
  const handlePhoneNumber = (newNumber: string) => {
    setPhoneNumber(newNumber);
  };
  return (
    <TabContext value={value}>
      <TabPanel value={LoginSteps.phone} sx={{ p: 0 }}>
        <LoginPhoneStep
          handleStepChange={handleChange}
          phoneNumber={phoneNumber}
          agree={agree}
          handlePhone={handlePhoneNumber}
          handleAgree={(newValue: boolean) => setAgree(newValue)}
        />
      </TabPanel>
      <TabPanel value={LoginSteps.otp} sx={{ p: 0 }}>
        <LoginOTPStep
          phoneNumber={phoneNumber}
          handleStepChange={handleChange}
        />
      </TabPanel>
    </TabContext>
  );
}
