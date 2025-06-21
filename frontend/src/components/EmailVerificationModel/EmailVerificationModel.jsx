function EmailVerificationModel({setVerificationModal}) {

    const handleSendVerificationEmail = async () => {
        const customer = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/send-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: customer.email,
                name: customer.name,
                token: token
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Verification email sent successfully!');
        } else {
            alert(data.message || 'Failed to send verification email');
        }
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content"> 
                <div className="modal-header">
                    <h2>Email Verification</h2>
                    <button className="close-button" onClick={() => setVerificationModal(false)}>
                        &times;
                    </button>
                </div>

                <p>Please verify your email address to proceed.</p>
                <button
                    onClick={() => {
                        handleSendVerificationEmail();
                        setVerificationModal(false);
                    }}
                >
                    Resend Verification Email
                </button>
            </div>
        </div>
    )
}

export default EmailVerificationModel