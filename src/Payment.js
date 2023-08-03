import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from "./StateProvider"


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState();
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer

        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //Stripe expects the total in a currencies subunits'
                url: '/payments/create?total=${getBasketTotal(basket) * 100}'
            });
            setClientSecret(response.data.clientSecret) 
        }
        getClientSecret();
    }, [basket])

    console.log('the secret is >>>', clientSecret);



    const handleSubmit = async (event) => {
        //do all the fancy stripe stuff....
        event.preventDefalut();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            
            //paymentIntent = payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders')
        })
    }
    const handleChange = event => {
        //Listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
  
  
    return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout(<Link to="/checkout">{basket.length} items</Link>)</h1>
            {/* Payment section - delivery address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>Address1</p>
                    <p>Address2</p>
                </div>
            </div>


            {/* Payment section - Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>


            {/* Payment section - Payment Method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
            <div className='payment__details'>
                {/* Stripe magic */}
                
                <form onSubmit={handleSubmit}>
                    <CardElement onChange={handleChange} />

                    <div className='payment__priceContainer'>
                    <CurrencyFormat
                        renderText={(value) => (
                            <>
                            <p>
                                Subtotal({basket.length} items): <strong>{value}</strong>
                            </p>
                            <small className="subtotal__gift">
                                <input type="checkbox"/> This order contains a gift
                            </small>
                            </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                        />
                        <button disabled={processing || disabled || succeeded}>
                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                        </button>
                    </div>
                    {error && <div>{error}</div>}
                </form>                
            
            </div>
            </div>
        </div>
    </div>
  )
}

export default Payment