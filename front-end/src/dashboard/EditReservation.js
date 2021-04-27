import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationDate from "../utils/format-reservation-date";



export default function EditReservation(){
   const history = useHistory();
   const {reservation_id} = useParams();
   const [oldReservation, setOldReservation] = useState({})
   const [reservationsError, setReservationsError] = useState(null)
   useEffect(() => {
       const getReservation = async() => {
            const response = await readReservation(reservation_id);
            if(response){
                 const reservation = formatReservationDate(response)
                 setOldReservation(reservation);
            }
       }
       getReservation();
   }, [reservation_id]);
   
   const peopleFormChange = ({ target }) => {
    setOldReservation({...oldReservation, [target.name]: parseInt(target.value,10) });
}
    const formChange = ({ target }) => {
        setOldReservation({...oldReservation, [target.name]: target.value});
    }
    const formSubmit = async(event) => {
        event.preventDefault();
        setOldReservation({...oldReservation});
        try {
            await updateReservation(reservation_id , oldReservation)
            
            history.push(`/dashboard?date=${oldReservation.reservation_date}`)
        }catch (err){
            setReservationsError(err)
        }
    }
   
   return (
       <>
       <h2>Edit Reservation</h2>
       <ErrorAlert error={reservationsError} />
       <form onSubmit={formSubmit} className="ml-5" style={{width: "24rem"}}>
        <div className="mb-3">
                    <label htmlFor="first_name" className="form-label fw-bold">First Name:</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="first_name" 
                    name="first_name"
                    placeholder="First Name" 
                    value={oldReservation.first_name}
                    onChange={formChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-lable fw-bold">Last Name:</label>
                    <input 
                    id="last_name" 
                    name="last_name" 
                    className="form-control" 
                    placeholder="Last Name"
                    value={oldReservation.last_name}
                    onChange={formChange}
                    required
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="mobile-number" className="formlable fw-bold">Mobile Number:</label>
                    <input 
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        className="form-control"
                        placeholder="(555)555-5555"
                        value={oldReservation.mobile_number}
                        onChange={formChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="reservation_date" className="formlable fw-bold">Reservation Date:</label>
                    <input 
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={oldReservation.reservation_date}
                        onChange={formChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="reservation_time" className="formlable fw-bold">Reservation Time:</label>
                    <input 
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        className="form-control"
                        placeholder="HH:MM"
                        value={oldReservation.reservation_time}
                        onChange={formChange}
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="people" className="formlable fw-bold">People:</label>
                    <input 
                        type="text"
                        id="people"
                        name="people"
                        className="form-control"
                        placeholder="Number of people in party must be 1 or more."
                        value={oldReservation.people}
                        onChange={peopleFormChange}
                        required
                    />
                </div>
                <button className="btn btn-primary mt-5 mr-2"  type="submit"> Submit </button>
                <button className="btn btn-danger mt-5" onClick={() => history.goBack()}> Cancel </button>
        </form>
       </>
   )
}