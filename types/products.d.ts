type Product = {
    id : string,
    title : string
    price : number,
    description : string,
    image : string
    category : string,
    createdAt? : string
}

type UnArray<T> = T extends Array<infer J> ? J : T