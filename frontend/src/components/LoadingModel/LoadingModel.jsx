import './LoadingModel.css';
const LoadingModel = () => {
    return (
        <div className="modal-overlay">
            <div className="modal loading-modal">
                <svg viewBox="25 25 50 50">
                    <circle r={20} cy={50} cx={50} />
                </svg>
            </div>
        </div>
    );
}


export default LoadingModel;
