let apiDomain = "https://localhost:7169/";

class UrlService{

    static loginUrl() {
        return apiDomain + "api/Users/login";
    }

    static registerUrl(){
        return apiDomain + "api/Users/signup";
    }

    static logoutUrl(){
        return apiDomain + "api/Users/logout";
    }
}

export default UrlService;
