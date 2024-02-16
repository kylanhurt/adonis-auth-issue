export const EMAIL_REGEX =
  /^[_a-z0-9-]+(.[_a-z0-9-\+]+)@[a-z0-9-]+(.[a-z0-9-]+)(.[a-z]{2,3})$/;

export const PASSWORD_REQUIREMENTS = [
  {
    check: (str: string) => /[0-9]/.test(str),
    label: "Includes number",
  },
  {
    check: (str: string) => /[a-z]/.test(str),
    label: "Includes lowercase letter",
  },
  {
    check: (str: string) => /[A-Z]/.test(str),
    label: "Includes uppercase letter",
  },
  {
    check: (str: string) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(str),
    label: "Includes special symbol",
  },
];
