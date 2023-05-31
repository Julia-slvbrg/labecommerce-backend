"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
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
];
exports.products = [
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
];
function createUser(inputId, inputName, inputEmail, inputPassword) {
    const newUser = {
        id: inputId,
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    return 'Cadastro realizado com sucesso';
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(inputId, inputName, inputPrice, inputDescription, inputImageUrl) {
    const newProduct = {
        id: inputId,
        name: inputName,
        price: inputPrice,
        description: inputDescription,
        imageUrl: inputImageUrl
    };
    exports.products.push(newProduct);
    return 'Produto criado com sucesso';
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchProductByName(inputName) {
    return (exports.products.filter((product) => {
        const checkProduct = product.name.toLocaleLowerCase().includes(inputName.toLocaleLowerCase());
        if (checkProduct)
            return product;
    }));
}
exports.searchProductByName = searchProductByName;
//# sourceMappingURL=database.js.map