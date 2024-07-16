class Student {
    private static idCounter: number = 0;
    public readonly id: string;
    public name: string;
    public courses: string[];
    public balance: number;

    constructor(name: string) {
        this.id = this.generateId();
        this.name = name;
        this.courses = [];
        this.balance = 0;
    }

    private generateId(): string {
        return (Student.idCounter++).toString().padStart(5, '0');
    }

    enroll(course: string): void {
        this.courses.push(course);
    }

    payTuition(amount: number): void {
        this.balance -= amount;
    }

    viewBalance(): number {
        return this.balance;
    }

    showStatus(): string {
        return `
            Name: ${this.name}
            ID: ${this.id}
            Courses Enrolled: ${this.courses.join(', ')}
            Balance: ${this.balance}
        `;
    }
}

class StudentService {
    private students: Student[] = [];

    addStudent(name: string): Student {
        const student = new Student(name);
        this.students.push(student);
        return student;
    }

    enrollStudent(studentId: string, course: string): void {
        const student = this.findStudentById(studentId);
        if (student) {
            student.enroll(course);
        } else {
            throw new Error('Student not found');
        }
    }

    viewBalance(studentId: string): number {
        const student = this.findStudentById(studentId);
        if (student) {
            return student.viewBalance();
        } else {
            throw new Error('Student not found');
        }
    }

    payTuition(studentId: string, amount: number): void {
        const student = this.findStudentById(studentId);
        if (student) {
            student.payTuition(amount);
        } else {
            throw new Error('Student not found');
        }
    }

    showStatus(studentId: string): string {
        const student = this.findStudentById(studentId);
        if (student) {
            return student.showStatus();
        } else {
            throw new Error('Student not found');
        }
    }

    private findStudentById(studentId: string): Student | undefined {
        return this.students.find(student => student.id === studentId);
    }
}

// Example usage
const studentService = new StudentService();

const student1 = studentService.addStudent('Usama');
studentService.enrollStudent(student1.id, 'Typescript');
studentService.payTuition(student1.id, 400);

console.log(studentService.showStatus(student1.id));
