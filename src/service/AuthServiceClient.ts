import Oidc from "oidc-client";
import AuthService from "./AuthService";

export default class AuthServiceClient implements AuthService {

    config = {
        authority: 'http://localhost:7001',
        client_id: 'ReactClient',
        redirect_uri: 'http://localhost:5173/',
        response_type: 'code',
        scope: 'openid profile catalog',
        post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
    };

    mgr = new Oidc.UserManager(this.config);
    // mgr = new Oidc.UserManager({
    //     // other configurations...
    //     userStore: new Oidc.WebStorageStateStore({ store: window.sessionStorage }),
    // });

    loadUser = async () => {
        console.log('LOAD USER')
        try {
          await this.mgr.getUser();
        } catch (error) {
          console.error('Error loading user:', error);
        }
    };

    login = async () => {
        try {
            console.log('LOGIN')
          console.log('Login function called');
          //await this.getUser
          await this.mgr.signinRedirect();
        } catch (error) {
          console.error('Error during login:', error);
        }
        await this.loadUser()
    };

    logout = async () => {
        console.log('LOGOUT')
        try {
        console.log('Logout function called');
        await this.mgr.signoutRedirect();
        } catch (error) {
        console.error('Error during logout:', error);
        }
    };

    getUser = async () => {
        console.log('GET USER')
        const user = await this.mgr.signinRedirectCallback();
        console.log(user)
        return {id: user.profile.sid || "", name: user.profile.name || "", token: user.access_token}
    }

  };
    
