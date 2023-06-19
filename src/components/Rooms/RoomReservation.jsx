import { useContext, useState } from "react";
import Button from "../Button/Button";
import DatePicker from "./DatePicker";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../modal/BookingModal";
import { formatDistance, subDays } from "date-fns";
// import { addBooking, updateStatus } from "../../api/bookings";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({roomData}) => {
  const {user}= useContext(AuthContext)
  const navigate = useNavigate()
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
        " "
      )[0]
    ) * roomData.price;

  

  const [isOpen, setIsOpen] = useState(false)


  //date range
   
  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });
  //booking sate
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    price: totalPrice,
    to: value.endDate,
    from: value.startDate,
    title: roomData.title,
    roomId: roomData._id,
    image : roomData.image,
  });
  const handleSelect = () =>{
      setValue({...value})
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  // const modalHandler = () => {
  //   addBooking(bookingInfo).then(data =>{
  //     console.log(data)
  //     updateStatus(roomData._id, true)
  //       .then((data) => {
  //         console.log(data);
  //         toast.success("Booking successful");
  //         navigate('/dashboard/my-bookings')
          
  //         closeModal();
  //       })
  //       .catch((err) => console.log(err));
  //   }).catch(err =>{
  //     console.log(err);
  //      closeModal()
  //     })
  //   console.log(bookingInfo);
  // };
    return (
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">$ {roomData.price}</div>
          <div className="font-light text-neutral-600">night</div>
        </div>
        <hr />
        <div className="flex justify-center">
          <DatePicker handleSelect={handleSelect} value={value} />
        </div>

        <hr />
        <div className="p-4">
          <Button
            onClick={() => setIsOpen(true)}
            disabled={roomData.host.email === user.email || roomData.booked}
            label="Reserve"
          />
          <hr />
        </div>
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>$ {totalPrice}</div>
        </div>
        <BookingModal
          // modalHandler={modalHandler}
          isOpen={isOpen}
          bookingInfo={bookingInfo}
          closeModal={closeModal}
        />
      </div>
    );
};

export default RoomReservation;