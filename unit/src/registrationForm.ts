import { EMPTY_FIELD_ERROR, LOGIN_IS_ALRADY_USE, LOGIN_NOT_VALID, PASSWORD_IS_ALRADY_USE, PASSWORD_NOT_VALID, regExpForLoginField, regExpForPasswordField, SUCCESSFUL_LOGIN, SUCCESSFUL_PASSWORD } from "../constants/constants";

export class RegistrationForm {
    private cacheLogin: Set<string> = new Set();
    private cachePassword: Set<string> = new Set();

    public fillLogin(login: string) {
        try {
            if (this.ckeckLogin(login)) return SUCCESSFUL_LOGIN
        } catch (error) {
            throw error
        }
    }

    public fillPassword(password: string) {
        if (this.checkPassword(password)) {
            return SUCCESSFUL_PASSWORD
        } 
    }

    private ckeckLogin(login: string) {
        if (!login) {
            throw new Error(EMPTY_FIELD_ERROR);
        }
        if (!regExpForLoginField.test(login)) {
            throw new Error(LOGIN_NOT_VALID);
        }
        if (this.cacheLogin.has(login)) {
            throw new Error(LOGIN_IS_ALRADY_USE);
        }
        this.cacheLogin.add(login)
        return true
    }

    private checkPassword(password: string) {
        if (!password) {
            throw new Error(EMPTY_FIELD_ERROR);
        }
        if (!regExpForPasswordField.test(password)) {
            throw new Error(PASSWORD_NOT_VALID);
        }
        if (this.cachePassword.has(password)) {
            throw new Error(PASSWORD_IS_ALRADY_USE);
        }
        this.cachePassword.add(password)
        return true
    }
}

