export interface postUser {
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
    userRole: string,
    updatedAt: Date | null    
}

export interface getUser {
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
    userRole: string,
    student: postStudents,
    teacher: postTeachers,
    active: boolean,
    updatedAt: Date | null 
    createdAt: Date | null    
}

export interface postCourses {
    tittle: string,
    description: string,
    photo: string,
    courseRole: string,
    updatedAt: Date   
}

export interface postStudents {
    id: string,
    companie: string,
    superpower: string
    socialMedia: socialMedia[],
    userId: string,
    updatedAt: Date
}

export interface socialMedia {
    socialMedia: string,
    userName: string,
    studentId: string
}

export interface postTeachers {
    id: string,
    subject: string,
    userId: string
}