import { format } from "date-fns";
import DeleteModal from "../modal/DeleteModal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteRoom } from "../../api/rooms";
import UpdateRoomModal from "../modal/UpdateRoomModal";

const RoomDataRow = ({ room, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // const modalHandler = (id) => {
  //   console.log(id, "id bookinf");
  //   deleteBookings(id).then((data) => {
  //     console.log(data);
  //     updateStatus(booking.roomId, false).then((data) => {
  //       console.log(data);
  //       fetchBooking();
  //       toast.success("Booking Canceled");
  //     });
  //   });
  //   closeModal();
  // };

  const modalHandler = (id) => {
    deleteRoom(id)
      .then((data) => {
        console.log(data);
        refetch();
        toast.success("Booking delete");
      })
      .catch((err) => console.log(err));
    closeModal();
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </span>
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
          id={room._id}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsEditModalOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </span>
      </td>
      <UpdateRoomModal
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        room={room}
        id={room._id}
        refetch={refetch}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </tr>
  );
};

export default RoomDataRow;
