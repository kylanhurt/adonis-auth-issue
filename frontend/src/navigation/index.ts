import { IconHome2, IconManualGearbox } from "@tabler/icons-react";

export * from "./routes";

export const PRIVATE_LINKS = [
  {
    icon: IconHome2,
    label: "Home",
    children: [{ label: "Home", to: "/dashboard" }],
  },
  {
    label: "Settings",
    icon: IconManualGearbox,
    children: [
      { label: "Settings", to: "/settings" },
      { label: "Reset password", to: "/settings/change-password" },
    ],
  },
];
