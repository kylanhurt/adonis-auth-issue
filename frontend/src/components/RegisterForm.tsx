import React, { useState } from "react";
import { Alert, Button, TextInput, rem } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
} from "@mantine/core";
import axios from "axios";
import { useInputState } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import classes from "../styles/RegisterForm.module.scss";
import { EMAIL_REGEX, PASSWORD_REQUIREMENTS } from "../constants/regex";
import { getEnvVars } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { makeErrorAlert, makeSuccessAlert } from "../util";
import { Alert as AlertType } from "../types";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertType | null>(null);
  const [emailValue, setEmailValue] = useInputState("");
  const [passwordValue, setPasswordValue] = useInputState("");
  const strength = getStrength(passwordValue);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const url = `${getEnvVars().API_BASE_URL}/signup`;
      const response = await axios.post(url, {
        email: emailValue,
        password: passwordValue,
      });
      if (response.status === 201) {
        console.log("Successfully registered");
        const flashMessage = makeSuccessAlert({
          title: "Successfully registered",
          message: "Please check your email to verify your account",
        });
        navigate("/login", { state: { flashMessage } });
      }
    } catch (err) {
      console.log(err.response.data.message);
      const errorAlert = makeErrorAlert({
        message: err.response.data.message,
      });
      setAlert(errorAlert);
    }
  };

  const checks = PASSWORD_REQUIREMENTS.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.check(passwordValue)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          passwordValue.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  // test email against regex
  const isEmailValid = !emailValue || EMAIL_REGEX.test(emailValue);
  const isPasswordValid =
    !!passwordValue &&
    PASSWORD_REQUIREMENTS.every((r) => r.check(passwordValue));

  return (
    <div className={classes.registerPage}>
      <h1>Register</h1>
      {alert?.type === "success" && (
        <Alert variant={alert.variant} color={alert.color} title={alert.title}>
          {alert.message}
        </Alert>
      )}
      <br />
      <form className="form" onSubmit={submit}>
        <TextInput
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
        <div>
          <PasswordInput
            value={passwordValue}
            onChange={setPasswordValue}
            placeholder="Your password"
            label="Password"
            required
          />

          <Group gap={5} grow mt="xs" mb="md">
            {bars}
          </Group>

          {passwordValue && (
            <div className={classes.checks}>
              <PasswordRequirement
                label="Has at least 6 characters"
                meets={passwordValue.length > 5}
              />
              {checks}
            </div>
          )}
          <br />
          <Button
            type="submit"
            variant="filled"
            color="blue"
            disabled={!isEmailValid || !isPasswordValid}
            classNames={{ root: classes.buttonRoot }}
          >
            Submit
          </Button>
          <br />
          <br />
          <div className={classes.extraLinks}>
            Already have an account?&nbsp;
            <Link to="/login">Log in</Link>
          </div>
          <br />
          {alert?.type === "error" && (
            <Alert
              variant={alert.variant}
              color={alert.color}
              title={alert.title}
            >
              {alert.message}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  if (meets) return null;
  return (
    <Text component="div" c={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        <IconX size="0.9rem" stroke={1.5} />
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  PASSWORD_REQUIREMENTS.forEach((requirement) => {
    if (!requirement.check(password)) {
      multiplier += 1;
    }
  });

  return Math.max(
    100 - (100 / (PASSWORD_REQUIREMENTS.length + 1)) * multiplier,
    0
  );
}
