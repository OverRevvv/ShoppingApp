import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';
const port = process.env.PORT || 8000;

if (port === 8000) {
    dotenv.config();
}

const mongoAtlas = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@freecluster.tfe0qix.mongodb.net/?retryWrites=true&w=majority`;
const mongoLocal = 'mongodb://127.0.0.1:27017';
const app = express();
let client = null;

app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false }));
app.use(history());

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

app.get('/api/products', async (req, res) => {
    const client = await connnectToDB();
    const db = client.db(process.env.MONGO_DBNAME || 'shoeDb');
    const products = await db.collection('products').find({}).toArray();
    res.status(200).json(products);
});

app.get('/api/users/:userId/cart', async (req, res) => {
    const { userId } = req.params;
    const client = await connnectToDB();
    const db = client.db(process.env.MONGO_DBNAME || 'shoeDb');
    const user = await db.collection('users').findOne({ id: userId });
    if (!user) return res.status(404).json("Could not find user!");
    const products = await db.collection('products').find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
    res.status(200).json(cartItems);
});

app.get('/api/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const client = await connnectToDB();
    const db = client.db(process.env.MONGO_DBNAME || 'shoeDb');
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
    const client = await connnectToDB();
    const db = client.db(process.env.MONGO_DBNAME || 'shoeDb');
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
    const client = await connnectToDB();
    const db = client.db(process.env.MONGO_DBNAME || 'shoeDb');
    await db.collection('users').updateOne({ id: userId }, {
        $pull: { cartItems: productId },
    });
    const user = await db.collection('users').findOne({ id: userId });
    const products = await db.collection('products').find({}).toArray();
    const cartItemIds = user.cartItems;
    const cartItems = cartItemIds.map(id => products.find(product => product.id === id));
    res.status(200).json(cartItems);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});