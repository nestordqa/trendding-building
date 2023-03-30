export interface postAdmins {
    firstName: string,
    lastName: string,
    email: string,
    email_verified: boolean,
    gender: string,
    birthday: string,
    address: string,
    phone: string,
    city: string,
    province: string,
    country: string,
    photo: string,
    role: string,
    updatedAt: Date | null    
}

export interface postCourses {
    tittle: string,
    description: string,
    photo: string,
    courseRole: string,
    updatedAt: Date   
}

export interface postStudents {
    firstName: string,
    lastName: string,
    email: string,
    email_verified: boolean,
    gender: string,
    birthday: string,
    address: string,
    phone: string,
    city: string,
    province: string,
    country: string,
    photo: string,
    studentRole: string,
    courses: postCourses[],
    updatedAt: Date
}

export interface postTeachers {
    firstName: string,
    lastName: string,
    email: string,
    email_verified: boolean,
    gender: string,
    birthday: string,
    address: string,
    phone: string,
    city: string,
    province: string,
    country: string,
    photo: string,
    subject: string,
    courses: postCourses[]
    updatedAt: Date
}