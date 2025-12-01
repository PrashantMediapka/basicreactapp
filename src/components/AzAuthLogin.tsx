import { useMsal } from "@azure/msal-react";

function AzAuthLogin() {
    const { instance } = useMsal();

    // Azure Pop-up Login
    const handleLogin = () => {
        
             instance.ssoSilent(
                {
                    scopes : ["User.Read"]
                }
             ).then((response) => {
                  console.log("SSO Login successful:", response);
             })
        .catch((err) => {        
        instance.loginPopup().then((response) => {
            console.log("Login via PopUp successful:", response);
        }).catch((error) => {
            console.error("Login failed:", error);
        });
    });    
}
    return (    
        <button onClick={handleLogin}>Login</button>
    );

}

export default AzAuthLogin;