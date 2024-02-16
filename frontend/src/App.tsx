import "@mantine/core/styles.css";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { router } from "./navigation/routes";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
