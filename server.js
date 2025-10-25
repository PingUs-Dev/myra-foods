import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Email Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'sanjaibalasubramaniam26@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'your-app-password-here',
  },
});

// Generate Customer Email HTML
const generateCustomerEmail = (order) => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
      <td style="padding: 16px; font-weight: 500; color: #333;">${item.name}</td>
      <td style="padding: 16px; text-align: center; color: #666;">×${item.quantity}</td>
      <td style="padding: 16px; text-align: right; color: #16a34a; font-weight: 600;">₹${
        (parseInt(item.price.replace('₹', '')) * item.quantity).toFixed(0)
      }</td>
    </tr>
  `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - Myra Foods</title>
  </head>
  <body style="font-family: system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 40px; background-color: #f5f5f5; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="text-align: center; margin-bottom: 32px;">
        <img src="https://your-logo-url.com" alt="Myra Foods" style="width: 120px;">
      </div>
      
      <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0 0 24px;">Order Confirmation</h1>
      
      <p style="color: #4b5563; line-height: 1.6;">
        Dear ${order.customerDetails.name},
      </p>
      
      <p style="color: #4b5563; line-height: 1.6;">
        Thank you for your order! We're excited to prepare your delicious selection. Here's a summary of your order:
      </p>

      <div style="margin: 24px 0; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead style="background-color: #f8fafc;">
            <tr>
              <th style="padding: 16px; color: #6b7280;">Item</th>
              <th style="padding: 16px; text-align: center; color: #6b7280;">Quantity</th>
              <th style="padding: 16px; text-align: right; color: #6b7280;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
          <tfoot style="background-color: #f8fafc;">
            <tr>
              <td style="padding: 16px; font-weight: 700;">Total</td>
              <td></td>
              <td style="padding: 16px; text-align: right; color: #16a34a; font-weight: 700;">₹${order.total.toFixed(0)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style="margin: 24px 0; padding: 24px; background-color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 16px;">Delivery Details</h2>
        <p style="color: #4b5563; line-height: 1.6; margin: 0;">
          ${order.customerDetails.address}
        </p>
      </div>

      <p style="color: #4b5563; line-height: 1.6;">
        We'll process your order and send you another email with the delivery details. If you have any questions, please don't hesitate to contact us.
      </p>

      <p style="color: #4b5563; line-height: 1.6; margin-top: 24px;">
        Best regards,<br>
        The Myra Foods Team
      </p>
    </div>
  </body>
  </html>
  `;
};

// Admin notification email
const generateAdminEmail = (order) => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${(parseInt(item.price.replace('₹', '')) * item.quantity).toFixed(0)}</td>
    </tr>
  `
    )
    .join('');

  return `
    <h2>New Order Received</h2>
    <h3>Customer Details:</h3>
    <p>Name: ${order.customerDetails.name}</p>
    <p>Email: ${order.customerDetails.email}</p>
    <p>Phone: ${order.customerDetails.phone}</p>
    <p>Address: ${order.customerDetails.address}</p>
    
    <h3>Order Details:</h3>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2"><strong>Total</strong></td>
          <td><strong>₹${order.total.toFixed(0)}</strong></td>
        </tr>
      </tfoot>
    </table>
  `;
};

// Routes
app.post('/cart/process-order', async (req, res) => {
  try {
    const order = req.body;

    // Validate order
    if (!order || !order.items || !order.customerDetails) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order data',
      });
    }

    // Send confirmation email to customer
    await transporter.sendMail({
      from: '"Myra Foods" <sanjaibalasubramaniam26@gmail.com>',
      to: order.customerDetails.email,
      subject: 'Order Confirmation - Myra Foods',
      html: generateCustomerEmail(order),
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: '"Myra Foods Orders" <sanjaibalasubramaniam26@gmail.com>',
      to: 'sanjaibalasubramaniam26@gmail.com', // Admin email
      subject: 'New Order Received - Myra Foods',
      html: generateAdminEmail(order),
    });

    // Generate random order ID
    const orderId = Math.random().toString(36).substring(2, 15);

    res.json({
      success: true,
      message: 'Order processed successfully',
      orderId,
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing order',
    });
  }
});

// Export for testing
export const adminEmailTemplate = generateAdminEmail;
export const customerEmailTemplate = generateCustomerEmail;

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});