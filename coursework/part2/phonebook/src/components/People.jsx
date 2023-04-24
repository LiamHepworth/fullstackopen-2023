const People = ({visiblePeople}) => {
    return ( 
        <ul>
        {visiblePeople.map((person) => (
          <li key={person.id}>{person.name}: {person.number}</li>
        ))}
      </ul>
     );
}
 
export default People;