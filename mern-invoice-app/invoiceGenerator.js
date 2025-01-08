const fs = require('fs');
const PDFDocument = require('pdfkit');

const generateInvoice = (invoiceData, filePath) => {
    const doc = new PDFDocument({ margin: 50 });

    // Header
    doc
        .fontSize(20)
        .text('Invoice', { align: 'center', underline: true })
        .moveDown();

    // Company Details
    doc
        .fontSize(12)
        .text(`Company Name: ${invoiceData.companyName}`)
        .text(`Company Address: ${invoiceData.companyAddress}`)
        .moveDown();

    // Customer Details
    doc
        .text(`Customer Name: ${invoiceData.customerName}`)
        .text(`Customer Address: ${invoiceData.customerAddress}`)
        .moveDown();

    // Items Table Header
    doc
        .fontSize(12)
        .text('Item Name', 50, doc.y, { width: 150, align: 'left', continued: true })
        .text('Quantity', 200, doc.y, { width: 80, align: 'right', continued: true })
        .text('Price', 280, doc.y, { width: 80, align: 'right', continued: true })
        .text('Total', 360, doc.y, { width: 80, align: 'right', continued: true })
        .text('GST %', 440, doc.y, { width: 80, align: 'right', continued: true })
        .text('Gross Total', 520, doc.y, { width: 80, align: 'right' })
        .moveDown();

    // Draw a line under the header
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Items Table Rows
    invoiceData.items.forEach((item) => {
        doc
            .text(item.itemName, 50, doc.y, { width: 150, align: 'left', continued: true })
            .text(item.quantity, 200, doc.y, { width: 80, align: 'right', continued: true })
            .text(`$${item.price.toFixed(2)}`, 280, doc.y, { width: 80, align: 'right', continued: true })
            .text(`$${item.total.toFixed(2)}`, 360, doc.y, { width: 80, align: 'right', continued: true })
            .text(`${item.gst}%`, 440, doc.y, { width: 80, align: 'right', continued: true })
            .text(`$${item.grossTotal.toFixed(2)}`, 520, doc.y, { width: 80, align: 'right' })
            .moveDown();
    });

    // Draw a line above the footer
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // Summary Section
    doc
        .moveDown()
        .fontSize(12)
        .text(`Subtotal: $${invoiceData.subtotal.toFixed(2)}`, { align: 'right' })
        .text(`Total GST: $${invoiceData.totalGST.toFixed(2)}`, { align: 'right' })
        .text(`Gross Total: $${invoiceData.grossTotal.toFixed(2)}`, { align: 'right' });

    // Footer
    doc
        .moveDown(2)
        .fontSize(10)
        .text('Thank you for your business!', { align: 'center', italics: true });

    // Finalize the PDF and save it
    doc.end();
    doc.pipe(fs.createWriteStream(filePath));
};

module.exports = { generateInvoice };
