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
};
  
export default Course;