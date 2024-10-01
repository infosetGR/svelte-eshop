import Stripe from 'stripe';
import { STRIPE_API_KEY, HOSTNAME, API_VERSION } from '$env/static/private';

const stripe = new Stripe(STRIPE_API_KEY, {
     apiVersion: API_VERSION
});


console.log(stripe)

export const POST = async ({ request }) => {
    try {
        
        const { items } = await request.json();
        let lineItems = [];

        await items.forEach((item) => {
            lineItems.push({
                price: item.stripe_id,
                quantity: 1
            });
        });

        console.log('SEND TO STRIPE')
        console.log(lineItems)
        const lineItems1 = [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Product Name',
                    },
                    unit_amount: 2000, // Amount in cents
                },
                quantity: 1,
            },
        ];
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: lineItems1,
                mode: 'payment',
                // success_url: 'https://www.in.gr',
                // cancel_url: 'https://www.in.gr'
                success_url: 'http://localhost:5173/payment-success',
                cancel_url: 'http://localhost:5173/payment-canceled'
            });
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }

        console.log("SESSION")
        console.log(session)
        return new Response(
            JSON.stringify({
                url: session.url
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
    catch (e) {
        return new Response(
            JSON.stringify({
                message: "Something went wrong while trying to checkout",
                error: e
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
}
