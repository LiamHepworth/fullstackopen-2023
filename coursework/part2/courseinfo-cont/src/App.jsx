const Header = ( {course} ) => {
  return ( 
    <h1>{course.name}</h1>
  );
}

const Part = ( {part, exercise} ) => {
  return ( 
    <p>
      {part}: {exercise}
    </p>
  );
}

const Course = ( {course} ) => {

  // console.log(course.parts[0].exercises)
  console.log(course.parts.map((c) => c.exercises).reduce((a, c) => a + c));

  return ( 
    <>
      <Header course={course}></Header>

      <ul>
        {course.parts.map((c) =>
          <li key={c.id}>
            <Part part={c.name} exercise={c.exercises}></Part>
          </li>
        )}
      </ul>

      <p><strong>Total Excercises: {course.parts.map((c) => c.exercises).reduce((a, c) => a + c)}</strong></p>
    </>
  );
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App