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

const Course = ( {courses} ) => {

  return ( 
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course}></Header>
          <ul>
            {course.parts.map((c) =>
              <li key={c.id}>
                <Part part={c.name} exercise={c.exercises}></Part>
              </li>
            )}
          </ul>
          <p><strong>Total Excercises: {course.parts.map((c) => c.exercises).reduce((a, c) => a + c)}</strong></p>
        </div>
      ))}
  </>

  );
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses}></Course>
    </div>
  )
}

export default App