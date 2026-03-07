const SearchBar = ({search, setSearch}) =>{

    return(
        <input type="text"
        value={search}
        placeholder="Search"
        onChange={(e) =>{
            setSearch(e.target.value)
        }}
        />
    );
};

export default SearchBar;