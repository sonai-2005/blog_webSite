import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);

    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) { return this.login({email,password}) }
            else { return  userAccount;}

        } catch (error) {
            console.log("account creation failed::createAccount" + error);
        }
    }
    async logIn({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async GetCurrentUser() {
        try {
            return this.account.get();
        } catch (error) {
            console.error("error in the GetCurrent user function::    - : " + error);
        }
        return null;
    }

    async logOut() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.error("error log out : " + error);
        }
    }
}

const authService = new Authservice();
export default authService;