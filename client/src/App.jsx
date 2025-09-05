import React, { useEffect, useState } from 'react';
import api from './api';
import PropertyCard from './components/PropertyCard';
import FilterBar from './components/FilterBar';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyModal from './components/PropertyModal';
import './App.css';

export default function App() {
  const [propsList, setPropsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null); // selected property for modal
  const [showModal, setShowModal] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await api.get('/properties');
      setPropsList(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleView = (property) => {
    setSelected(property);
    setShowModal(true);
  };

  // filters
  const filtered = propsList.filter(p => {
    const byType = filterType === 'All' ? true : p.type === filterType;
    const q = search.trim().toLowerCase();
    const bySearch = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    return byType && bySearch;
  });

  return (
    <div className="container">
      <h1>Property Listings</h1>
      <FilterBar
        filterType={filterType}
        setFilterType={setFilterType}
        search={search}
        setSearch={setSearch}
      />
      <AddPropertyForm onAdded={fetchProperties} />
      {loading ? <p>Loading...</p> : (
        <div className="cards">
          {filtered.length === 0 ? <p>No properties found</p> :
          filtered.map(p => (
            <PropertyCard key={p.id} property={p} onView={() => handleView(p)} />
          ))}
        </div>
      )}
      {showModal && selected && (
        <PropertyModal property={selected} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
