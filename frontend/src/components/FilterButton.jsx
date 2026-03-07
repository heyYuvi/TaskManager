const FilterButton = ({ setStatus }) =>{

    return(
        <div>
            <button onClick={() =>setStatus("")}>All</button>
            <button onClick={() =>{setStatus("Pending")}}>Pending</button>
            <button onClick={() =>{setStatus("In Progress")}}>In Progress</button>
            <button onClick={() =>{setStatus("Completed")}}>Completed</button>
        </div>
    )
}
export default FilterButton;