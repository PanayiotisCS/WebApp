import React from "react";
import App from "../App";
import Header from "../component/header";
import Footer from "../component/footer";
import FormRegistration from "../component/formRegistration";

export class Register extends React.Component{

    render(){
        return(
            <div className="App">
                <Header />
                <div className='students-background ui-g" tabIndex={"-1"}'>
                    <FormRegistration />
                </div>
                <Footer /> 
            </div>
        )
    }
}