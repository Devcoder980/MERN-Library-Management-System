const newBook = (name, book, frontImageBuffer, backImageBuffer) => {
    // Convert the buffer to base64 string
    const frontImageData = frontImageBuffer.toString('base64');
    const backImageData = backImageBuffer.toString('base64');

    const imgStyle = `display: flex; width: 24rem; justify-content: center; align-items: center; position: relative;`;
    const frontImgStyle = `width: 8rem; z-index: 1;`;
    const backImgStyle = `width: 8rem; transform: rotate(20deg); position: absolute; top: 1rem; left: 50%; transform-origin: top center; z-index: 0;`;
    const containerStyle = `max-width: 800px; margin: 0 auto; text-align: center; padding: 20px;`;
    const highlightStyle = `color: #4a86e8;`;
    const btnStyle = `display: inline-block; background-color: #4a86e8; color: #fff; padding: 10px 20px; border-radius: 4px; text-decoration: none; transition: background-color 0.3s;`;
    const footerStyle = `margin-top: 20px; font-size: 14px;`;
    const h1Style = `font-size: 28px; font-weight: bold; color: #4a86e8; margin-bottom: 20px;`;

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Book Arrival - BookSaga</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap">
</head>

<body>
    <div style="${containerStyle}">
        <div>
            <img src="./logo.png" width="80" height="80" alt="BookSaga Logo">
        </div>
        <h1 style="${h1Style}">New Book Arrival!</h1>
        <p>
            Dear <span style="${highlightStyle}">${name}</span>,
        </p>
        <p>
            We're excited to announce the arrival of a new book at
            <span style="${highlightStyle}">BookSaga!</span>
        </p>

        <div style="${containerStyle}">
            <div style="${imgStyle}" id="img">
                <img align="center" src="data:image/jpeg;base64,${frontImageData}" alt="Book Cover" class="card-img-top front" style="${frontImgStyle}">
                <img align="center" src="data:image/jpeg;base64,${backImageData}" alt="Book Cover" class="card-img-top back" style="${backImgStyle}">
            </div>
        </div>

        <div style="${containerStyle}" class="card-body">
            <h5 class="card-title">Book Title: <span style="${highlightStyle}">${book.title}</span></h5>
            <p class="card-text">Author: <span style="${highlightStyle}">${book.contributors[0].author}</span></p>
            <p class="card-text">Description: <span style="${highlightStyle}">${book.description}</span></p>
        </div>

        <p>
            Get your copy now and start reading!
        </p>
        <a href="#" style="${btnStyle}" class="btn">Buy Now</a>
        <p style="${footerStyle}" class="footer">
            Best regards,<br>
            The <span style="${highlightStyle}">BookSaga</span> Team
        </p>
    </div>
</body>

</html>
`;
}

module.exports = newBook;
