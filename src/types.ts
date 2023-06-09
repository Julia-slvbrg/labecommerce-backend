export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string  //AA-MM-DD-hh-mm-ss-msms
}

export type TProduct = { 
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    id: string,
    buyer: string,
    products: {id: string, quantity: number}[]
}