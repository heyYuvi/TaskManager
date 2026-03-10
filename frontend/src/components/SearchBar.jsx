const SearchBar = ({search, setSearch, className}) =>{

    return(
        <input type="text"
        value={search}
        placeholder="Search"
        onChange={(e) =>{
            setSearch(e.target.value);
        }}
        className={className}
        />
    );
};

export default SearchBar;