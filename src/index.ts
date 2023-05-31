import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductByName, users } from "./database";

console.log('aplicação iniciada');

console.table(products)
console.table(users)

//console.log(createUser('u003', 'Gabo', 'gabo@email.com', 'gabo123'))


//console.log(getAllUsers())

//console.log(createProduct('prod003', 'SSD gamer', 349.99, 'Acelere seu sistema com velocidades incríveis de leitura.', 'https://picsum.photos/seed/Monitor/400'))

//console.log(getAllProducts())


console.log(searchProductByName('mouse'))