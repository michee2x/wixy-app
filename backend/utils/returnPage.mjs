export const returnPage = (name, verifyLink, status) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        h1 {
            font-size: 28px;
            color: #333;
        }

        p {
            font-size: 16px;
            color: #555;
            margin-bottom: 20px;
        }

        .btn {
            background-color: darkblue;
            color: white;
            padding: 15px 30px;
            font-size: 18px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
            border: none;
        }

        .btn:hover {
            background-color: #45a049;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }

        .footer a {
            color: lightblue;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Account</h1>
        <p> Hey ${name}! Thank you for ${status}! To complete your registration, please verify your email address by clicking the button below:</p>
        <a href="${verifyLink}" class="btn">Verify Your Email</a>
        
        <div class="footer">
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>Need help? Visit our <a href="https://example.com/help">Help Center</a>.</p>
        </div>
    </div>
</body>
</html>
`
}