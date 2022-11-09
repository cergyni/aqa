import { Currencies } from "./types/types"

export function getArrayOfCountriesNames(arrayCountries: any, isCommonName: boolean) {
    const arrayNames: string[] = []
    arrayCountries.forEach((el: any) => {
        arrayNames.push(el.name[isCommonName ? "common" : "official"]);
    })
    return arrayNames
}

export function getObjOfCurrencies(arrayCountries: any) {
    const currencies: Currencies = {
        name: [],
        symbol: []
    }
    arrayCountries.forEach((el: any) => {
        const arrKeys = Object.keys(el.currencies)
        if (arrKeys.length < 2) {
            arrKeys.forEach(key => {
                currencies.name.push(el.currencies[key].name.toLowerCase())
                currencies.symbol.push(el.currencies[key].symbol)
            })
        }
    })
    return currencies
}