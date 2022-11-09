import axios from "axios"
import { expect, test } from '@jest/globals'
import { getArrayOfCountriesNames, getObjOfCurrencies } from "../helper"
import { baseUrl, COUNTRIES_NAMES, COUNTRIES_OFFICIAL_NAMES, CURRENCY, CURRENCY_CODE, CURRENCY_SYMBOLS, LANGUAGES_CODE, LANGUAGES_NAME, NOT_FOUND_MESSAGE, SCHEMA_NAME } from "../constants/constants"
import { Currency } from "../types/types"

describe("restcountries.com", () => {
    describe("Search countries by country name. It can be the native name and partial name", () => {
        const fullText = {
            params: {
                fullText: true
            }
        }

        let res: any;
        Object.values(COUNTRIES_NAMES).forEach(values => {
            test(`Should get ${values} country`, async () => {
                try {
                    res = await axios.get(baseUrl + `name/${values}`)
                } catch (error: any) {
                    throw new Error(error.message)
                }
                expect(res.status).toEqual(200)
                expect(getArrayOfCountriesNames(res.data, true))
                    .toEqual(expect.arrayContaining([values]));
            })

        })

        test(`Should get ${COUNTRIES_NAMES.tanzania} country by part name`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.tanzania.slice(0, -4)}`)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            const arrayOfCountriesNames = getArrayOfCountriesNames(res.data, true)
            expect(arrayOfCountriesNames).toEqual(expect.arrayContaining([COUNTRIES_NAMES.tanzania]));
        })
        test(`Should get error after search ${COUNTRIES_NAMES.mexico} country by part name (flag fullText=true)`, async () => {
            try {
                res = await axios.get(baseUrl + `name/${COUNTRIES_NAMES.mexico.slice(0, -2)}`, fullText)
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.statusText).toEqual('Not Found')
            }
        })
        test(`Should get error after invalid search`, async () => {
            try {
                res = await axios.get(baseUrl + `name/`)
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual('Page ' + NOT_FOUND_MESSAGE)
            }
        })
        test(`Should get countries by official name`, async () => {
            try {
                res = await axios.get(baseUrl + `name/` + COUNTRIES_OFFICIAL_NAMES.bolivia)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, false))
                .toEqual(expect.arrayContaining([COUNTRIES_OFFICIAL_NAMES.bolivia]));
        })
        test(`Response should have property in name block contains schema`, async () => {
            try {
                res = await axios.get(baseUrl + `name/` + COUNTRIES_NAMES.mexico)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            expect(getArrayOfCountriesNames(res.data, true)).toEqual(expect.arrayContaining([COUNTRIES_NAMES.mexico]));
            for (const key in SCHEMA_NAME) {
                expect(res.data[0].name).toHaveProperty(key)
            }
        })
    })

    describe("Search countries by currency name and code", () => {
        let res: any
        
        Object.values(CURRENCY).forEach((values: keyof Currency)=> {
            test(`Should get countries containing ${values} currency`, async () => {
                try {
                    res = await axios.get(baseUrl + `currency/` + values)
                } catch (error: any) {
                    throw new Error(error.message)
                }
                expect(res.status).toEqual(200)
                const ObjOfCurrencies = getObjOfCurrencies(res.data)
                ObjOfCurrencies.symbol.forEach(elem => {                    
                    expect(elem).toEqual(CURRENCY_SYMBOLS[values])
                })
                ObjOfCurrencies.name.forEach(elem => {
                    expect(elem).toContain(values)
                })
            })
        })

        test(`Should get countries containing ${CURRENCY_CODE.BYN} currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY_CODE.BYN)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(Object.keys(el.currencies)).toEqual(expect.arrayContaining([CURRENCY_CODE.BYN]))
            });
        })
        test(`Should get countries containing ${CURRENCY.dollar} currency. Searching by part currency name (${CURRENCY.dollar.slice(0, -2)})`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar.slice(0, -2))
            } catch (error: any) {
                throw new Error(error.message)
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
        test(`Should NOT get countries containing ${CURRENCY_CODE.BYN} currency by lowercase part code`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY_CODE.BYN.slice(0, -1).toLowerCase())
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(Object.keys(el.currencies)).toEqual(expect.not.arrayContaining([CURRENCY_CODE.BYN]))
            });CURRENCY_CODE
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by uppercase part of ${CURRENCY_CODE.BYN} `, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY_CODE.BYN.slice(0, -1))
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual(NOT_FOUND_MESSAGE)
            }
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by non exist currency`, async () => {
            try {
                res = await axios.get(baseUrl + `currency/` + CURRENCY.dollar + CURRENCY.euro)
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual(NOT_FOUND_MESSAGE)
            }
        })
    })

    describe("Search countries by language name and code", () => {
        let res: any;
        test(`Should get countries containing ${LANGUAGES_NAME.german} language. Searching by name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.german)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.deu]).toEqual(LANGUAGES_NAME.german)
            })
        })
        test(`Should get countries containing ${LANGUAGES_NAME.dutch} language. Searching by code (${LANGUAGES_CODE.nld})`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld)
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.nld]).toEqual(LANGUAGES_NAME.dutch)
            })
        })
        test(`Should get countries containing ${LANGUAGES_NAME.german} language. Searching by uppercase name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.german.toUpperCase())
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.deu]).toEqual(LANGUAGES_NAME.german)
            })
        })
        test(`Should get countries containing ${LANGUAGES_NAME.dutch} language. Searching by uppercase code (${LANGUAGES_CODE.nld.toUpperCase()})`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld.toUpperCase())
            } catch (error: any) {
                throw new Error(error.message)
            }
            expect(res.status).toEqual(200)
            res.data.forEach((el: any) => {
                expect(el.languages[LANGUAGES_CODE.nld]).toEqual(LANGUAGES_NAME.dutch)
            })
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by part of ${LANGUAGES_NAME.spanish}`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.spanish.slice(0, -2))
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual(NOT_FOUND_MESSAGE)
            }
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by part of ${LANGUAGES_CODE.nld}`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_CODE.nld.slice(0, -1))
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual(NOT_FOUND_MESSAGE)
            }
        })
        test(`Should get '${NOT_FOUND_MESSAGE}' message. Searching by non-existing language name`, async () => {
            try {
                res = await axios.get(baseUrl + `lang/` + LANGUAGES_NAME.dutch + LANGUAGES_NAME.spanish)
            } catch (error: any) {
                expect(error.response.status).toEqual(404)
                expect(error.response.data.message).toEqual(NOT_FOUND_MESSAGE)
            }
        })
    })

})