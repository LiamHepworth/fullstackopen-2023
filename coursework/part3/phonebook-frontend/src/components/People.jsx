const People = ({visiblePeople, deleteContact}) => {
    return ( 
        <ul>
        {visiblePeople.map((person) => (
          <li key={person.id}>
            <span>{person.name}: {person.number}</span> 
            <button onClick={() => deleteContact(person.id)}>delete</button>
          </li>
        ))}
      </ul>
     );
}
 
export default People;