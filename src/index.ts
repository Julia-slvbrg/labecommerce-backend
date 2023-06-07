import { createProduct, createUser, getAllProducts, getAllUsers, products, searchProductByName, users } from "./database";
import express, { Request, Response} from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";




//console.log('aplicação iniciada');

//----- ISSO É DOS PASSOS ANTERIORES-------
/* 
console.table(products)
console.table(users)
*/

//console.log(createUser('u003', 'Gabo', 'gabo@email.com', 'gabo123'))


//console.log(getAllUsers())

//console.log(createProduct('prod003', 'SSD gamer', 349.99, 'Acelere seu sistema com velocidades incríveis de leitura.', 'https://picsum.photos/seed/Monitor/400'))

//console.log(getAllProducts())


//console.log(searchProductByName('mouse'))

//--------------------------------------------//
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log ('Servidor rodando na porta 3003')
});

app.get('/ping', (req: Request, res: Response)=>{
    res.send('PONG!')
});

//get all users
app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
});

//get all products
app.get('/products', (req: Request, res: Response)=>{
    res.status(200).send(products)
});

//get productc by name
app.get('/product/search', (req: Request, res: Response)=>{
    const name = req.query.name as string

    if(!name){
        res.status(400).send(['Produto não encontrado', products])
    }

    const searchProductByName = products.filter((product)=>{
        return product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    })

    searchProductByName.length > 0? res.status(200).send(searchProductByName) : res.status(400).send(['Produto não encontrado', products])
});

//create user
app.post('/users', (req: Request, res: Response)=>{
    const {id, name, email, password, createdAt} = req.body;

    const newUser:TUser={
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    res.status(201).send('Cadastro realizado com sucesso');
    console.log(users);
})

//create product
app.post('/products', (req: Request, res: Response)=>{
    const {id, name, price, description, imageUrl} = req.body;

    const newProduct:TProduct={
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct);
    res.status(201).send('Produto cadastrado com sucesso')
    console.log(products)
})