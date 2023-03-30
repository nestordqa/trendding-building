  // const testing = {
  //   firstName: 'Nestor',
  //   lastName: 'Quinones',
  //   email: 'jjjjj.com',
  //   email_verified: true,
  //   gender: 'MALE',
  //   birthday: 'keli',
  //   address: 'Elkoño',
  //   phone: 'telefonito',
  //   city: 'Elñoko',
  //   province: 'Elñokito',
  //   country: 'Elñokazo',
  //   photo: 'webazo.jpg',
  //   role: 'DEVELOPER'
  // }

//   const testing = {
//     tittle: 'Matematicas',
//     description: 'El mejor curso del mundo mundial',
//     photo: 'ola.jpg',
//     courseRole: 'GOLD'
// }

import Head from 'next/head';
import {NextPage} from 'next/types';
import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { CreateAdmin } from '@components/components/forms/CreateAdmin';
import { getAdmin, getAdminById, postAdmin, updateAdmin, deleteAdmin } from '../utils/admin';
import { getCourse, getCourseById, postCourse, updateCourse, deleteCourse } from '../utils/courses';
import { getStudent, getStudentById, postStudent, updateStudent, deleteStudent } from '../utils/students';
import { getTeacher, getTeacherById, postTeacher, updateTeacher, deleteTeacher } from '../utils/teacher';
import { getCountries, getStates, getCities } from '../utils/countries';

const Home : NextPage = ()=>{

  // const route = useRouter();
  // const { id } = route.query;

  // //Get all
  // const { 
  //   data, 
  //   isError, 
  //   isLoading 
  // } = useQuery('admins', getAdmin);

  // //Get by ID
  // const {
  //   data: adminById,
  //   isError: error,
  //   isLoading: loading
  // } = useQuery('getAdminById', ()=>{getAdminById(String(id))});

  //Update record

  // const update = {
  //   firstName: 'Larry'
  // }
  // const { mutate } = useMutation('updateAdmin', {
  //   onSuccess: ()=>{
  //     console.log('Correctamente actualizado!')
  //   }
  // });


// console.log(getCountries());
// getCountries()
//   .then((data)=>{
//     console.log(data);
//   })
//   .catch((err)=>{
//     console.log(err)
//   });

// getStates("Afghanistan")
//   .then((data)=>{
//     console.log(data)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })

  getCities("Kabul")
  .then((data)=>{
    console.log(data)
  })
  .catch((err)=>{
    console.log(err)
  })

  return (
    <>
      <Head>
        <title>Trendding App v0.0.1</title>
        <meta name="description" content="Trendding App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <CreateAdmin/>
      </main>
    </>
  );
};

export default Home;
