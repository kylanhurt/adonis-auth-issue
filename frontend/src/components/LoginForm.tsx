import React, { useEffect, useState } from "react";
import { Alert, Button, TextInput, rem } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { PasswordInput } from "@mantine/core";
import axios from "axios";
import { useInputState } from "@mantine/hooks";
import classes from "../styles/LoginForm.module.scss";
import { EMAIL_REGEX } from "../constants/regex";
import { getEnvVars } from "../constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../store";
import { Alert as AlertType } from "../types/components";
import { makeErrorAlert } from "../util";

type LoginFormProps = {
  emailInputRef?: React.RefObject<HTMLInputElement>;
};

export default function LoginForm({ emailInputRef }: LoginFormProps) {
  const { state } = useLocation();
  const flashMessage = state?.flashMessage;
  const [bannerMessage] = useState<AlertType | null>(flashMessage || null);
  const { setAccount } = useAccountStore((state) => state);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [emailValue, setEmailValue] = useInputState("");
  const [passwordValue, setPasswordValue] = useInputState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setAlert(null);
      e.preventDefault();
      const url = `${getEnvVars().API_BASE_URL}/login`;
      const { data: account } = await axios.post(url, {
        email: emailValue,
        password: passwordValue,
      });
      setAccount(account);
      localStorage.setItem("account", JSON.stringify(account));
      navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data.message);
      let message = err.response.data.message;
      if (err.response.data.error === "EMAIL_NOT_VERIFIED") {
        message =
          "Please verify your email before logging in. A new verification code has been sent to your email.";
      }
      const errorAlert = makeErrorAlert({
        message,
      });
      setAlert(errorAlert);
    }
  };

  // test email against regex
  const isEmailValid = !emailValue || EMAIL_REGEX.test(emailValue);
  const isSubmitEnabled = isEmailValid && passwordValue;

  return (
    <div className={classes.loginPage}>
      <h1>Login</h1>
      {bannerMessage && (
        <Alert {...bannerMessage}>{bannerMessage.message}</Alert>
      )}
      <br />
      <form className="form" onSubmit={submit}>
        <TextInput
          ref={emailInputRef}
          label="Email"
          value={emailValue}
          error={!isEmailValid && "Invalid email"}
          onChange={(e) => setEmailValue(e.target.value)}
          classNames={{ root: classes.emailRoot, input: classes.emailInput }}
          required
          rightSection={
            !isEmailValid && (
              <IconAlertTriangle
                stroke={1.5}
                style={{ width: rem(18), height: rem(18) }}
                className={classes.icon}
              />
            )
          }
        />
        <PasswordInput
          value={passwordValue}
          onChange={setPasswordValue}
          placeholder="Your password"
          label="Password"
          required
        />
        <Button
          type="submit"
          variant="filled"
          color="blue"
          disabled={!isSubmitEnabled}
          classNames={{ root: classes.buttonRoot }}
        >
          Submit
        </Button>
        <div className={classes.extraLinks}>
          Don&apos;t have an account?&nbsp;
          <Link to="/register">Sign up</Link>
        </div>
        <div className={classes.extraLinks}>
          Forgot your password?&nbsp;
          <Link to="/forgot-password">Reset</Link>
        </div>
        <br />
        {alert && <Alert {...alert}>{alert.message}</Alert>}
      </form>
    </div>
  );
}
