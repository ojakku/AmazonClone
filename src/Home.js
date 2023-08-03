import React from 'react'
import "./Home.css"
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className="home__container">
            <img className='home__image' src="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61aURrton0L._SX3000_.jpg" alt=""/>
            
            <div className='home__row'>
                <Product
                id = "12375234"
                title='The Lean Startup' 
                price={29.99} 
                image ="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg" 
                rating={3}/>
                <Product
                id = "32498743"
                title='2022 Apple MacBook Pro Laptop with M2 chip:(13.3-inch)' 
                price={1881.84} 
                image ="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61L5QgPvgqL._SX522_.jpg" 
                rating={3}/>
            </div>

            <div className='home__row'>
            <Product
                id = "4903850"
                title="Fitbit Charge 4" 
                price={98.99} 
                image ="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466.jpg" 
                rating={3}/>
                <Product
                id = "871325851"
                title="Corsair K70 MK.2 " 
                price={98.99} 
                image ="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71hdk4PnJFL._SY355_.jpg" 
                rating={3}/>
                <Product
                id = "78412359"
                title="iPhone 14 Pro 128GB Space Black"
                price={2132.92}
                image ="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/61XO4bORHUL._SX569_.jpg" 
                rating={3}/>
            </div>

            <div className='home__row'>
            <Product
                id = "89741232"
                title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor"
                price={1831.47}
                image ="https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71MlcO29QOL._SX450_.jpg" 
                rating={3}/>
            </div>
        </div>
    </div>
  )
}

export default Home