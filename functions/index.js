const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")('sk_test_51LhbVBSCUeck4So2PoRHweh7XEOTQ7pQilZyChiie8M8MgFsvJXWofz4Bs5XVcjEnJVP4H8qQEFdTtMG4u0U49Iq00mT3AxvKB');


// API

// - App config
const app = express();

// - Middlewares

app.use(cors({ origin : true }));
app.use(express.json());

// - API Routes

app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create',async (request, response) => {
        const total = request.query.total

        console.log('Payment request recieved for this amount >>>>', total);

        const paymentIntent = await stripe.paymentIntent.create({
            amount: total,
            currency: "usd"
        });

        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    })


// - Listen Command

exports.api = functions.https.onRequest(app);
