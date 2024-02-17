import Oidc from "oidc-client";
import AuthService from "./AuthService";

export default class AuthServiceClient implements AuthService {

    config = {
        authority: 'http://localhost:7001',
        client_id: 'ReactClient',
        redirect_uri: 'http://localhost:5173/item',
        response_type: 'code',
        scope: 'openid profile basket',
        post_logout_redirect_uri: 'http://localhost:5173/signout-callback-oidc',
    };

    mgr = new Oidc.UserManager(this.config);

    loadUser = async () => {
        try {
          let user =  await this.mgr.getUser();
          if(user === null) {
            user = await this.getUser()
          }
          return user
        } catch (error) {
          console.error('Error loading user:', error);
        }
    };

    login = async () => {
        try {
          await this.mgr.signinRedirect();
        } catch (error) {
          console.error('Error during login:', error);
        }
        await this.loadUser()
    };

    logout = async () => {
        try {
            await this.mgr.signoutRedirect();
        } catch (error) {
            console.error('Error during logout:', error);
        return null
        }
    };

    getUser = async () => {
        try {
            const user = await this.mgr.signinRedirectCallback();
            return user
        } catch (error) {
            return null
        }
    }

  };
    
