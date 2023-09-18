// login / store user
export const getUserFromLs = () => {
  const userLs = localStorage.getItem("online_shop_USER");
  return userLs ? JSON.parse(userLs) : null;
};

// update user
export const setUserInLs = (userNew: string) => {
  localStorage.setItem("online_shop_USER", JSON.stringify(userNew));
};

// remove / logout user
export const clearUserInLs = () => {
  localStorage.removeItem("online_shop_USER");
};
