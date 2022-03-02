import { auth } from "./arcanaInit";
import { ref } from "vue";
const user = ref('')

// const initAuth = async () => {
//     auth = await AuthProvider.init({
//         appID: `539`,
//         flow: 'popup', // 'popup' or 'redirect'
//         redirectUri:'' // Can be ignored for redirect flow if same as login page
//      });
// }
// initAuth()

const checkUser = async () => {
    user.value = await auth.isLoggedIn()
    if(user.value !== false){
        console.log(await auth.getUserInfo())
    }
    console.log(user.value)
}

export { user, checkUser }