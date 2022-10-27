export const regExpForLoginField = /^(\w){3,15}$/;
export const regExpForPasswordField = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,32}$/;
export const SUCCESSFUL_LOGIN = "Login is valid and uniq"
export const SUCCESSFUL_PASSWORD = "Password is valid and uniq"
export const EMPTY_FIELD_ERROR = "Field is empty, please filling field"
export const LOGIN_NOT_VALID = "Login is not valid"
export const PASSWORD_NOT_VALID = "Password is not valid"
export const LOGIN_IS_ALRADY_USE = "This login is already in use"
export const PASSWORD_IS_ALRADY_USE = "This password is already in use"
