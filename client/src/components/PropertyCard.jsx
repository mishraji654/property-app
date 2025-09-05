import React from 'react';

export default function PropertyCard({ property, onView }) {
  return (
    <div className="card">
      <img src={property.image || 'https://via.placeholder.com/400x250'} alt={property.name} />
      <div className="card-body">
        <h3>{property.name}</h3>
        <p><strong>Type:</strong> {property.type} | <strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> ₹{property.price?.toLocaleString()}</p>
        <p>{property.description?.slice(0, 80)}{property.description?.length > 80 ? '...' : ''}</p>
        <button onClick={onView}>View</button>
      </div>
    </div>
  );
}
