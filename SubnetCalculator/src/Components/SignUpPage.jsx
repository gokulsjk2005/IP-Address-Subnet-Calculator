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
    // let appRef = useRef();
    let headingRef = useRef();
    // let resultRef = useRef();
    // let v4inputRef = useRef();
    // let v4input2Ref = useRef();
    // let v6inputRef = useRef();
    // let v6input2Ref = useRef();
    // let formv4Ref = useRef();
    // let formv6Ref = useRef();

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
    const resetPass = () => {
        formRef.current.style.display="none";
        forgetRef.current.style.display="none";
        resetRef.current.style.display="block";
    }

    // const logoutFn = () => {
    //     resultRef.current.style.display="none";
    //     appRef.current.style.display="none";
    //     formRef.current.style.display="block";
    //     headingRef.current.style.display="block";
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
        // formRef.current.style.display="none";
        // headingRef.current.style.display="none";
        // appRef.current.style.display="block";
        localStorage.setItem("loggedIn",true);
        navigate('/');
    }

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLoginInput = (event) => {
        const value = event.target.value;
        const name = event.target.name;
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
                // formRef.current.style.display="none";
                // headingRef.current.style.display="none";
                // appRef.current.style.display="block";
                localStorage.setItem("loggedIn",true);
                navigate('/');
            }
        })
    }


    // const [ipv4, setIpv4] = useState("");
    // const [ipv4Mask, setIpv4Mask] = useState("");
    // const [ipv4Result, setIpv4Result] = useState("");
    
    // const [ipv6, setIpv6] = useState("");
    // const [ipv6Prefix, setIpv6Prefix] = useState("");
    // const [ipv6Result, setIpv6Result] = useState("");
    
    // const calcIPv4 = () => {
    //     let ip = ipv4.trim();
    //     let mask = ipv4Mask.trim();
    //     let result = "";

    //     resultRef.current.style.display="flex";
    //     setIpv6Result(""); 
    
    //     try {
    //         // If mask is dotted, convert to prefix
    //         let prefix = mask;
    //         if (mask.includes(".")) {
    //             prefix =
    //             mask
    //             .split(".")
    //             .map((x) => parseInt(x).toString(2))
    //             .join("")
    //             .split("1").length - 1;
    //         }
    //         prefix = parseInt(prefix);
    
    //         const ipParts = ip.split(".").map((x) => parseInt(x));
    //         if (ipParts.length !== 4) throw new Error("Invalid IPv4 address");
    
    //         let bits = 0xffffffff << (32 - prefix);
    //         const maskParts = [];
    //         for (let i = 3; i >= 0; i--) {
    //             maskParts[i] = bits & 0xff;
    //             bits >>>= 8;
    //         }
    
    //         const netParts = ipParts.map((x, i) => x & maskParts[i]);
    //         const broadParts = ipParts.map((x, i) => x | (~maskParts[i] & 255));
    
    //         // Host range
    //         const firstHost = [...netParts];
    //         firstHost[3] += 1;
    //         const lastHost = [...broadParts];
    //         lastHost[3] -= 1;
    
    //         const totalHosts = Math.pow(2, 32 - prefix) - 2;
    
    //         result = `
    //         IP Address: ${ip}                            Subnet Mask: ${mask.includes(".") ? mask : maskParts.join(".")} (/ ${prefix})
    //         Network Address: ${netParts.join(".")}                 Broadcast Address: ${broadParts.join(".")}
    //         First Usable Host: ${firstHost.join(".")}                   Last Usable Host: ${lastHost.join(".")}
    //         Total Hosts: ${totalHosts}
    //         `;
    //     } catch (e) {
    //         result = "              Error : " + e.message;
    //     }
    //     setIpv4Result(result);

    // };
    
    // const calcIPv6 = () => {
    //     let ip = ipv6.trim();
    //     let prefix = ipv6Prefix.trim();
    //     let result = "";

    //     resultRef.current.style.display="flex";

    //     setIpv4Result("");
    
    //     try {
    //         result = `
    //         IP Address: ${ip}                         
    //         Prefix Length: /${prefix}
    //         Note : IPv6 does not use broadcast, and host calculations depend on allocation.
    //         `;
    //     } catch (e){
    //         result = "Error: " + e.message;
    //     }
    //     setIpv6Result(result);
    // };

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
                        <input type="text" className="input" id="email" ref={emailRegisterRef} name="email" placeholder="Email address" autoComplete="off" required onChange={handleInput}/>
                        <input type="password" className="input" id="password" ref={passwordRef} name="password" placeholder="Password" autoComplete="off" required onChange={handleInput}/>
                        <br />
                        <button type="submit" ref={buttonRef} className="formBtn" name="signUpBtn">Sign Up</button>
                    </form>
                </div>
                <div className="form2" ref={loginRef}>
                    <form action="register" name="login" onSubmit={handleLoginSubmit}>
                        <p id="welcome">Welcome Back!</p>
                        <input type="text" className="input" ref={emailLoginRef} id="loginEmail" name="email" placeholder="Email address" autoComplete="off" required onChange={handleLoginInput}/>
                        <input type="password" className="input" ref={passwordLoginRef} id="loginPassword" name="password" placeholder="Password" autoComplete="off" required onChange={handleLoginInput}/>
                        <br />
                        <p onClick={forgotPass} id="forgotPass">Forget Password?</p>
                        <button type="submit" className="formBtn" id="loginBtn" name="loginBtn">Login</button>
                    </form>
                </div> 
            </div>
            <div className="smallContainer2" ref={forgetRef}>
                <form action="forgetPassword" name="forget">
                    <p id="forgot">Forgot Password ?</p>
                    <hr id="hr2"/>
                    <p id="pforgot">Enter your email address to <br />reset your password.</p>
                    <input type="email" className="input" ref={emailResetRef} id="forgotEmail" name="email" placeholder="Email address" autoComplete="off" required />
                    <br />
                    <button type="submit" className="forgotBtn" id="submitBtn" name="submitBtn" onClick={resetPass}>Submit</button>
                    <button className="forgotBtn" id="cancelBtn" name="cancelBtn" onClick={goBack}>Cancel</button>
                </form>
            </div> 
            <div className="smallContainer3" ref={resetRef}>
                <form action="forgetPassword" name="forget">
                    <p id="forgot">Setup New Password</p>
                    <hr id="hr3"/>
                    <p id="pforgot">Already know your password ?<br />back to<b onClick={goBack}> login page</b></p>
                    <input type="password" className="input" id="resetPassword" name="password" placeholder="Enter new password" autoComplete="off" required />    
                    <input type="password" className="input" id="confirmPassword" name="password" placeholder="Confirm password" autoComplete="off" required />
                    <br />
                    <button type="submit" id="resetBtn" name="submitBtn">Reset</button>
                </form>
            </div> 


           {/* <div className="appContainer" ref={appRef}>
                 <div className="appHeader">
                    <h1 id="appHeading">IP Address Subnet Calculator</h1> 
                    <button id="logOut" onClick={logoutFn}>Logout</button>
                </div>
                {/* <hr id="hr4" /> */}{/*
                <div className="p-4 appInsideContainer">
                    <div className="ipv4Div">
                        <h2 className="ipHead mb-2">IPv4 Calculator</h2>
                        <hr id="hr5" />
                            <label htmlFor="ipv4Add" className="labelApp">IP Address :</label><br />
                            <input type="text" placeholder="e.g., 192.168.1.10" id="ipv4Add" ref={v4inputRef} value={ipv4} onChange={(e) => setIpv4(e.target.value)} className="border p-1 mr-2"/>
                            <label htmlFor="ipv4Sub" className="labelApp">Subnet Mask :</label><br />
                            <input type="text" placeholder="e.g., 255.255.255.0" id="ipv4Sub" ref={v4input2Ref} value={ipv4Mask} onChange={(e) => setIpv4Mask(e.target.value)} className="border p-1 mr-2" />
                            <button onClick={calcIPv4} className="bg-blue-500 text-white px-3 py-1 rounded"> Calculate</button>
                      
                        
                    </div>

                    <div className="ipv6Div">
                        <h2 className="ipHead mt-6 mb-2">IPv6 Calculator</h2>
                        <hr id="hr5" />
                            <label htmlFor="ipv6Add" className="labelApp">IP Address :</label><br />
                            <input type="text" placeholder="e.g., 2001:db8::1" id="ipv6Add" value={ipv6} ref={v6inputRef} onChange={(e) => setIpv6(e.target.value)} className="border p-1 mr-2" />
                            <label htmlFor="ipv6Sub" className="labelApp">Prefix Length :</label><br />
                            <input type="text" placeholder="e.g., 64" id="ipv6Sub" value={ipv6Prefix} ref={v6input2Ref} onChange={(e) => setIpv6Prefix(e.target.value)} className="border p-1 mr-2" />
                            <button onClick={calcIPv6} className="bg-green-500 text-white px-3 py-1 rounded"> Calculate</button>
                    
                    </div>

                    
                    

                    
                </div>
                <div className="resultContainer">
                <div ref={resultRef} className="resultApp">
                    <pre className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{ipv4Result}</pre>
                    <pre className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{ipv6Result}</pre>
                </div>
                </div>
            </div> */}
        
        </div>

    );
};

export default SignUpPage;
