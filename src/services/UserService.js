import Keycloak from "keycloak-js";

const _kc = new Keycloak('/Keycloak.json');

const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256'
    })
        .then((authenticated) => {
            console.log("Keycloak authentication status:", authenticated);

            // Get username and first name
            const getUsername = () => _kc.tokenParsed?.preferred_username;
            const getName = () => _kc.tokenParsed?.name;

            // Log the values returned from the functions
            console.log("Username:", getUsername());
            console.log("First Name:", getName());




            // Debug log
            if (authenticated) {
                console.log("User authenticated. Calling onAuthenticatedCallback...");
                onAuthenticatedCallback();
            } else {
                console.warn("Not authenticated. Redirecting to login...");
                doLogin();
            }
        })
        .catch((error) => {
            console.error("Keycloak initialization failed:", error);
        });
};

const doLogin = _kc.login;
const doLogout = _kc.logout;



const getToken = () => _kc.token;


const getTokenParsed = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getName = () => _kc.tokenParsed?.name;

const getUserId = () => _kc.tokenParsed?.sub;


const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getTokenParsed,
    updateToken,
    getUsername,
    getName,
    hasRole,
    getUserId,
};

export default UserService;

