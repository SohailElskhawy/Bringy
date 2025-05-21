import useCategories from '../../hooks/useCategories';
import useSuppliers from '../../hooks/useSuppliers';
import './AddProductModel.css';
function AddProductModel({ product, setProduct, onSubmit, onClose, mode }) {
    const {categories, loading } = useCategories();
    const {suppliers} = useSuppliers();
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
                <select
                    value={product.category_id._id}
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                >
                    <option value="" disabled>Select Category</option>
                    {loading ? (
                        <option>Loading...</option>
                    ) : (
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))
                    )}
                </select>
                <select
                    value={product.supplier_id._id}
                    onChange={(e) => setProduct({ ...product, supplier_id: e.target.value })}
                >
                    <option value="" disabled>Select Supplier</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>


                <button onClick={onSubmit}>
                    {mode === 'Add' ? "Add " : "Edit "}Product
                </button>
                <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default AddProductModel;