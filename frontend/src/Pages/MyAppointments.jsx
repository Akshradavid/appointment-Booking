import React, { useContext, useEffect ,useState} from 'react'
import { AppContext } from '../context/AppContext'
// import Appointment from './Appointment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const MyAppointments = () => {

 
const { token, getDoctorsData} = useContext(AppContext)
  const[appointment, setAppointment] = useState([])

  const getAppointment = async () => {
    try {
      const { data } = await axios.get("https://appointment-booking-ftpv.onrender.com/api/user/listOfAppointment",  {headers: {token}})
      if (data.success) {
       
        setAppointment(data.appointments.reverse())
        console.log(data.appointments)
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post("https://appointment-booking-ftpv.onrender.com/api/user/cancelAppointment", {appointmentId}, {headers: {token}})
      if (data.success) {
        toast.success(data.message)
        getAppointment()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


useEffect(() => {
  if (token) {
    getAppointment()
  }
},[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointment.slice(0,3).map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium' >Date & Time:</span>{item.slotDate} |  {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button> }
              {!item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel appointment</button> }
              {item.cancelled && <buttton className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500"> Appointment cancelled </buttton>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
