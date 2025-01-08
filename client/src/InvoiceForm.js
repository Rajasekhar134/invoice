// src/InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './InvoiceForm.css';

const InvoiceForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [items, setItems] = useState([{ itemName: '', quantity: 0, price: 0, gst: 18 }]);

  const calculateItemTotal = (quantity, price) => {
    return quantity * price;
  };

  const calculateGSTAmount = (total, gstPercentage) => {
    return (total * gstPercentage) / 100;
  };

  const calculateGrossTotal = (total, gstAmount) => {
    return total + gstAmount;
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index][e.target.name] = e.target.value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemName: '', quantity: 0, price: 0, gst: 18 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      companyName,
      companyAddress,
      customerName,
      customerAddress,
      items,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/invoices', invoiceData, { responseType: 'blob' });
      
      // Create a URL for the PDF Blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2>Invoice Generator</h2>
    
    <div>
      <label htmlFor="companyName">Company Name:</label>
      <input
        id="companyName"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
    </div>
    
    <div>
      <label htmlFor="companyAddress">Company Address:</label>
      <input
        id="companyAddress"
        type="text"
        value={companyAddress}
        onChange={(e) => setCompanyAddress(e.target.value)}
      />
    </div>
    
    <div>
      <label htmlFor="customerName">Customer Name:</label>
      <input
        id="customerName"
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
    </div>
    
    <div>
      <label htmlFor="customerAddress">Customer Address:</label>
      <input
        id="customerAddress"
        type="text"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
      />
    </div>
    
    <div>
      <h3>Items</h3>
      {items.map((item, index) => (
        <div className="item-container" key={index}>
          <label htmlFor={`itemName-${index}`}>Item Name:</label>
          <input
            id={`itemName-${index}`}
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={item.itemName}
            onChange={(e) => handleItemChange(index, e)}
          />
          <label htmlFor={`quantity-${index}`}>Quantity:</label>
          <input
            id={`quantity-${index}`}
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
          />
          <label htmlFor={`price-${index}`}>Price:</label>
          <input
            id={`price-${index}`}
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, e)}
          />
          <label htmlFor={`gst-${index}`}>GST %:</label>
          <input
            id={`gst-${index}`}
            type="number"
            name="gst"
            placeholder="GST %"
            value={item.gst}
            onChange={(e) => handleItemChange(index, e)}
          />
          <button
            type="button"
            className="remove-item"
            onClick={() => handleRemoveItem(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-item" onClick={handleAddItem}>
        Add Item
      </button>
    </div>
    
    <button type="submit">Generate Invoice</button>
  </form>
  
  );
};

export default InvoiceForm;
