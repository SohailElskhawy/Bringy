import './CustomerRegister.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
function CustomerRegister() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)


    const handleSubmit = async (e) => {

        e.preventDefault()
        const data = {
            name,
            email,
            password
        }

        const res = await fetch('http://localhost:5000/api/users/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

        const result = await res.json();

		if (!res.ok) {
			alert(result.message || 'Register failed');
			return;
		}

		// Save token and user to localStorage
		localStorage.setItem('token', result.token);
		localStorage.setItem('user', JSON.stringify(result.user));

		alert('Login successful');
		navigate('/'); // redirect to home
    }

    return (
        <div className="register_page">
            <h1>Bringy</h1>
            <form className="form register" onSubmit={handleSubmit}>
                <p className="form-title">
                    Create an account
                </p>
                <div className="input-container">
                    <input placeholder="Enter name" type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter email" type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span>
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter password" type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="show-password">
                        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
                <button className="submit" type="submit">
                    Sign up
                </button>
                <p className="signup-link">
                    Already have an account?
                    <a 
                        href='/customer/login'
                        className='signup-link_a '
                    >Sign in</a>
                </p>
            </form>
        </div>
    )
}

export default CustomerRegister