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

    static createForm(){
        return apiDomain + "api/Forms";
    }

    static getForm(id){
        return apiDomain + `api/Forms/${id}`;
    }

    static getForms(){
        return apiDomain + "api/Forms";
    }

    static deleteForm(id){
        return apiDomain + `api/Forms/${id}`;
    }

    static updateForm(id, structure){
        return apiDomain + `api/Forms/${id}?structure=${structure}`;
    }

    static postAnswer(){
        return apiDomain + 'api/Answers';
    }

    static getAnswers(){
        return apiDomain + 'api/Answers';
    }
}

export default UrlService;
