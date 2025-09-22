import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

    const navigate = useNavigate();

    let loginRef = useRef();
    let registerRef = useRef();
    let hrRef = useRef();
    let loginTitleRef = useRef();
    let registerTitleRef = useRef();
    let registerForm = useRef();
    let forgetRef = useRef();
    let formRef = useRef();
    let resetRef = useRef();
    let nameRef = useRef();
    let emailRegisterRef = useRef();
    let emailLoginRef = useRef();
    let emailResetRef = useRef();
    let passwordRef = useRef();
    let passwordLoginRef = useRef();
    let buttonRef = useRef();
    let headingRef = useRef();
    let errorRef = useRef();
    let errorForgotRef = useRef();
    let resetPassRef = useRef();
    let resetConRef = useRef();
    let resetErrorRef = useRef();

    const switchRegisterPage = () => {
        loginRef.current.style.display="none";
        registerRef.current.style.display="block";
        hrRef.current.style.left="150px";
        registerTitleRef.current.style.fontSize="20px";
        registerTitleRef.current.style.marginRight="10px";
        registerTitleRef.current.style.color="#000";
        registerTitleRef.current.style.marginTop="4px";
        loginTitleRef.current.style.fontSize="18px";
        loginTitleRef.current.style.marginLeft="0";
        loginTitleRef.current.style.color="#242020";
        loginTitleRef.current.style.marginTop="6px";
    }

    const switchLoginPage = () => {
        loginRef.current.style.display="block";
        registerRef.current.style.display="none";
        hrRef.current.style.left="40px";
        registerTitleRef.current.style.fontSize="16px";
        registerTitleRef.current.style.marginRight="0px";
        registerTitleRef.current.style.marginTop="8px";
        registerTitleRef.current.style.color="#242020";
        loginTitleRef.current.style.fontSize="22px";
        loginTitleRef.current.style.marginLeft="10px";
        loginTitleRef.current.style.color="#000";
        loginTitleRef.current.style.marginTop="2px";
    }

    const forgotPass = () =>{
        formRef.current.style.display="none";
        forgetRef.current.style.display="block";
    }

    const goBack = () =>{
        formRef.current.style.display="block";
        forgetRef.current.style.display="none";
        resetRef.current.style.display="none";
    }
    // const resetPass = () => {
    //     formRef.current.style.display="none";
    //     forgetRef.current.style.display="none";
    //     resetRef.current.style.display="block";
    // }

    const userDetails = {
        username : "",
        email : "",
        password : ""
    }

    const [data,setData] = useState(userDetails);

    const handleInput = (event) =>{
        console.log(event.target.value);
        console.log(event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        
        setData({...data,[name]:value});
    }

    const handleSubmit = (event) => {

        event.preventDefault();
    
        const getData = JSON.parse(localStorage.getItem("user") || "[]");
        let arr = [];
        arr = [...getData];
        arr.push(data);
        localStorage.setItem("user",JSON.stringify(arr));
        localStorage.setItem("loggedIn",true);
        navigate('/');
    }

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLoginInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        errorRef.current.style.display="none";

        if("email" == name){
            setEmail(value);
        }
        if("password" == name){
            setPassword(value);
        }
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        let getDetails = JSON.parse(localStorage.getItem("user"));
        console.log(getDetails);
        getDetails.map((curValue)=>{
            console.log(curValue.password);
            let storeEmail = curValue.email;
            let storePassword = curValue.password;

            if(storeEmail == email && storePassword == password){
                localStorage.setItem("loggedIn",true);
                navigate("/");
            }
            else{
                errorRef.current.style.display="block";
            }
        })
    }

    const [forgotemail,setForgotEmail] = useState("");

    const handleForgotInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        errorForgotRef.current.style.display="none";

        if("email" == name){
            setForgotEmail(value);
        }
    }

    const handleForgotSubmit = (event) => {
        event.preventDefault();

        let getDetails = JSON.parse(localStorage.getItem("user"));
        console.log(getDetails);
        getDetails.map((curValue)=>{
            let storeEmail = curValue.email;

            if(storeEmail == forgotemail){
                formRef.current.style.display="none";
                forgetRef.current.style.display="none";
                resetRef.current.style.display="block";
            }
            else{
                errorForgotRef.current.style.display="block";
                emailResetRef.current.value="";
            }
        })
    }

    const [resetPassword,setResetPassword] = useState("");
    const handleResetInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        resetErrorRef.current.style.display="none";

        if("password" == name){
            setResetPassword(value);
        }
    }

    const handleResetSubmit = (event) => {
        event.preventDefault();

        if(resetPassRef.current.value !== resetConRef.current.value){
            resetErrorRef.current.style.display="block";
        }
        else{
            let getDetails = JSON.parse(localStorage.getItem("user"));
            console.log(getDetails);
            getDetails.map((curValue)=>{
                let storeEmail = curValue.email;
                let storePassword = curValue.password;
                if(storeEmail == forgotemail){
                    storePassword= localStorage.setItem(JSON.stringify(resetPassword));
                }
            })
        }
    }


    return (
        <div className="container">
            <h1 className="heading" ref={headingRef}>IP Address Subnet Calculator</h1>
            
            <div className="smallContainer" ref={formRef}>
                <div className="head">
                    <div className="signUpDiv">
                        <h2 id="login" onClick={switchLoginPage} ref={loginTitleRef}>Login</h2>
                    </div>
                    <div className="loginDiv">
                        <h2 id="signUp" onClick={switchRegisterPage} ref={registerTitleRef}>SignUp</h2>
                    </div>
                </div>
                <hr id="hr" ref={hrRef}/>

                <div className="form1" ref={registerRef}>
                    <form action="register" onSubmit={handleSubmit} ref={registerForm} name="register">
                        <p id="new">Create a new account </p>
                        <input type="text" className="input" id="username" ref={nameRef} name="username" placeholder="Username" autoComplete="off" required onChange={handleInput}/>
                        <input type="email" className="input" id="email" ref={emailRegisterRef} name="email" placeholder="Email address" autoComplete="off" required onChange={handleInput}/>
                        <input type="password" className="input" id="password" ref={passwordRef} name="password" placeholder="Password" autoComplete="off" required onChange={handleInput}/>
                        <br />
                        <button type="submit" ref={buttonRef} className="formBtn" name="signUpBtn">Sign Up</button>
                    </form>
                </div>

                <div className="form2" ref={loginRef}>
                    <form action="register" name="login" onSubmit={handleLoginSubmit}>
                        <p id="welcome">Welcome Back!</p>
                        <input type="email" className="input" ref={emailLoginRef} id="loginEmail" name="email" placeholder="Email address" autoComplete="off" required onChange={handleLoginInput}/>
                        <input type="password" className="input" ref={passwordLoginRef} id="loginPassword" name="password" placeholder="Password" autoComplete="off" required onChange={handleLoginInput}/>
                        <p id="loginError" ref={errorRef}>Invalid Email or password</p>
                        <br />
                        <p onClick={forgotPass} id="forgotPass">Forget Password?</p>
                        <button type="submit" className="formBtn" id="loginBtn" name="loginBtn">Login</button>
                    </form>
                </div> 
            </div>

            <div className="smallContainer2" ref={forgetRef}>
                <form action="forgetPassword" name="forget" onSubmit={handleForgotSubmit}>
                    <p id="forgot">Forgot Password ?</p>
                    <hr id="hr2"/>
                    <p id="pforgot">Enter your email address to <br />reset your password.</p>
                    <input type="email" className="input" ref={emailResetRef} id="forgotEmail" name="email" placeholder="Email address" autoComplete="off" required onChange={handleForgotInput} />
                    <p id="forgotError" ref={errorForgotRef}>Email is not registered</p>
                    <br />
                    <button type="submit" className="forgotBtn" id="submitBtn" name="submitBtn">Submit</button>
                    <button className="forgotBtn" id="cancelBtn" name="cancelBtn" onClick={goBack}>Cancel</button>
                </form>
            </div> 

            <div className="smallContainer3" ref={resetRef}>
                <form action="forgetPassword" name="forget" onSubmit={handleResetSubmit}>
                    <p id="forgot">Setup New Password</p>
                    <hr id="hr3"/>
                    <p id="pforgot">Already know your password ?<br />back to<b onClick={goBack}> login page</b></p>
                        <input type="password" className="input" id="resetPassword" name="password" placeholder="Enter new password" autoComplete="off" ref={resetPassRef} required onChange={handleResetInput} />    
                        <input type="password" className="input" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" autoComplete="off" ref={resetConRef} required onChange={handleResetInput}/>
                        <p id="resetError" ref={resetErrorRef}>Password doesn't match</p>
                        <br />
                        <button type="submit" id="resetBtn" name="submitBtn">Reset</button>
                </form>
            </div>
    
        </div>

    );
};

export default SignUpPage;
