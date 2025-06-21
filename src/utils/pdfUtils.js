// src/utils/pdfUtils.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';

// Function to download a PDF for a single order
export const downloadOrderRowPDF = (orderDetails) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(`Order Details - #${orderDetails._id || 'N/A'}`, 14, 20);

    // Customer Info
    doc.setFontSize(12);
    doc.text('Customer Info', 14, 30);
    doc.text(`Name: ${orderDetails.customer.name || 'N/A'}`, 14, 40);
    doc.text(`Email: ${orderDetails.customer.email || 'N/A'}`, 14, 50);
    doc.text(`Phone: ${orderDetails.customer.contact || 'N/A'}`, 14, 60);
    doc.text(`Address: ${orderDetails.customer.address || 'N/A'}`, 14, 70);

    // Divider line
    doc.setLineWidth(0.5);
    doc.line(14, 80, 200, 80);

    // Order Info
    doc.text('Order Info', 14, 90);
    doc.text(`Person Count: ${orderDetails.order.Eye_Count || 'N/A'}`, 14, 100);
    doc.text(`Print Style: ${orderDetails.order.Print_Style || 'N/A'}`, 14, 110);
    doc.text(`Size: ${orderDetails.order.Sizes || 'N/A'}`, 14, 120);
    doc.text(`Effect: ${orderDetails.order.Effects || 'N/A'}`, 14, 130);
    doc.text(`Frame: ${orderDetails.order.Frames || 'N/A'}`, 14, 140);

    // Divider line
    doc.line(14, 150, 200, 150);

    // Created At and Updated At
    doc.text(`Created At: ${orderDetails?.createdAt ? new Date(orderDetails?.createdAt).toLocaleString() : 'N/A'}`, 14, 160);
    doc.text(`Updated At: ${orderDetails?.updatedAt ? new Date(orderDetails?.updatedAt).toLocaleString() : 'N/A'}`, 14, 170);

    // Save the PDF
    doc.save(`order_${orderDetails._id || 'N/A'}.pdf`);
};

// Function to download a PDF for all orders
export const downloadAllOrdersPDF = (orders) => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(18);
    doc.text('Order Summary', 14, 20);

    // Calculate order statistics
    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'Completed').length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;

    // Add a summary with order statistics
    doc.setFontSize(12);
    doc.text(`Total Orders: ${totalOrders}`, 14, 30);
    doc.text(`Completed Orders: ${completedOrders}`, 14, 40);
    doc.text(`Pending Orders: ${pendingOrders}`, 14, 50);

    // Add a separator
    doc.line(14, 55, 200, 55);

    // Add table header
    const tableColumn = ['Style', 'Size', 'Frame', 'Effect', 'Status', 'Date'];

    // Add table rows (order details)
    const tableRows = orders.map(order => [
        order.order?.Print_Style || '',
        order.order?.Sizes || '',
        order.order?.Frames || '',
        order.order?.Effects || '',
        order.status || 'Pending',
        dayjs(order.createdAt).format('DD-MMM-YYYY'),
    ]);

    // Add table content to the PDF
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 60, // Start after the summary and separator
    });

    // Add total or other information (optional)
    doc.text(`Total Orders: ${totalOrders}`, 14, doc.lastAutoTable.finalY + 10);

    // Save the PDF as "Order_Receipt.pdf"
    doc.save('Order_Receipt.pdf');
};
