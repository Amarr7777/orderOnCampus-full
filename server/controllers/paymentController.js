const stripe = require('stripe')('sk_test_51OZ4LlSFJsovVYEtp2K5Pyk3etuQMFoynoV72KI64gFD1GVO1qzvk5RnzKa3KbADzjqC4HGn171Xxh0BVsrpCQea00s7KF0WnN')

exports.paymentIntent = async (req,res) => {
    const { amount } = req.body
    console.log("amount",amount)
    try {
        //create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount*100,
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true
            }
        })
        res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (e) {
        res.status(500).send(`Error creating Payment Intent ${e}`);
    }
}