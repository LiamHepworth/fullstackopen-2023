const Filter = ({filterContacts, search, setSearch}) => {
    return ( 
        <form onSubmit={filterContacts}>
        <div>Search: <input value={search} onChange={e => setSearch(e.target.value)}/> </div>
        <div><button type="submit">lookup</button></div>
      </form>
     );
}
 
export default Filter;