import React from 'react';
import { NextComponentType } from 'next';
import { useForm } from 'react-hook-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUsers } from '../ContextProvider/ContextProvider';
import { redirectionAlert, alerts } from '../../utils/alerts';
import { updateStudent } from '../../utils/students';
import { useRouter } from 'next/router';

export const CreateAdmin : NextComponentType = () => {

    const router = useRouter();
    const { user } = useUser();
    const userId = useUsers();

    if(!user || !userId){
        redirectionAlert({
            icon: 'info',
            title: '<strong>Inicio de sesion requerido</strong>',
            html:
                'Para solicitar una membresía y poder disfrutar de todas nuestras funcionalidades' +
                ' te invitamos a iniciar sesion o crear una cuenta.',
            confirmButtonText: 'Iniciar sesion',
            confirmButtonAriaLabel: 'Thumbs up, great!',
        });
        setTimeout(()=>{
            router.push('/api/auth/login')
        }, 1000)
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data : any) => {
        let info = {
            info: true
        };
        data = {...data, ...info};
        updateStudent(data, userId)
            .then((data)=>{
                console.log(data)
            })
            .catch((err)=>{
                console.log('There was an error: ' + err)
            })
        reset()
        redirectionAlert({
            icon: 'info',
            title: '<strong>Usuario creado exitósamente</strong>',
            html:
                'Para solicitar una membresía y poder disfrutar de todas nuestras funcionalidades' +
                ' te invitamos a ver nuestro listado de membresías.',
            confirmButtonText: 'Ir al listado',
            confirmButtonAriaLabel: 'Thumbs up, great!',
        });
        setTimeout(()=>{
            router.push('/')
        }, 1000)
    };

  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <form
            className="w-full grid grid-cols-1 gap-2 items-center justify-center md:w-2/6 lg:gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* NOMBRE */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="firstName" className="label">
                    Nombre:
                </label>
                <input
                    placeholder="Nombre..."
                    {...register('firstName', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.firstName?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Nombre es obligatorio
                    </p>
                ) : null}
                {errors.firstName?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        El nombre no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>

            {/* APELLIDO */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="lastName" className="label">
                    Apellido:
                </label>
                <input
                    placeholder="Apellido..."
                    {...register('lastName', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.lastName?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Apellido es obligatorio
                    </p>
                ) : null}
                {errors.firstName?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        El nombre no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>

            {/* GENERO */}
            <div className="flex gap-1 flex-col items-start justify-center">
                <label htmlFor="gender" className="label">
                    Género:
                </label>
                <select
                    // className="input"
                    placeholder="Género..."
                    className="input"
                    {...register('gender', {
                        required: true
                    })}>
                    <option value="MALE">MASCULINO</option>
                    <option value="FEMALE">FEMENINO</option>
                    <option value="ANOTHER">OTRO...</option>
                </select>
                {errors.gender?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Género es obligatorio
                    </p>
                ) : null}
            </div>

            {/* BIRTHDAY */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="birthday" className="label">
                    Fecha de nacimiento:
                </label>
                <input
                    {...register('birthday', {
                        required: true
                    })}
                    type='date'
                    className="input"
                />
                {errors.email?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Email es obligatorio
                    </p>
                ) : null}
            </div>     

            {/* DESCRIPCION */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="address" className="label">
                    Dirección
                </label>
                <textarea
                    placeholder="Dirección..."
                    className="input"
                    {...register('address', {
                        required: true,
                        minLength: 20,
                        pattern: /[a-zA-Z\s:]/
                    })}
                />
                {errors.address?.type === 'required' ? (
                    <span className="text-red-500 text-xs">
                        Debes completar éste campo.
                    </span>
                ) : null}
                {errors.address?.type === 'minLength' ? (
                    <span className="text-red-500 text-xs">
                        Debes agregar una dirección de al menos 20
                        caracteres.
                    </span>
                ) : null}
            </div>

            {/* phone */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="phone" className="label">
                    Telefono:
                </label>
                <input
                    placeholder="ATeléfono..."
                    {...register('phone', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.phone?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        phone es obligatorio
                    </p>
                ) : null}
                {errors.phone?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        El teléfono no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>  

            {/* city */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="city" className="label">
                    Ciudad:
                </label>
                <input
                    placeholder="Ciudad..."
                    {...register('city', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.city?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Ciudad es obligatorio
                    </p>
                ) : null}
                {errors.city?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        La ciudad no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>  

            {/* province */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="province" className="label">
                    Provincia:
                </label>
                <input
                    placeholder="Provincia..."
                    {...register('province', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.province?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        La provincia es obligatorio
                    </p>
                ) : null}
                {errors.province?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        La provincia no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>  

            {/* country */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="country" className="label">
                    Pais:
                </label>
                <input
                    placeholder="Pais..."
                    {...register('country', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.country?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Pais es obligatorio
                    </p>
                ) : null}
                {errors.country?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        El Pais no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>

            <button
                type="submit"
                className="text-center bg-blue-500 py-3 my-2 rounded-md shadow-xl text-blue-100 font-bold uppercase font-Rubik hover:bg-grey-50 transition-all">
                CREAR ADMIN
            </button>
        </form>
    </div>
  );
};
