const receiptMail = (text) => {
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>BookSaga - Purchase Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #333;
        }
        .content {
          margin-bottom: 20px;
        }
        .content p {
          color: #333;
        }
        .bill {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .bill h2 {
          color: #333;
          margin-bottom: 20px;
        }
        .bill table {
          width: 100%;
          border-collapse: collapse;
        }
        .bill th,
        .bill td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .bill th {
          background-color: #ddd;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank you for your purchase!</h1>
        </div>
        <div class="content">
          <p>Dear [Customer Name],</p>
          <p>We are pleased to confirm that your purchase has been successfully processed.</p>
          <p>Your order details are as follows:</p>
          <ul>
            <li>Order Number: [Order Number]</li>
            <li>Order Date: [Order Date]</li>
            <li>Total Amount: [Total Amount]</li>
            <li>Shipping Address: [Shipping Address]</li>
          </ul>
          <p>You can find the attached bill for your purchase.</p>
          <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
          <p>Thank you for choosing BookSaga!</p>
          <p>Best regards,</p>
          <p>The BookSaga Team</p>
        </div>
        <div class="bill">
          <h2>Bill</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>[Item Name]</td>
                <td>[Quantity]</td>
                <td>[Price]</td>
                <td>[Total]</td>
              </tr>
              <!-- Add more rows for additional items -->
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">Subtotal:</td>
                <td>[Subtotal]</td>
              </tr>
              <tr>
                <td colspan="3">Shipping:</td>
                <td>[Shipping]</td>
              </tr>
              <tr>
                <td colspan="3">Total:</td>
                <td>[Total]</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="footer">`;
}

module.exports = receiptMail;