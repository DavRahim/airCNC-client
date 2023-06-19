export const addBooking = async (bookings) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookings),
  });
  const data = await response.json();
  return data;
};

//update rooms status 

export const updateStatus = async(id, status) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    const data = await response.json();
    return data
}


//get all booking for a user by email;

export const getBooking = async email =>{
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/bookings?email=${email}`);
  const bookings = await response.json();
  return bookings;
}

// get a host booking
export const getHostBooking = async email =>{
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/bookings/host?email=${email}`
  );
  const bookings = await response.json();
  return bookings;
}

//delete booking 
export const deleteBookings = async id =>{
  const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })

  const data = await response.json()
  return data
}