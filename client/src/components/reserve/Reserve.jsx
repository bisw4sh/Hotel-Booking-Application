import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const Reserve = ({ setOpen, hotelId }) => {
  const [socket, setSocket] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [availability, setAvailability] = useState([]);
  const { data, loading, error } = useFetch(
    `http://127.0.0.1:8800/api/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  useEffect(() => {
    socket?.emit("newUser", "user added");
  }, [socket]);
  useEffect(() => {
    socket?.on("selected", (data) => {
      setAvailability(data);
    });
  }, [socket]);
  console.log(availability);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e, id) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    console.log(id);
    if (checked) socket.emit("sendSelect", id);
    else socket.emit("removeSelect", id);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `http://127.0.0.1:8800/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber, ind) => (
                <div className="room" key={ind}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={(e) => handleSelect(e, roomNumber._id)}
                    disabled={
                      !isAvailable(roomNumber) ||
                      (availability.includes(roomNumber._id) &&
                        !selectedRooms.includes(roomNumber._id))
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {console.log(availability)}
        <button
          onClick={handleClick}
          disabled={availability.includes(hotelId)}
          className="rButton"
        >
          Reserve Nowww!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
