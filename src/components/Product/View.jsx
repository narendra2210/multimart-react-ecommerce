import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Assuming you're using react-router-dom
import { reviewroute, viewroute } from '../../utils/Apiroutes';
import './View.css'; // Import CSS file

const View = () => {
  const { id } = useParams(); // Getting the id from the URL
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState([]);

useEffect(() => {
    const fetchProduct = async () => {
    try {
        const response = await axios.get(`${viewroute}${id}`);
        console.log(response);
        setProduct(response.data.foundProduct); 
        setReview(response.data.foundProduct.reviews);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
    };

    fetchProduct();
}, [id]);

const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post(`${reviewroute}${id}/`, { rating, comment });
      const newReview = response.data.review; // Adjust this based on the actual response structure
    setReview(prevReviews => [...prevReviews, newReview]); 
    } catch (error) {
    console.error('Error submitting review:', error);
    }
};

return (
    <div className="view-container">
    <div className="product-details">
        {product && (
        <div>
<div className="product-container" key={product._id}>
              {/* Render each product product */}
            <img src={product.img} className='productImg'></img>
            <h3 className='productName'>{product.name}</h3>
            <p className='productDesc'>{product.description}</p>
            <p className='productPrice'>Price: {product.price}</p>
            <Link to={`/product/update/${product._id}`}>update</Link>
            </div>
            <h3 className='ReviewsTitle'>Reviews</h3>
            {review.length > 0 ? (
              <div className="reviews-container">
                {review.map(reviewproduct => (
                  <div key={reviewproduct._id} className="review-product">
                    <p className="rating">Rating: {reviewproduct.rating}</p>
                    <p className="comment">Comment: {reviewproduct.comment}</p>
                    <hr className="review-divider" />
                  </div>
                ))}
              </div>
            ) : (
              <p className='noReview'>No reviews yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="review-form">
    <h3>Leave a Review</h3>
    <form onSubmit={handleReviewSubmit}>
      <div className='star-ratings'>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className='ratingSelect'>
          <option value="0">Select</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className='commentInput'>
        <label htmlFor="comment">Comment:</label>
        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</div>
  );
};

export default View;
