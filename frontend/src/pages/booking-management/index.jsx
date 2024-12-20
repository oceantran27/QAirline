import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FlightSection } from '@/components/BookingManagement/flight-section';
import axios from 'axios';

export default function FlightBookingPage() {
  const router = useRouter();
  const { bookingID, email } = router.query;
  const [bookingData, setBookingData] = useState(null);
  const [departureTicketData, setDepartureTicketData] = useState([]);
  const [returnTicketData, setReturnTicketData] = useState([]);
  const [departureFlightData, setDepartureFlightData] = useState(null);
  const [returnFlightData, setReturnFlightData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bookingID) {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
        return;
      }

      // Fetch booking data
      axios
        .get(`http://localhost:3030/api/booking/?id=${bookingID}`, {
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
                axios.get(`http://localhost:3030/api/ticket/?id=${ticketID}`, {
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
                axios.get(`http://localhost:3030/api/ticket/?id=${ticketID}`, {
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
              .get(`http://localhost:3030/api/flight/?id=${booking.departureFlightId}`, {
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
              .get(`http://localhost:3030/api/flight/?id=${booking.returnFlightId}`, {
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
        }))}
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
            passengerDetails={returnTicketData.map((ticket) => ({
            firstName: ticket.ownerData.firstName,
            lastName: ticket.ownerData.lastName,
            seatCode: ticket.seatCode,
            }))}
        />
        )}
    </div>
  );
}
