import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
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

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
app.use(session({
    secret: 'confidential',
    resave: false,
    saveUninitialized: true,
    host: 'localhost',
}));
// app.use(history());

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

app.get('/api/users/:userId/cart', async (req, res) => {
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

app.post('/api/users/:userId/cart', async (req, res) => {
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

app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
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

//Todo: User Resgistration
app.post('/api/users/register', async (req, res) => {
    const { email, password } = req.body;
    const cartItems = []
    let message = '';
    if (!email || !password) {
        message = "All fields are mndatory"
        res.status(400).send(message);
    }
    const db = await database();
    const userAVL = await db.collection('users').findOne({ mail: email });
    if (userAVL) {
        message = "User is already registered";
        res.status(202).send(message);
    }
    else {
        await db.collection('users').insertOne({
            "mail": email,
            "pass": password,
            "cartItems": cartItems
        })
        const userCheck = await db.collection('users').findOne({ mail: email });
        if (userCheck) {
            message = "User has been registered";
            res.status(200).send(message);
        }
    }
});

//Todo: User Login
app.get('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    let message = '';
    if (!email || !password) {
        message = "All fields are mndatory"
        res.status(400).send(message);
    }
    const db = await database();
    const user = await db.collection('users').findOne({ mail: email });
    if (user) {
        message = "Found the User";
        // req.session.user_id = user.id;
        // res.status(202).send([user._id , message]);
        res.status(202).send([req.session.id, message]);
    }
    else {
        message = "User not found, kindly register first in order to login"
        res.status(404).send(message);
    }
});

//Todo: User Logout
app.get('/api/users/logout', async (req, res) => {
    req.session.destroy();
    res.status(202).send("User has been logged out");
    // res.redirect('/users/login');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});