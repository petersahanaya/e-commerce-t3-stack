export const NumberFormat = (price : number) : string => {
    const FORMATER = new Intl.NumberFormat(undefined, {
        style : "currency",
        currency : "USD"
    }).format(price)

    return FORMATER
}       