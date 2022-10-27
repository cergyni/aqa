import { EMPTY_FIELD_ERROR, LOGIN_IS_ALRADY_USE, LOGIN_NOT_VALID, PASSWORD_IS_ALRADY_USE, PASSWORD_NOT_VALID, SUCCESSFUL_LOGIN, SUCCESSFUL_PASSWORD } from "../constants/constants";
import { RegistrationForm } from "../src/registrationForm";

let regForm: any;

describe("Tests for registration form with Jest", () => {
    beforeEach(() => {
        regForm = new RegistrationForm();
    });

    test("Positive tests for Login field", () => {
        expect(regForm.fillLogin("Cergyn_"))
            .toEqual(SUCCESSFUL_LOGIN);
        expect(regForm.fillLogin("1sasha128"))
            .toEqual(SUCCESSFUL_LOGIN);
        expect(regForm.fillLogin("123456"))
            .toEqual(SUCCESSFUL_LOGIN);
        expect(regForm.fillLogin("sas"))
            .toEqual(SUCCESSFUL_LOGIN);
        expect(regForm.fillLogin("KuplinovAlesand"))
            .toEqual(SUCCESSFUL_LOGIN);
    });

    test("Positive tests for Password field", () => {
        expect(regForm.fillPassword("!t2Nm0ff"))
            .toEqual(SUCCESSFUL_PASSWORD);
        expect(regForm.fillPassword("a2Nm0ff!2Nmfft2Nm0fft2Nm0ffertyu"))
            .toEqual(SUCCESSFUL_PASSWORD);
        expect(regForm.fillPassword("aN0ff!2N@N%m0^ff&t2*Nm#0ffertya"))
            .toEqual(SUCCESSFUL_PASSWORD);
    });

    test("Negative test for checking empty Login field error", () => {
        expect(() => {
            regForm.fillLogin("")
        }).toThrow(EMPTY_FIELD_ERROR);
    });

    test("Negative test for checking empty Password field error", () => {
        expect(() => {
            regForm.fillPassword("")
        }).toThrow(EMPTY_FIELD_ERROR);
    });

    test(`Negative tests for checking ${LOGIN_NOT_VALID} error`, () => {
        expect(() => {
            regForm.fillLogin("Ar")
        }).toThrow(LOGIN_NOT_VALID);
        expect(() => {
            regForm.fillLogin("KuplinovAlesandr")
        }).toThrow(LOGIN_NOT_VALID);
        expect(() => {
            regForm.fillLogin("Kuplinov!")
        }).toThrow(LOGIN_NOT_VALID);
        expect(() => {
            regForm.fillLogin("KuplinovПётр")
        }).toThrow(LOGIN_NOT_VALID);
    });

    test(`Negative tests for checking ${PASSWORD_NOT_VALID} error`, () => {
        expect(() => {
            regForm.fillPassword("t2Nmer$")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("t2Nmer0fzt2Nmqr0fft2Nmvr0fft2Num!")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("t2NmerQwer")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("tNmrjQwe#r")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("th2mrjywe#r")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("ASDLKTY#13")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("12345678@")
        }).toThrow(PASSWORD_NOT_VALID);
        expect(() => {
            regForm.fillPassword("Kup3linovПётр#")
        }).toThrow(PASSWORD_NOT_VALID);
    });

    test(`Negative tests for checking ${LOGIN_IS_ALRADY_USE} error`, () => {
        regForm.fillLogin("cergyni")
        expect(() => {
            regForm.fillLogin("cergyni")
        }).toThrow(LOGIN_IS_ALRADY_USE);
    });

    test(`Negative tests for checking ${PASSWORD_IS_ALRADY_USE} error`, () => {
        regForm.fillPassword("!t2Nm0ff")
        expect(() => {
            regForm.fillPassword("!t2Nm0ff")
        }).toThrow(PASSWORD_IS_ALRADY_USE);
    });

    afterEach(() => {
        regForm = null;
    });
})