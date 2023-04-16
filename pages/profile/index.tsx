import react from 'react';
import {NextPage} from 'next';
import { CreateAdmin } from '@components/components/forms/CreateAdmin';
import { useRouter } from 'next/router';

const Profile : NextPage= () =>{

    return(
        <div className='w-screen h-screen bg-grey-500 flex flex-col justify-center items-center'>
            <CreateAdmin/>
        </div>
    )
};

export default Profile;