import axios from "axios"
import { expect, test } from '@jest/globals'
import { getArrayOfCountriesNames, getObjOfCurrencies } from "../helper"
import { baseUrl, COUNTRIES_NAMES, CURRENCY, LANGUAGES_CODE, LANGUAGES_NAME, NOT_FOUND_MESSAGE, SCHEMA_NAME } from "../constants/constants"
describe("HTTPS tests", () => {
    describe("Name", () => {
        const fullText = {
            params: {
                fullText: true
            }
        }

        let res: any;
        test(`Should get ${COUNTRIES_NAMES.brazil} country`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.brazil}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.brazil]));
        })
        test(`Should get ${COUNTRIES_NAMES.guinea} country`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.guinea}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.guinea]));
        })
        test(`Should get ${COUNTRIES_NAMES.tanzania} country by part name`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.tanzania.slice(0, -4)}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            const arrayOfCountriesNames = getArrayOfCountriesNames(res.data, true)
            expect(arrayOfCountriesNames).toEqual(expect.arrayContaining([COUNTRIES_NAMES.tanzania]));
        })
        test(`Should get error after search ${COUNTRIES_NAMES.mexico} country by part name (flag fullText=true)`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.mexico.slice(0, -2)}`, fullText).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.statusText).toEqual('Not Found')
        })
        test(`Should get error after invalid search`, async () => {
            try {
                res = await axios.get(baseUrl + `name/`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual('Page ' + NOT_FOUND_MESSAGE)
        })
        test(`Should get countries by official name`, async () => {
            try {
                res = await axios.get(baseUrl + `name/` + COUNTRIES_NAMES.bolivia).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, false))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.bolivia]));
        })
        test(`Response should have property in name block contains schema`, async () => {
            try {
                res = await axios.get(baseUrl + `name/` + COUNTRIES_NAMES.mexico).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true)).toEqual(expect.arrayContaining([COUNTRIES_NAMES.mexico]));
            for (const key in SCHEMA_NAME) {
                expect(res.data[0].name).toHaveProperty(key)
            }
        })
    })

    describe("Currency", () => {
        let res: any
        test(`Should get countries contains ${CURRENCY.dollar} currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            const ObjOfCurrencies = getObjOfCurrencies(res.data)
            ObjOfCurrencies.symbol.forEach(elem => {
                expect(elem).toEqual('$')
            })
            ObjOfCurrencies.name.forEach(elem => {
                expect(elem).toContain(CURRENCY.dollar)
            })
        })
        test(`Should get countries contains ${CURRENCY.euro} currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.euro).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            const ObjOfCurrencies = getObjOfCurrencies(res.data)
            ObjOfCurrencies.symbol.forEach(elem => {
                expect(elem).toEqual('€')
            })
            ObjOfCurrencies.name.forEach(elem => {
                expect(elem.toLowerCase()).toContain(CURRENCY.euro)
            })
        })
        test(`Should get countries contains ${CURRENCY.BYN} currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.BYN).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(Object.keys(el.currencies)).toEqual(expect.arrayContaining([CURRENCY.BYN]))
            });
        })
        test(`Should get countries contains ${CURRENCY.dollar} currency. Searching by part currency name (${CURRENCY.dollar.slice(0, -2)})`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar.slice(0, -2)).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            const ObjOfCurrencies = getObjOfCurrencies(res.data)
            ObjOfCurrencies.symbol.forEach(elem => {
                expect(elem).toEqual('$')
            })
            ObjOfCurrencies.name.forEach(elem => {
                expect(elem).toContain(CURRENCY.dollar)
            })
        })
        test(`Should NOT get countries contains ${CURRENCY.BYN} currency by lowercase part code`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.BYN.slice(0, -1).toLowerCase()).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(Object.keys(el.currencies)).toEqual(expect.not.arrayContaining([CURRENCY.BYN]))
            });
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by uppercase part of ${CURRENCY.BYN} `, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.BYN.slice(0, -1)).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by non exist currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar + CURRENCY.euro).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
    })

    describe("Language", () => {
        let res: any;
        test(`Should get countries which contains ${LANGUAGES_NAME.german} language. Searching by name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.german).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.deu]).toEqual(LANGUAGES_NAME.german)
            })
        })
        test(`Should get countries which contains ${LANGUAGES_NAME.dutch} language. Searching by code (${LANGUAGES_CODE.nld})`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.nld]).toEqual(LANGUAGES_NAME.dutch)
            })
        })
        test(`Should get countries which contains ${LANGUAGES_NAME.german} language. Searching by uppercase name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.german.toUpperCase()).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.deu]).toEqual(LANGUAGES_NAME.german)
            })
        })
        test(`Should get countries which contains ${LANGUAGES_NAME.dutch} language. Searching by uppercase code (${LANGUAGES_CODE.nld.toUpperCase()})`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld.toUpperCase()).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.nld]).toEqual(LANGUAGES_NAME.dutch)
            })
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by part of ${LANGUAGES_NAME.spanish}`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.spanish.slice(0, -2)).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by part of ${LANGUAGES_CODE.nld}`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld.slice(0, -1)).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by non exist language name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.dutch + LANGUAGES_NAME.spanish).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
    })

})