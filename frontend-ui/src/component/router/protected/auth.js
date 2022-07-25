import CookieService from "../../../services/CookieService";
import AuthService from "../../../services/AuthService";

class Auth{
    constructor() {
        const token = CookieService.get("accessToken");
        token ? (this.authenticated = true) : (this.authenticated = false);
    }

    async login(data, cb){
        const user = await AuthService.doUserLogin(data);

        if (!user){
            cb(false);
            return false;
        }

        localStorage.setItem("accessToken", user.accessToken);
        this.authenticated = true;
        cb(true);
    }

    logout(cb){
        CookieService.remove("accessToken");
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
    
    getAccessToken(){
        return CookieService.get("accessToken");
    }
}


export default new Auth();