import { auth } from "./arcanaInit";
import { ref } from "vue";

const user = ref("");

const checkUser = async () => {
  const loggedIn = await auth.isLoggedIn();
  console.log(loggedIn);
  if (loggedIn) {
    user.value = await auth.getUserInfo();
    console.log(user.value);
    return user;
  }
};

export { user, checkUser };
