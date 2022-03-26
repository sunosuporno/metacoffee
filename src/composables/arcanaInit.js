import { AuthProvider } from "@arcana/auth";
import { onMounted } from "vue";

let auth
const initAuth = async () => {
    auth = await AuthProvider.init({
        appID: `539`,
        flow: 'redirect', // 'popup' or 'redirect'
        redirectUri:'' // Can be ignored for redirect flow if same as login page
     });

     console.log(auth)
     return auth
}



 export {auth, initAuth};