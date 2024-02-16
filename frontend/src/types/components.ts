export type Alert = {
  variant: string;
  color: string;
  title: string;
  message: string;
  code?: string;
  type: "success" | "error" | "warning" | "info";
};
