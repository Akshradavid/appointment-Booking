import React, { useContext, useEffect } from "react";
import  {AdminContext} from '../../context/AdminContext'

function DoctorsList() {
  const { doctors,  atoken, getAllDoctors ,changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  },
   [atoken]
  );

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      <div className="w-full flex flex-wrap gap-20  pt-5 pl-2 gap-y-12">
        {doctors.map((item, index) => (
          <div className="border border-indigo-200  rounded-b-xs max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className="bg-indigo-50 group-hover:bg-blue-400 transition-all  duration-500" src={item.image} alt="" />

            <div>
              <p className="text-neutral-800 text-lg font-large ">{item.name}</p>
              <p className="text-zinc-700 text-sm ">{item.speciality}</p>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
                <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                 <p>Available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
}

export default DoctorsList;