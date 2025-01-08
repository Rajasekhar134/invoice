// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/invoices', (req, res) => {
  const { companyName, companyAddress, customerName, customerAddress, items } = req.body;

  const doc = new PDFDocument();
  let filePath = 'invoice.pdf';

  doc.pipe(res); // Stream the PDF to the client as a response

  // Add company and customer information
  doc.fontSize(16).text(companyName, { align: 'center' }).moveDown();
  doc.fontSize(12).text(companyAddress, { align: 'center' }).moveDown();
  doc.text(`Customer: ${customerName}`).moveDown();
  doc.text(`Customer Address: ${customerAddress}`).moveDown();

  // Add table header
  doc.text('Item Name | Quantity | Price | Total | GST % | GST Amount | Gross Total');
  
  let subtotal = 0;
  let totalGST = 0;
  let grossTotal = 0;

  items.forEach(item => {
    const { itemName, quantity, price, gst } = item;

    const total = quantity * price;
    const gstAmount = (total * gst) / 100;
    const grossTotalItem = total + gstAmount;

    subtotal += total;
    totalGST += gstAmount;
    grossTotal += grossTotalItem;

    doc.text(`${itemName} | ${quantity} | ${price} | ${total} | ${gst} | ${gstAmount} | ${grossTotalItem}`);
  });

  // Add totals
  doc.text(`Subtotal: ${subtotal}`).moveDown();
  doc.text(`Total GST: ${totalGST}`).moveDown();
  doc.text(`Gross Total: ${grossTotal}`).moveDown();

  doc.end(); // Finalize the PDF
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
