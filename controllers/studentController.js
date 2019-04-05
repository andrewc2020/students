import students from '../dummy/students.js';
class StudentController {
    // Get all students
    static getAllStudents(req, res) {
          return res.status(200).json({
                students,
                message: "All the students",
          });
    }
    // Get a single student
    static getSingleStudent(req, res) {
           const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
           if (findStudent) {
               return res.status(200).json({
                     student: findStudent,
                     message: "A single student record",
               });
           }
           return res.status(404).json({
                 message: "Student record not found",
           });
    }
    // Get students sorted by age
    static getStudentsByAge(req,res){
            const sortedbyage = students.sort((a,b) => (a.age > b.age) ? 1 : -1);
          return res.status(200).json({
                sortedbyage,
                message: "Students by age",
          });
    }

    // Get students sorted by name
    static getStudentsByName(req,res){
      const sortedbyname = students.sort((a,b) => (a.name.split('')[1] > b.name.split('')[1]) ? 1 : -1);
    return res.status(200).json({
          sortedbyname,
          message: "Students by name",
    });
}

    
}
export default StudentController;