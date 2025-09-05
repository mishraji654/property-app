import React from 'react';

export default function PropertyModal({ property, onClose }) {
  const mapsUrl = property.lat && property.lng
    ? `https://www.google.com/maps?q=${property.lat},${property.lng}`
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <img src={property.image || 'https://via.placeholder.com/600x350'} alt={property.name} />
        <h2>{property.name}</h2>
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> ₹{property.price?.toLocaleString()}</p>
        <p>{property.description}</p>
        {mapsUrl && <a href={mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>}
      </div>
    </div>
  );
}
