import mailjetClient from "../config/mailjet";
const sendVerificationEmail = async (email, name, token) => {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const request = mailjetClient
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "sohailelskhawy@gmail.com",
                        "Name": "Bringy"
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": name
                        }
                    ],
                    "Subject": "Welcome to Bringy! Please verify your email.",
                    "TextPart": `Hello, ${name}`,
                    "HTMLPart":  `
                    <p>Click the link below to verify your email:</p>
                    <a href="${verificationUrl}">${verificationUrl}</a>
                    <p>This link expires in 1 hour.</p>`
                }
            ]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
};

export default sendVerificationEmail;