import { useEffect } from "react";
import { useState } from "react";
import Container from "../Shared/Navber/Container";
import Card from "./Card";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";
import { getAllRooms } from "../../api/rooms";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useSearchParams();
    const category = params.get('category')
    // console.log(category);
    useEffect(() => {
      setLoading(true);
      // fetch("rooms.json")
      //   .then((res) => res.json())
        getAllRooms()
        .then((data) => {
          if(category){
              const filtered = data.filter(room => room.category === category);
              setRooms(filtered);
          }
          else{
            setRooms(data);
          }
          
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [category]);
    if(loading){
        return <Loader/>
    }
    return (
      <Container>
        {rooms && rooms.length > 0 ? <>
         <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rooms.map((room, ind) => (
            <Card key={ind} room={room} />
          ))}
        </div></> : <><div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
          <Heading
          title="No Rooms Av
          available In this Category"
           subtitle="Please Select Other Category"
           center={true}
          />
          </div></>}
       
      </Container>
    );
};

export default Rooms;