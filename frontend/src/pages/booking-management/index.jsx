import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { Download } from 'lucide-react';
import { FlightSection } from '@/components/BookingManagement/flight-section';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import ModernFlightTicket from '@/components/checkin/flight-ticket';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function FlightBookingPage() {
  const router = useRouter();
  const { bookingID, email } = router.query;
  const [bookingData, setBookingData] = useState(null);
  const [departureTicketData, setDepartureTicketData] = useState([]);
  const [returnTicketData, setReturnTicketData] = useState([]);
  const [departureFlightData, setDepartureFlightData] = useState(null);
  const [returnFlightData, setReturnFlightData] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    if (bookingID) {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
        return;
      }

      // Fetch booking data
      axios
        .get(`${API_BASE_URL}/api/booking/?id=${bookingID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const booking = response.data.data;
          setBookingData(booking);

          // Fetch departure tickets data
          if (booking.departureIdTickets && booking.departureIdTickets.length > 0) {
            Promise.all(
              booking.departureIdTickets.map((ticketID) =>
                axios.get(`${API_BASE_URL}/api/ticket/?id=${ticketID}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              )
            )
              .then((responses) => {
                setDepartureTicketData(responses.map((res) => res.data.data));
              })
              .catch((err) => {
                setError('Không thể tải dữ liệu vé đi. Vui lòng thử lại sau.');
                console.error(err);
              });
          }

          // Fetch return tickets data
          if (booking.returnIdTickets && booking.returnIdTickets.length > 0) {
            Promise.all(
              booking.returnIdTickets.map((ticketID) =>
                axios.get(`${API_BASE_URL}/api/ticket/?id=${ticketID}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              )
            )
              .then((responses) => {
                setReturnTicketData(responses.map((res) => res.data.data));
              })
              .catch((err) => {
                setError('Không thể tải dữ liệu vé về. Vui lòng thử lại sau.');
                console.error(err);
              });
          }

          // Fetch departure flight data
          if (booking.departureFlightId) {
            axios
              .get(`${API_BASE_URL}/api/flight/?id=${booking.departureFlightId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setDepartureFlightData(response.data.data);
              })
              .catch((err) => {
                setError('Không thể tải dữ liệu chuyến bay đi. Vui lòng thử lại sau.');
                console.error(err);
              });
          }

          // Fetch return flight data
          if (booking.returnFlightId) {
            axios
              .get(`${API_BASE_URL}/api/flight/?id=${booking.returnFlightId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                setReturnFlightData(response.data.data);
              })
              .catch((err) => {
                setError('Không thể tải dữ liệu chuyến bay về. Vui lòng thử lại sau.');
                console.error(err);
              });
          }
        })
        .catch((err) => {
          setError('Không thể tải dữ liệu đặt chỗ. Vui lòng thử lại sau.');
          console.error(err);
        });
    }
  }, [bookingID]);

  const handleViewTicket = (ticket) => {
    const translatedClass = ticket.flightClass === 'economy' ? 'Phổ thông' : ticket.flightClass === 'business' ? 'Thương gia' : 'N/A';
    setSelectedTicket({ ...ticket, flightClass: translatedClass, gate: 6 });
    setDialogOpen(true);
  };

  const handleDownload = async (ticketElement) => {
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
  };

  const handleCancelTicket = async (ticketID) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Không tìm thấy token. Vui lòng đăng nhập lại.');
        return;
      }
      await axios.delete(`${API_BASE_URL}/api/ticket/?id=${ticketID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Hủy vé thành công!');
      setDialogOpen(false);
    } catch (error) {
      console.error('Lỗi khi hủy vé:', error);
      alert('Không thể hủy vé. Vui lòng thử lại sau.');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Lỗi</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!bookingData || !departureFlightData || (bookingData.returnFlightId && !returnFlightData)) {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-6">Đang tải...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Chi tiết chuyến bay</h1>
      <FlightSection
        type="departure"
        flightNumber={departureFlightData.flightNumber}
        departureTime={new Date(departureFlightData.departureTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        arrivalTime={new Date(departureFlightData.arrivalTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        departureCity={departureFlightData.departureCity}
        arrivalCity={departureFlightData.arrivalCity}
        date={new Date(departureFlightData.departureTime.seconds * 1000).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        duration={`${Math.round((departureFlightData.arrivalTime.seconds - departureFlightData.departureTime.seconds) / 60)} phút`}
        passengers={departureTicketData.length}
        paymentMethod="Thẻ tín dụng"
        passengerDetails={departureTicketData.map((ticket) => ({
          firstName: ticket.ownerData.firstName,
          lastName: ticket.ownerData.lastName,
          seatCode: ticket.seatCode,
          flightClass: ticket.flightClass,
          onView: () => handleViewTicket(ticket),
          onDownload: () => handleDownload(ticketRef.current),
        }))}
        ticketRef={ticketRef}
      />
      {returnFlightData && (
        <FlightSection
          type="return"
          flightNumber={returnFlightData.flightNumber}
          departureTime={new Date(returnFlightData.departureTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          arrivalTime={new Date(returnFlightData.arrivalTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          departureCity={returnFlightData.departureCity}
          arrivalCity={returnFlightData.arrivalCity}
          date={new Date(returnFlightData.departureTime.seconds * 1000).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          duration={`${Math.round((returnFlightData.arrivalTime.seconds - returnFlightData.departureTime.seconds) / 60)} phút`}
          passengers={returnTicketData.length}
          paymentMethod="Thẻ tín dụng"
          passengerDetails={departureTicketData
            .filter(ticket => ticket.status === 'Active') // Lọc chỉ hiển thị vé Active
            .map(ticket => ({
              firstName: ticket.ownerData.firstName,
              lastName: ticket.ownerData.lastName,
              seatCode: ticket.seatCode,
              flightClass: ticket.flightClass,
              onView: () => handleViewTicket(ticket),
              onDownload: () => handleDownload(ticketRef.current),
          }))}          
          ticketRef={ticketRef}
        />
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogOverlay />
        <DialogContent>
          {selectedTicket && (
            <div ref={ticketRef}>
              <ModernFlightTicket
                passengerName={`${selectedTicket.ownerData.firstName} ${selectedTicket.ownerData.lastName}`}
                flightNumber={departureFlightData.flightNumber}
                flightDate={new Date(departureFlightData.departureTime.seconds * 1000).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                departureTime={new Date(departureFlightData.departureTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                from={departureFlightData.departureCity}
                to={departureFlightData.arrivalCity}
                flightClass={selectedTicket.flightClass}
                boardingTime={new Date(departureFlightData.departureTime.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                gate={6}
                seat={selectedTicket.seatCode || 'N/A'}
              />
            </div>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(ticketRef.current)} // Truyền đúng tham chiếu
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Tải về
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleCancelTicket(selectedTicket?.id)} // Gọi API hủy vé
              className="gap-2"
            >
              Hủy vé
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={() => router.push('/')}>Quay trở lại trang chủ</Button>
      </div>
    </div>
  );
}
