import { EMPTY_FIELD_ERROR, LOGIN_IS_ALRADY_USE, LOGIN_NOT_VALID, PASSWORD_IS_ALRADY_USE, PASSWORD_NOT_VALID, SUCCESSFUL_LOGIN, SUCCESSFUL_PASSWORD } from "../constants/constants";
import { RegistrationForm } from "../src/registrationForm";
import { expect, test } from '@jest/globals'

let regForm: any;

describe("Tests for registration form with Jest", () => {
    beforeEach(() => {
        regForm = new RegistrationForm();
    });
    describe("Positive tests for Login field", () => {
        test("Input value which includes uppercase letter,underscore and common letters", () => {
            expect(regForm.fillLogin("Cergyn_"))
                .toEqual(SUCCESSFUL_LOGIN);
        });
        test("Input value which includes numbers and common letters", () => {
            expect(regForm.fillLogin("1sasha128"))
                .toEqual(SUCCESSFUL_LOGIN);
        });
        test("Input value which includes only numbers", () => {
            expect(regForm.fillLogin("123456"))
                .toEqual(SUCCESSFUL_LOGIN);
        });
        test("Input value which includes min count of symbols", () => {
            expect(regForm.fillLogin("sas"))
                .toEqual(SUCCESSFUL_LOGIN);
        });
        test("Input value which includes max count of symbols", () => {
            expect(regForm.fillLogin("KuplinovAlesand"))
                .toEqual(SUCCESSFUL_LOGIN);
        });
    })

    describe("Positive tests for Password field", () => {
        test("Input value which includes min count of symbols", () => {
            expect(regForm.fillPassword("!t2Nm0ff"))
                .toEqual(SUCCESSFUL_PASSWORD);
        });
        test("Input value which includes max count of symbols", () => {
            expect(regForm.fillPassword("a2Nm0ff!2Nmfft2Nm0fft2Nm0ffertyu"))
                .toEqual(SUCCESSFUL_PASSWORD);
        });
        test("Input value which includes special symbols, numbers, uppercase and lowercase letters", () => {
            expect(regForm.fillPassword("aN0ff!2N@N%m0^ff&t2*Nm#0ffertya"))
                .toEqual(SUCCESSFUL_PASSWORD);
        });
    })

    describe(`Negative tests for checking '${EMPTY_FIELD_ERROR}' error`, () => {
        test("Empty Login field error", () => {
            expect(() => {
                regForm.fillLogin("")
            }).toThrow(EMPTY_FIELD_ERROR);
        });

        test("Empty Password field error", () => {
            expect(() => {
                regForm.fillPassword("")
            }).toThrow(EMPTY_FIELD_ERROR);
        });
    })
    describe(`Negative tests for checking '${LOGIN_NOT_VALID}' error`, () => {
        test(`Input value which includes less than min count of symbols`, () => {
            expect(() => {
                regForm.fillLogin("Ar")
            }).toThrow(LOGIN_NOT_VALID);
        });
        test(`Input value which includes more than max count of symbols`, () => {
            expect(() => {
                regForm.fillLogin("KuplinovAlesandr")
            }).toThrow(LOGIN_NOT_VALID);
        });
        test(`Input value which includes special symbol`, () => {
            expect(() => {
                regForm.fillLogin("Kuplinov!")
            }).toThrow(LOGIN_NOT_VALID);
        });
        test(`Input value which includes russian letters`, () => {
            expect(() => {
                regForm.fillLogin("KuplinovПётр")
            }).toThrow(LOGIN_NOT_VALID);
        });
    })
    describe(`Negative tests for checking '${PASSWORD_NOT_VALID}' error`, () => {
        test(`Input value which includes less than min count of symbols`, () => {
            expect(() => {
                regForm.fillPassword("t2Nmer$")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which includes more than max count of symbols`, () => {
            expect(() => {
                regForm.fillPassword("t2Nmer0fzt2Nmqr0fft2Nmvr0fft2Num!")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which doesn't include special symbols`, () => {
            expect(() => {
                regForm.fillPassword("t2NmerQwer")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which doesn't include numbers`, () => {
            expect(() => {
                regForm.fillPassword("tNmrjQwe#r")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which doesn't include uppercase letters`, () => {
            expect(() => {
                regForm.fillPassword("th2mrjywe#r")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which doesn't include lowercase letters`, () => {
            expect(() => {
                regForm.fillPassword("ASDLKTY#13")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which doesn't include letters`, () => {
            expect(() => {
                regForm.fillPassword("12345678@")
            }).toThrow(PASSWORD_NOT_VALID);
        });
        test(`Input value which includes russian letters`, () => {
            expect(() => {
                regForm.fillPassword("Kup3linovПётр#")
            }).toThrow(PASSWORD_NOT_VALID);
        });
    })
    describe("Negative tests for checking 'already in use' error", () => {
        test(`Сhecking ${LOGIN_IS_ALRADY_USE} error`, () => {
            regForm.fillLogin("cergyni")
            expect(() => {
                regForm.fillLogin("cergyni")
            }).toThrow(LOGIN_IS_ALRADY_USE);
        });

        test(`Сhecking ${PASSWORD_IS_ALRADY_USE} error`, () => {
            regForm.fillPassword("!t2Nm0ff")
            expect(() => {
                regForm.fillPassword("!t2Nm0ff")
            }).toThrow(PASSWORD_IS_ALRADY_USE);
        });
    })
    afterEach(() => {
        regForm = null;
    });
})