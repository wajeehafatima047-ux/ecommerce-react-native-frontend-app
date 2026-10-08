let logoutHandler = null;

export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

export const triggerLogout = async () => {
  if (logoutHandler) await logoutHandler();
  else console.warn('Logout handler not registered');
};