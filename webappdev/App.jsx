import React, { useState } from 'react';
import { categories, products as initialProducts } from './product';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState(0);
  const [purchaseList, setPurchaseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.categoryID === Number(selectedCategory));

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedProduct("");
    setAmount(0);
    setErrorMessage("");
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setAmount(0);
    setErrorMessage("");
  };

  const currentProduct = products.find(p => p.productID === Number(selectedProduct));

  const handleAddItem = () => {
    if (!currentProduct) return;
    const qty = Number(amount);

    if (qty <= 0) {
      setErrorMessage("Amount must be greater than zero");
      return;
    }

    if (qty > currentProduct.inventoryAmount) {
      setErrorMessage(`Not enough item, only ${currentProduct.inventoryAmount} left`);
      return;
    }

    setErrorMessage("");

    const existingIndex = purchaseList.findIndex(item => item.productID === currentProduct.productID);
    
    if (existingIndex > -1) {
      const updatedList = [...purchaseList];
      updatedList[existingIndex].amount += qty;
      setPurchaseList(updatedList);
    } else {
      const categoryObj = categories.find(c => c.categoryID === currentProduct.categoryID);
      setPurchaseList([...purchaseList, {
        ...currentProduct,
        categoryTitle: categoryObj ? categoryObj.categoryTitle : "",
        iconName: categoryObj ? categoryObj.iconName : "",
        amount: qty
      }]);
    }

    setProducts(products.map(p => 
      p.productID === currentProduct.productID 
        ? { ...p, inventoryAmount: p.inventoryAmount - qty } 
        : p
    ));

    setAmount(0);
    setSelectedProduct("");
  };

  const grandTotal = purchaseList.reduce((acc, item) => {
    const discountedPrice = item.sellingPrice * (1 - item.discountPercentage / 100);
    return acc + (discountedPrice * item.amount);
  }, 0);

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <div className="card" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px' }}>Select Category: </label>
          <select value={selectedCategory} onChange={handleCategoryChange} style={{ padding: '5px', width: '250px' }}>
            <option value="All">All</option>
            {categories.map(cat => (
              <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryTitle}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: '10px' }}>Select Product: </label>
            <select 
              value={selectedProduct} 
              onChange={handleProductChange} 
              style={{ padding: '5px', width: '200px' }}
            >
              <option value="">Please Select An Item</option>
              {filteredProducts.map(prod => (
                <option key={prod.productID} value={prod.productID}>{prod.productTitle}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ marginRight: '10px' }}>Amount: </label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))} 
              disabled={!selectedProduct}
              min="0"
              style={{ padding: '5px', width: '60px' }}
            />
          </div>

          <button 
            onClick={handleAddItem}
            disabled={!selectedProduct || amount <= 0}
            style={{
              padding: '6px 15px',
              backgroundColor: (!selectedProduct || amount <= 0) ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (!selectedProduct || amount <= 0) ? 'not-allowed' : 'pointer'
            }}
          >
            Add Item
          </button>

          {errorMessage && <span style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</span>}
        </div>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '15px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>#</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Item</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Category</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Discount</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Amount</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchaseList.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '15px', color: '#777' }}></td>
              </tr>
            ) : (
              purchaseList.map((item, index) => {
                const subtotal = (item.sellingPrice * (1 - item.discountPercentage / 100)) * item.amount;
                return (
                  <tr key={item.productID} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.productID}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.productTitle}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.iconName}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.sellingPrice}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.discountPercentage}%</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.amount}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{Math.round(subtotal)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Total: {Math.round(grandTotal)}
        </div>

      </div>
    </div>
  );
}

export default App;