import './AddProductModel.css';
function AddProductModel({ product, setProduct, onSubmit, onClose, mode }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="model-header">
                    <h2>{mode === 'Add' ? "Add " : "Edit "}Product</h2>
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={product.image_url}
                    onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={product.category_id}
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Supplier"
                    value={product.supplier_id}
                    onChange={(e) => setProduct({ ...product, supplier_id: e.target.value })}
                />
                <button onClick={onSubmit}>
                    {mode === 'Add' ? "Add " : "Edit "}Product
                </button>
                <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddProductModel;