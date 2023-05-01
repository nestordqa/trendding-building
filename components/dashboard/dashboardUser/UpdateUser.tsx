import { NextComponentType } from 'next';
import React from "react";
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import image from '../../../public/images/testing-logo.jpg'
import axios from 'axios';
import Image from 'next/image'
import { redirectionAlert } from '../../../utils/alerts';
import { useUsers } from '@components/components/ContextProvider/ContextProvider';
import { useT } from "@components/components/ContextProvider/LanguagesProvider";


const UserUpdate: NextComponentType = () => {

    const router = useRouter();
    interface UserUpdate {};
    const userId = useUsers();
    const t = useT();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({});
 
    const onSubmit: SubmitHandler<UserUpdate> = async(data)=> {

        let datos = {
            ...data,
            info: true,
            updatedAt: new Date()
        }
        console.log(datos, 'Soy datos')
        const response = await axios.put(`http://localhost:3000/api/users/${userId}`, datos);
        const user = await response.data;
        if(user){
            console.log('User updated')
        }
        if(!user){
            console.log('User was not updated!!!')
        }
        reset()
        redirectionAlert({
            icon: 'info',
            title: '<strong>Datos actualizados con éxito</strong>',
            confirmButtonText: 'Ok!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
        });
        setTimeout(()=>{
            router.push('/profile')
        }, 1000)
    }

    return (
        <div className="p-8 flex flex-col justify-evenly items-center bg-pwgreen-100 rounded-lg md:flex-row">
            <div className="w-full flex flex-col gap-3 justify-center items-center md:w-3/6">
                <Image
                    src={image}
                    alt="not found"
                    width={150}
                    height={150}
                />
                <h2 className="font-Rubik font-bold text-4xl lg:text-6xl">
                    {t.usersForm.updateData}
                </h2>
                
                <p className="text-md mb-2 md:text-xl md:text-center">
                    {t.usersForm.info}
                </p>
            </div>
            <form
            className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* NOMBRE */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="firstName" className="label">
                    {`${t.usersForm.name}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.name}...`}
                    {...register('firstName', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.firstName?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>

            {/* APELLIDO */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="lastName" className="label">
                    {`${t.usersForm.lastName}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.lastName}...`}
                    {...register('lastName', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.firstName?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>

            {/* GENERO */}
            <div className="flex gap-1 flex-col items-start justify-center">
                <label htmlFor="gender" className="label">
                    {`${t.usersForm.gender}:`}
                </label>
                <select
                    // className="input"
                    placeholder={`${t.usersForm.gender}...`}
                    className="input"
                    {...register('gender')}>
                    <option value="MALE">{t.usersForm.male}</option>
                    <option value="FEMALE">{t.usersForm.female}</option>
                    <option value="ANOTHER">{t.usersForm.other}</option>
                </select>
            </div>

            {/* BIRTHDAY */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="birthday" className="label">
                    {`${t.usersForm.birthdate}:`}
                </label>
                <input
                    {...register('birthday')}
                    type='date'
                    className="input"
                />
            </div>     

            {/* DIRECCION */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="address" className="label">
                    {`${t.usersForm.address}:`}
                </label>
                <textarea
                    placeholder={`${t.usersForm.address}...`}
                    className="input"
                    {...register('address', {
                        minLength: 20,
                        pattern: /[a-zA-Z\s:]/
                    })}
                />
                {errors.address?.type === 'minLength' ? (
                    <span className="text-red-500 text-xs">
                        {t.usersForm.addressError}
                    </span>
                ) : null}
            </div>

            {/* phone */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="phone" className="label">
                    {`${t.usersForm.phone}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.phone}...`}
                    {...register('phone', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.phone?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>  

            {/* city */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="city" className="label">
                    {`${t.usersForm.city}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.city}...`}
                    {...register('city', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.city?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>  

            {/* province */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="province" className="label">
                    {`${t.usersForm.province}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.city}...`}
                    {...register('province', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.province?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>  

            {/* country */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="country" className="label">
                    {`${t.usersForm.country}:`}
                </label>
                <input
                    placeholder={`${t.usersForm.country}:`}
                    {...register('country', {
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.country?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        {t.usersForm.tooLarge}
                    </p>
                ) : null}
            </div>

            <button
                type="submit"
                className="text-center bg-blue-500 py-3 my-2 rounded-md shadow-xl text-blue-100 font-bold uppercase font-Rubik hover:bg-grey-50 transition-all">
                    {t.usersForm.update}
            </button>
        </form>
        </div>
    )
}
export default UserUpdate;
