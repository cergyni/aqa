export function getArrayOfCountriesNames(arrayCountries: any, isCommonName: boolean) {
    const arrayNames: string[] = []
    arrayCountries.forEach((el: any) => {
        if (isCommonName) {
            arrayNames.push(el.name.common)
        } else {
            arrayNames.push(el.name.official)
        }
    })
    return arrayNames
}
interface Currencies {
    name: Array<string>;
    symbol: Array<string>;
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
                currencies.name.push(el.currencies[key].name)
                currencies.symbol.push(el.currencies[key].symbol)
            })
        }
    })
    return currencies
}