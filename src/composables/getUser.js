import { auth } from "./arcanaInit";
import { ref } from "vue";
import { Wallet } from "ethers";
import padPublicKey from "../composables/padPublicKey";

const user = ref("");
const publicKey = ref("");

const checkUser = async () => {
  const loggedIn = await auth.isLoggedIn();
  console.log(loggedIn);
  if (loggedIn) {
    user.value = await auth.getUserInfo();
    publicKey.value = await auth.getPublicKey({
      verifier: 'google',
      id: user.value.userInfo.email,
    });
      const actualPublicKey = padPublicKey(publicKey.value);
      const wallet = new Wallet(user.value.privateKey);

      user.value = {
        ...user.value,
        walletAddress: wallet.address,
        privateKey: user.value.privateKey,
        publicKey: actualPublicKey,
      };
    return user;
  }
};

export { user, publicKey, checkUser };
