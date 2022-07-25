import axios from "axios";
import UrlService from "./UrlService";
import CookieService from "./CookieService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const expiresAt = 60 * 24;

class AuthService{
    
    async doUserLogin(data){
        console.log(UrlService.loginUrl());
        try {
            const response = await axios.post(UrlService.loginUrl(), {Username: data.Username, Password: data.Password});
            return response.data;
        } catch (error) {
            if(error.response){
                toast.error(error.response.data.error);
            }
        }
    }

    handleLoginSuccess(response){
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = {path: "/", expires: date};
        CookieService.set("accessToken", response.accessToken, options );
        return true;
    }
}

export default new AuthService();