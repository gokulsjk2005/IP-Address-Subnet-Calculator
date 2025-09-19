import { useRef} from "react";

const SignUpPage = () => {

    let loginRef = useRef();
    let registerRef = useRef();
    let hrRef = useRef();
    let loginTitleRef = useRef();
    let registerTitleRef = useRef();

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

    return (
        <div className="container">
            <h1 className="heading">IP Address Subnet Calculator</h1>
            <div className="smallContainer">
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
                    <form action="register" name="register">
                        <p id="new">Create a new account </p>
                        <input type="text" className="input" id="username" name="username" placeholder="Username" autoComplete="off" required />
                        <input type="text" className="input" id="email" name="email" placeholder="Email address" autoComplete="off" required />
                        <input type="password" className="input" id="password" name="password" placeholder="Password" autoComplete="off" required />
                        <br />
                        <button type="submit" className="formBtn" name="signUpBtn">Sign Up</button>
                    </form>
                </div>
                <div className="form2" ref={loginRef}>
                    <form action="register" name="login">
                        <p id="welcome">Welcome Back!</p>
                        <input type="text" className="input" id="loginEmail" name="email" placeholder="Email address" autoComplete="off" required />
                        <input type="password" className="input" id="loginPassword" name="password" placeholder="Password" autoComplete="off" required />
                        <br />
                        <p><a href="#" id="forgotPass">Forget Password?</a></p>
                        <button type="submit" className="formBtn" id="loginBtn" name="loginBtn">Login</button>
                    </form>
                </div>  
            </div>
        </div>
    );
};

export default SignUpPage;
