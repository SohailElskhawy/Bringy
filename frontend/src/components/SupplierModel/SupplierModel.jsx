import './SupplierModel.css';
function SupplierModel({ supplier, setSupplier, onSubmit, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="model-header">
                    <h2>Add Supplier</h2>
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    value={supplier.name}
                    onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                />
                <button onClick={onSubmit}>
                    Add Supplier
                </button>
                <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default SupplierModel;