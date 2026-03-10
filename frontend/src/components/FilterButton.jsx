const FilterButton = ({ setStatus }) =>{

    return(
        <div className="flex gap-3">
            <button onClick={() =>setStatus("")} className="bg-blue-400 p-2 rounded-full text-white font-semibold cursor-pointer hover:bg-blue-600 transition">All</button>
            <button onClick={() =>{setStatus("Pending")}} className="bg-red-400 p-2 rounded-full text-white font-semibold cursor-pointer hover:bg-red-600 transition">Pending</button>
            <button onClick={() =>{setStatus("In Progress")}} className="bg-yellow-400 p-2 rounded-full text-white font-semibold cursor-pointer hover:bg-yellow-600 transition">In Progress</button>
            <button onClick={() =>{setStatus("Completed")}} className="bg-green-400 p-2 rounded-full text-white font-semibold cursor-pointer hover:bg-green-600 transition">Completed</button>
        </div>
    )
}
export default FilterButton;