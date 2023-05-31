import { TProduct, TUser } from "./types";

export const users: TUser[] = [
    {
        id: 'u001',
        name: 'Ana Catarina',
        email: 'anacatarina@email.com',
        password: 'titi123',
        createdAt: new Date().toISOString()
    },
    {
        id: 'u002',
        name: 'Maurício',
        email: 'mauricio@email.com',
        password: 'mumu123',
        createdAt: new Date().toISOString()
    }
]

export const products: TProduct[] = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250,
        description: 'Melhor mouse do mercado',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400'
    },
    {
        id: 'prod002',
        name: 'Monitor',
        price: 900,
        description: 'Monitor LED Full HD 24 polegadas',
        imageUrl: 'https://picsum.photos/seed/Monitor/400'
    }
]

//FUNÇÃO ADICIONAR USUÁRIO

export function createUser(inputId:string, inputName:string, inputEmail:string, inputPassword:string){
    const newUser:TUser={
        id: inputId,
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return 'Cadastro realizado com sucesso'
}

//FUNÇÃO RETORNAR TODOS OS USUÁRIOS

export function getAllUsers():TUser[]{
    return users
}

//FUNÇÃO ADICIONAR PRODUTO

export function createProduct(inputId:string, inputName:string, inputPrice:number, inputDescription:string, inputImageUrl:string){
    const newProduct:TProduct={
        id: inputId,
        name: inputName,
        price: inputPrice,
        description: inputDescription,
        imageUrl: inputImageUrl
    };
    products.push(newProduct);
    return 'Produto criado com sucesso'
}

//FUNÇÃO RETORNAR TODOS OS PRODUTOS

export function getAllProducts():TProduct[]{
    return products
}

//FUNÇÃO PROCURAR UM PRODUTO POR NOME

export function searchProductByName(inputName:string):TProduct[]{
    return ( products.filter((product)=> {
        const checkProduct = product.name.toLocaleLowerCase().includes(inputName.toLocaleLowerCase());
        if(checkProduct) return product;
    }))
}