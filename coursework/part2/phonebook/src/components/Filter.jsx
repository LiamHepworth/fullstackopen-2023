const Filter = ({displayContacts, search, setSearch}) => {
    return ( 
        <form onSubmit={displayContacts}>
        <div>Search: <input value={search} onChange={e => setSearch(e.target.value)}/> </div>
        <div><button type="submit">lookup</button></div>
      </form>
     );
}
 
export default Filter;