import './CategoryModel.css';
function CategoryModel({ category, setCategory, onSubmit, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="model-header">
                    <h2>Add Category</h2>
                </div>
                <input
                    type="text"
                    placeholder="Name"
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                />
                <button onClick={onSubmit}>
                    Add Category
                </button>
                <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default CategoryModel;