import React from 'react';
import { NextComponentType } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { postAdmin } from '../../utils/admin';
import { postAdmins } from '../../app/types'

export const CreateAdmin : NextComponentType = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<postAdmins>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            email_verified: false,
            gender: '',
            birthday: '',
            address: '',
            phone: '',
            city: '',
            province: '',
            country: '',
            photo: '',
            role: '',
            updatedAt: null
        },
    });
    const { mutate } = useMutation(postAdmin, {
        onSuccess: () => {
            alert('Usuario creado!')
        }
    });

    const onSubmit = async (data : postAdmins) => {
        data = {...data};
        mutate(data);
        reset({
            firstName: '',
            lastName: '',
            email: '',
            email_verified: false,
            gender: '',
            birthday: '',
            address: '',
            phone: '',
            city: '',
            province: '',
            country: '',
            photo: '',
            role: '',
            updatedAt: null
        })
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

            {/* EMAIL */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="email" className="label">
                    Email:
                </label>
                <input
                    placeholder="Apellido..."
                    {...register('email', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.email?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Email es obligatorio
                    </p>
                ) : null}
                {errors.email?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        El email no puede contener mas de 20 caracteres
                    </p>
                ) : null}
            </div>  

            {/* EMAIL VERIFIED */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="email" className="label">
                    Email:
                </label>
                <input
                    {...register('email_verified', {
                        required: true
                    })}
                    type='checkbox'
                    className="checkbox"
                />
                {errors.email?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Tu email no ha sido verificado.
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

            {/* GENERO */}
            <div className="flex gap-1 flex-col items-start justify-center">
                <label htmlFor="role" className="label">
                    Rol de admin:
                </label>
                <select
                    // className="input"
                    placeholder="Rol..."
                    className="input"
                    {...register('role', {
                        required: true
                    })}>
                    <option value="ADMIN">ADMINISTRADOR</option>
                    <option value="POSTER">POSTER</option>
                    <option value="DEVELOPER">DESARROLLADOR</option>
                </select>
                {errors.gender?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Género es obligatorio
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

            {/* photo */}
            <div className="flex flex-col gap-1 items-start justify-center">
                <label htmlFor="photo" className="label">
                    Foto:
                </label>
                <input
                    placeholder="Foto..."
                    {...register('photo', {
                        required: true,
                        maxLength: 20
                    })}
                    className="input"
                />
                {errors.photo?.type === 'required' ? (
                    <p className="text-red-500 text-xs italic">
                        Foto es obligatorio
                    </p>
                ) : null}
                {errors.photo?.type === 'maxLength' ? (
                    <p className="text-red-500 text-xs italic">
                        La foto no puede contener mas de 20 caracteres
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
