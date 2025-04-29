import { useState } from 'react';
import './Products.css';

const fakeProducts = [
  {
    id: 1,
    name: 'Apple',
    price: 1.2,
    image_url: 'https://waapple.org/wp-content/uploads/2021/06/Variety_Cosmic-Crisp-transparent-300x300.png',
    category_id: 'fruit123',
    supplier_id: 'supplier456',
  },
  {
    id: 2,
    name: 'Milk',
    price: 2.5,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeG3FLZR0Oaf9VHqSkvMWRNRYlpUNt-zutLw&s  ',
    category_id: 'dairy789',
    supplier_id: 'supplier123',
  },
];

function Products() {
  const [username] = useState('Admin');

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const handleEdit = (productId) => {
    console.log(`Edit product ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
  };

  const handleAddProduct = () => {
    console.log('Add new product');
  };

  return (
    <div className="products-container">
      <header className="products-header">
        <nav>
          <button onClick={() => console.log('Navigate to Orders')}>Orders</button>
          <button onClick={() => console.log('Navigate to Products')}>Products</button>
        </nav>
        <div className="products-welcome">
          <span>Welcome, {username}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <h1>Product Management</h1>

      <div className="add-product-wrapper">
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Category ID</th>
            <th>Supplier ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img src={product.image_url} alt={product.name} width="60" height="60" />
              </td>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.category_id}</td>
              <td>{product.supplier_id}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
