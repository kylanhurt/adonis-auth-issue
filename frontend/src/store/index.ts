import { create } from "zustand";
import zukeeper from "zukeeper";

const INITIAL_ACCOUNT = window.localStorage.getItem("account");
let account = null;
if (INITIAL_ACCOUNT) {
  account = JSON.parse(INITIAL_ACCOUNT);
}

export const useAccountStore = create(
  zukeeper((set) => ({
    account,
    setAccount: (newAccount) =>
      set(() => {
        return { account: newAccount };
      }),
    logout: () => {
      localStorage.removeItem("account");
      set({ account: null });
      // may need to destroy cookie?
    },
  }))
);

window.store = useAccountStore;
