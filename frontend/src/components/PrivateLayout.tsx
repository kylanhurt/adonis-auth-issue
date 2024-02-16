import { useState } from "react";
import { UnstyledButton, Tooltip, Title, rem } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../styles/PrivateLayout.module.scss";
import { useAccountStore } from "../store";
import { Link, Navigate, Outlet } from "react-router-dom";
import { PRIVATE_LINKS } from "../navigation";

const PrivateLayout = () => {
  const { logout, account } = useAccountStore((state) => state);
  console.log("private layout account: ", account);
  const [active, setActive] = useState("Home");
  const [activeLink, setActiveLink] = useState("Home");

  const currentMainLink = PRIVATE_LINKS.find((link) => link.label === active);
  const currentLinks = currentMainLink?.children || [];

  const mainLinks = PRIVATE_LINKS.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = currentLinks.map((link) => (
    <Link
      className={classes.link}
      data-active={activeLink === link.label || undefined}
      to={link.to}
      onClick={() => {
        setActiveLink(link.label);
      }}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  if (!account) return <Navigate to="/login" />;

  return (
    <main>
      <nav className={classes.navbar}>
        <div className={classes.wrapper}>
          <div className={classes.aside}>
            <div className={classes.logo}>
              <MantineLogo type="mark" size={30} />
            </div>
            {mainLinks}
            <Tooltip
              label="Logout"
              position="right"
              withArrow
              transitionProps={{ duration: 0 }}
              key={"logout"}
            >
              <UnstyledButton
                onClick={logout}
                className={classes.mainLink}
                data-active={undefined}
              >
                <IconLogout
                  style={{ width: rem(22), height: rem(22) }}
                  stroke={1.5}
                />
              </UnstyledButton>
            </Tooltip>
          </div>
          <div className={classes.main}>
            <Title order={4} className={classes.title}>
              {active}
            </Title>

            {links}
          </div>
        </div>
      </nav>
      <Outlet />
    </main>
  );
};

export default PrivateLayout;
