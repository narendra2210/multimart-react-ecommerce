import axios from 'axios';
import { Col } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productroute } from '../../utils/Apiroutes';
import './product.css';

const Product = () => {
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(productroute);
                setProduct(response.data); 
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData(); // Call the async function
    }, []); // Pass an empty array as the second argument to useEffect

    return (
        <div className='ff'>
            {product.map((item) => (
                <div className="product-container" key={item._id}>
                    {/* Render each product item */}
                    <img src={item.img} alt={item.name}  className='productImg'/>
                    <h3 className='productName'>{item.name}</h3>
                    <p className='productDesc'>{item.description}</p>
                    <p className='productPrice'>Price: {item.price}</p>
                    {user.role === 'seller' && (
                        <Link to={`/product/view/${item._id}`}>view</Link>
                    )}
                </div>
            ))}
        </div>



    );
};

export default Product;
