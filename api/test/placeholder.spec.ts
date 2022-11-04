import axios from "axios"
import { expect, test } from '@jest/globals'
import { getArrayOfCountriesNames, getObjOfCurrencies } from "../helper"
import { baseUrl, COUNTRIES_NAMES, CURRENCY, NOT_FOUND_MESSAGE, SCHEMA_NAME } from "../constants/constants"
describe("HTTPS tests", () => {
    describe("Name", () => {
        const fullText = {
            params: {
                fullText: true
            }
        }

        let res: any;
        test(`Should get country ${COUNTRIES_NAMES.brazil}`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.brazil}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.brazil]));
        })
        test(`Should get country ${COUNTRIES_NAMES.guinea}`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.guinea}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.guinea]));
        })
        test(`Should get country ${COUNTRIES_NAMES.tanzania} by part name`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.tanzania.slice(0, -4)}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            const arrayOfCountriesNames = getArrayOfCountriesNames(res.data, true)
            expect(arrayOfCountriesNames).toEqual(expect.arrayContaining([COUNTRIES_NAMES.tanzania]));
        })
        test(`Should get error after search country ${COUNTRIES_NAMES.mexico} by part name (flag fullText=true)`, async () => {
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
            expect(res.data.message).toEqual('Page '+NOT_FOUND_MESSAGE)
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


    describe("currency", () => {
        let res: any
        test(`Should get countries contains currency ${CURRENCY.dollar}`, async () => {
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
        test(`Should get countries contains currency ${CURRENCY.euro}`, async () => {
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
        test(`Should get countries contains currency ${CURRENCY.BYN}`, async () => {
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
        test(`Should get countries contains currency ${CURRENCY.dollar} by part currency name (${CURRENCY.dollar.slice(0, -2)})`, async () => {
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
        test(`Should NOT get countries contains currency ${CURRENCY.BYN} by lowercase part code`, async () => {
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
        test(`Should get message ${NOT_FOUND_MESSAGE} search by uppercase part of ${CURRENCY.BYN} `, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.BYN.slice(0, -1)).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
        test(`Should get message ${NOT_FOUND_MESSAGE} search by non exist currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar + CURRENCY.euro).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(404)
            expect(res.data.message).toEqual(NOT_FOUND_MESSAGE)
        })
    })



    describe("LANGUAGE", () => {
        let res: any;
        test(`Should get country `, async () => {
            try {
                res = await axios.get(baseUrl + `lang/${COUNTRIES_NAMES.brazil}`).then(res => res).catch(err => err.response)
            } catch (error: any) {
                console.log(error.message);
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true))
                .toEqual(expect.arrayContaining([COUNTRIES_NAMES.brazil]));
        })
    })

})