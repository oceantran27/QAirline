import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchBookingData(bookingID, token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/booking/?id=${bookingID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể tải dữ liệu đặt chỗ. Vui lòng thử lại sau.');
  }
}

export async function fetchTickets(ticketIDs, token) {
  try {
    const ticketPromises = ticketIDs.map((ticketID) =>
      axios.get(`${API_BASE_URL}/api/ticket/?id=${ticketID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );
    const responses = await Promise.all(ticketPromises);
    return responses.map((res) => res.data.data);
  } catch (error) {
    throw new Error('Không thể tải dữ liệu vé. Vui lòng thử lại sau.');
  }
}

export async function fetchFlightData(flightID, token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/flight/?id=${flightID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Không thể tải dữ liệu chuyến bay. Vui lòng thử lại sau.');
  }
}

export async function handleDownload(ticketElement) {
  try {
    if (!ticketElement) {
      console.error("Ticket element not found!");
      return;
    }

    const canvas = await html2canvas(ticketElement);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("boarding-pass.pdf");
  } catch (error) {
    console.error("Error during download:", error);
  }
}

export async function handleCancelTicket(ticketID, token) {
  try {
    await axios.delete(`${API_BASE_URL}/api/ticket/?id=${ticketID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Hủy vé thành công!');
  } catch (error) {
    console.error('Lỗi khi hủy vé:', error);
    alert('Không thể hủy vé. Vui lòng thử lại sau.');
  }
}