const HTML_TEMPLATE = (data, totalPrice, user) => {
    // Generating HTML content dynamically based on the provided data
    const booksHtml = data.books.map(book => `
        <tr>
            <td>${book.bookTitle}</td>
            <td>${book.units}</td>
            <td>${book.price}</td>
        </tr>
    `).join('');
    const containerStyle = `max-width: 800px; margin: 0 auto; text-align: center; padding: 20px;`;
   
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Purchase Successful - BookSaga</title>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Montserrat', sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    ${containerStyle}
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
                h1 {
                    text-align: center;
                    color: #4a86e8;
                }
                p {
                    margin-bottom: 10px;
                }
                .text-center {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div>
                    <img src="https://i.ibb.co/ySXpJbr/logo.jpg" width="80" height="80" alt="BookSaga Logo">
                </div>
                <h1>Book Purchase Successful!</h1>
                <p>Dear ${user.name},</p>
                <p>Thank you for purchasing from BookSaga!</p>
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${booksHtml}
                    </tbody>
                </table>
                <p>Your book(s) will be shipped to you within 3-5 business days.</p>
                <p>Total Price: $${totalPrice}</p>
                <p class="text-center">Thank you for shopping at BookSaga!</p>
                <p class="text-center">Best regards,</p>
                <p class="text-center">The BookSaga Team</p>
            </div>
        </body>
        </html>
    `;
}

module.exports = HTML_TEMPLATE;
