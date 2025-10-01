import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    let appRef = useRef();
    let resultRef = useRef();
    let v4inputRef = useRef();
    let v4input2Ref = useRef();
    let v6inputRef = useRef();
    let v6input2Ref = useRef();

    const logoutFn = () => {
        localStorage.removeItem("loggedIn");
        navigate('/login');
    }

    
    const [ipv4, setIpv4] = useState("");
    const [ipv4Mask, setIpv4Mask] = useState("");
    const [ipv4Result, setIpv4Result] = useState("");
    
    const [ipv6, setIpv6] = useState("");
    const [ipv6Prefix, setIpv6Prefix] = useState("");
    const [ipv6Result, setIpv6Result] = useState("");
    
    const calcIPv4 = () => {
        let ip = ipv4.trim();
        let mask = ipv4Mask.trim();
        let result = "";

        resultRef.current.style.display="flex";
        setIpv6Result(""); 
    
        try {
            // If mask is dotted, convert to prefix
            let prefix = mask;
            if (mask.includes(".")) {
                prefix =
                mask
                .split(".")
                .map((x) => parseInt(x).toString(2))
                .join("")
                .split("1").length - 1;
            }
            prefix = parseInt(prefix);
    
            const ipParts = ip.split(".").map((x) => parseInt(x));
            if (ipParts.length !== 4) throw new Error("Invalid IPv4 address");
    
            let bits = 0xffffffff << (32 - prefix);
            const maskParts = [];
            for (let i = 3; i >= 0; i--) {
                maskParts[i] = bits & 0xff;
                bits >>>= 8;
            }
    
            const netParts = ipParts.map((x, i) => x & maskParts[i]);
            const broadParts = ipParts.map((x, i) => x | (~maskParts[i] & 255));
    
            // Host range
            const firstHost = [...netParts];
            firstHost[3] += 1;
            const lastHost = [...broadParts];
            lastHost[3] -= 1;
    
            const totalHosts = Math.pow(2, 32 - prefix) - 2;

            result = `
            IP Address: ${ip}                            
            Subnet Mask: ${mask.includes(".") ? mask : maskParts.join(".")} (/ ${prefix})
            Network Address: ${netParts.join(".")}                 
            Broadcast Address: ${broadParts.join(".")}
            First Usable Host: ${firstHost.join(".")}                   
            Last Usable Host: ${lastHost.join(".")}
            Total Hosts: ${totalHosts}
            `;
        } catch (e) {
            result = `            
            Error : ${e.message} 
            `;
        }
        setIpv4Result(result);
        setIpv4("");
        setIpv4Mask("");
        v4inputRef.current.value="";
        v4input2Ref.current.value="";
    };
    
    const calcIPv6 = () => {
        let ip = ipv6.trim();
        let prefix = ipv6Prefix.trim();
        let result = "";

        resultRef.current.style.display="flex";
        setIpv4Result("");
    
        try {
            if(ipv6!=="" || ipv6Prefix!==""){
                result = `
                IP Address: ${ip}                         
                Prefix Length: /${prefix}
                Note : IPv6 does not use broadcast, and host calculations depend on allocation.
                `;
            }
            else{
                result = `                       
                Error : Invalid IPv6 address
                `;
            }
        } catch (e){
            result = `            
            Error : ${e.message} 
            `;
        }
        setIpv6Result(result);
        setIpv6("");
        setIpv6Prefix("");
        v6inputRef.current.value="";
        v6input2Ref.current.value="";
    };


  return (
    < div className="container">

        <div className="appContainer" ref={appRef}>

            <div className="appHeader">
                <h1 id="appHeading">IP Address Subnet Calculator</h1> 
                <button id="logOut" onClick={logoutFn}>Logout</button>
            </div>

            <div className="p-4 appInsideContainer">
                <div className="ipv4Div">
                    <h2 className="ipHead mb-2">IPv4 Calculator</h2>
                    <hr id="hr5" />
                    <label htmlFor="ipv4Add" className="labelApp">IP Address :</label><br />
                    <input type="text" autoComplete="off" placeholder="e.g., 192.168.1.10" id="ipv4Add" ref={v4inputRef} value={ipv4} onChange={(e) => setIpv4(e.target.value)} className="border p-1 mr-2"/>
                    <label htmlFor="ipv4Sub" className="labelApp">Subnet Mask :</label><br />
                    <input type="text" autoComplete="off" placeholder="e.g., 255.255.255.0" id="ipv4Sub" ref={v4input2Ref} value={ipv4Mask} onChange={(e) => setIpv4Mask(e.target.value)} className="border p-1 mr-2" />
                    <button onClick={calcIPv4} className="bg-blue-500 text-white px-3 py-1 rounded"> Calculate</button>        
                </div>

                <div className="ipv6Div">
                    <h2 className="ipHead mt-6 mb-2">IPv6 Calculator</h2>
                    <hr id="hr5" />
                    <label htmlFor="ipv6Add" className="labelApp">IP Address :</label><br />
                    <input type="text" autoComplete="off" placeholder="e.g., 2001:db8::1" id="ipv6Add" value={ipv6} ref={v6inputRef} onChange={(e) => setIpv6(e.target.value)} className="border p-1 mr-2" />
                    <label htmlFor="ipv6Sub" className="labelApp">Prefix Length :</label><br />
                    <input type="text" autoComplete="off" placeholder="e.g., 64" id="ipv6Sub" value={ipv6Prefix} ref={v6input2Ref} onChange={(e) => setIpv6Prefix(e.target.value)} className="border p-1 mr-2" />
                    <button onClick={calcIPv6} className="bg-green-500 text-white px-3 py-1 rounded"> Calculate</button>                
                </div>
            </div>

            <div className="resultContainer">
                <div ref={resultRef} className="resultApp">
                    <pre id="ipv4result" className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{ipv4Result}</pre>
                    <pre id="ipv6result" className="bg-gray-100 p-2 mt-2 whitespace-pre-wrap">{ipv6Result}</pre>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Home