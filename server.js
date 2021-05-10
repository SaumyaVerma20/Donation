if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const stripeSecretKey= process.env.STRIPE_SECRET_KEY;
const stripePublicKey= process.env.STRIPE_PUBLIC_KEY;

const express = require ("express")
const app = express();
app.use(express.static('.'));
const fs=require('fs');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Stubborn Attachments',
              images: ['https://i.imgur.com/EHyR2nP.png'],
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });
    res.json({ id: session.id });
  });
app.listen(3000)