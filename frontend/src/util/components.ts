import { Alert } from "../types";

type MakeAlertParams = {
  variant?: string;
  message?: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  color: "red" | "teal";
};

export const makeAlert = (options: MakeAlertParams): Alert => {
  const defaultOptions = {
    variant: "light",
    message: "Success",
    ...options,
  };
  return defaultOptions;
};

type MakeErrorAlertParams = {
  variant?: string;
  message: string;
  title?: string;
};

export const makeErrorAlert = (options: MakeErrorAlertParams): Alert => {
  return makeAlert({
    title: "Error",
    type: "error",
    color: "red",
    ...options,
  });
};

type MakeSuccessAlertParams = {
  variant?: string;
  message: string;
  title?: string;
};

export const makeSuccessAlert = (options: MakeSuccessAlertParams): Alert => {
  return makeAlert({
    type: "success",
    title: "Success",
    color: "teal",
    ...options,
  });
};
