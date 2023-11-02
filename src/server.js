import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import path from 'path';
// import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';
const port = process.env.PORT || 8000;

if (port === 8000) {
    dotenv.config();
}

const mongoAtlas = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@freecluster.tfe0qix.mongodb.net/?retryWrites=true&w=majority`;
const mongoLocal = 'mongodb://127.0.0.1:27017';
const app = express();
let client = null;
const BLACKLIST = new Set();

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
// app.use(history());

const validateToken = (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.Authorization || req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send("User is not authorized or missing token");
        }
        token = authHeader.split(" ")[1];
        if (BLACKLIST.has(token)) {
            return res.status(401).send('Token revoked');
        }
        Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send("User is not authorized");
            }
            req.user = decoded.user;
            next();
        })
    }
    catch (error) {
        next(error);
    }
};


const connnectToDB = async () => {
    if (client) { return client };
    try {
        client = await MongoClient.connect(
            process.env.MONGO_USER && process.env.MONGO_PASS
                ? mongoAtlas
                : mongoLocal,
            { useNewUrlParser: true, useUnifiedTopology: true },
        );
        return client;
    }
    catch (error) {
        console.log("Error connecting to MongoDB:", error);
        throw error;
    }
}

const database = async () => {
    const client = await connnectToDB();
    return client.db(process.env.MONGO_DBNAME || 'shoeDb');
}


app.get('/api/products', async (req, res) => {
    const db = await database();
    const products = await db.collection('products').find({}).toArray();
    res.status(200).json(products);
});

app.get('/api/users/:userId/cart', validateToken, async (req, res) => {
    const { userId } = req.params;
    const db = await database();
    const user = await db.collection('users').findOne({ id: userId });
    if (!user) return res.status(404).json("Could not find user!");
    const products = await db.collection('products').find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
    res.status(200).json(cartItems);
});

app.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const db = await database();
    const product = await db.collection('products').findOne({ id: productId })
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json('Could not find the product!');
    }
})

app.post('/api/users/:userId/cart', validateToken, async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;
    const db = await database();
    await db.collection('users').updateOne({ id: userId }, {
        $addToSet: { cartItems: productId },
    });
    const user = await db.collection('users').findOne({ id: userId });
    const products = await db.collection('products').find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id =>
        products.find(product => product.id === id));
    res.status(200).json(cartItems);
});

app.delete('/api/users/:userId/cart/:productId', validateToken, async (req, res) => {
    const { userId, productId } = req.params;
    const db = await database();
    await db.collection('users').updateOne({ id: userId }, {
        $pull: { cartItems: productId },
    });
    const user = await db.collection('users').findOne({ id: userId });
    const products = await db.collection('products').find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
    res.status(200).json(cartItems);
})

app.post('/api/users/register', async (req, res) => {
    const { email, password } = req.body;
    const randomDigit = () => {
        return Math.floor((Math.random() * 10000) + 1);
    }
    let message = '';
    if (email == null || password == null) {
        message = "All fields are mandatory"
        res.status(400).send(message);
    }
    else {
        const db = await database();
        const userAVL = await db.collection('users').findOne({ mail: email });
        if (userAVL) {
            message = "User is already registered";
            res.status(202).send(message);
        }
        else {
            await db.collection('users').insertOne({
                "id": String(randomDigit()),
                "mail": email,
                "pass": password,
                "cartItems": []
            })
            const userCheck = await db.collection('users').findOne({ mail: email });
            if (userCheck) {
                message = `${userCheck.mail} has been successfully registered!!`;
                res.status(200).send(message);
            }
        }
    }
});

app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    let message = '';
    if (email == null || password == null) {
        message = "All fields are mandatory"
        res.status(400).send(message);
        return;
    }
    else {
        const db = await database();
        const user = await db.collection('users').findOne({ mail: email });
        if (user === null) {
            res.status(404).send("User not found, kindly register first in order to login");
            return;
        }
        if (user.mail === email && user.pass === password) {
            message = `${email} has logged in Successfully!!`;
            const token = Jwt.sign({ id: user.id, mail: email, msg: message }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.status(202).send(token);
        }
        else if (user.pass !== password) {
            res.status(401).send("Provided Password is wrong, Please provide correct Password")
        }
        else {
            res.status(404).send('something went wrong');
            return;
        }
    }
});

app.get('/api/users/logout', async (req, res) => {
    const token = (req.headers.Authorization || req.headers.authorization).split(' ')[1]
    BLACKLIST.add(token);
    res.status(202).send("Logged out successfully");
    setTimeout(() => {
        BLACKLIST.delete(token)
    }, 1000 * 60 * 60 * 24);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});