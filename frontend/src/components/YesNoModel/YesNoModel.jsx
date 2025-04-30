import './YesNoModel.css';

function YesNoModel({ message, onYes, onNo }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{message}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                    <button onClick={onYes}>Yes</button>
                    <button className="cancel" onClick={onNo}>No</button>
                </div>
            </div>
        </div>
    );
}

export default YesNoModel;
