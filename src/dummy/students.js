import _calculateAge from '../utils/age';

const _students = [
    {
      id: 1,
      name: 'Sean Grey',
      dob: '07/02/1995'
    },
    {
      id: 2,
      name: 'John Doe',
      dob: '10/08/1993'
    },
    {
      id: 3,
      name: 'Janet Dane',
      dob: '12/09/2000'
    },
    {
      id:4,
      name:'Arthur Clark',
      dob: '03/30/1993'
    }
 ];

 const students = JSON.parse(JSON.stringify(_students.reduce((acc,student)=>{
  acc[student[0]] = student[0] || []
  acc.push({
              id : student.id,
              name: student.name,
              dob: student.dob,
              age: _calculateAge(new Date(student.dob))
  })

  return acc;

},[]),2));

 export default students;