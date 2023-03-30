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

        {/* TAMAÑO */}
        <div className="flex gap-1 flex-col items-start justify-center">
            <label htmlFor="size" className="label">
                Tamaño:
            </label>
            <select
                // className="input"
                placeholder="Tamaño..."
                className="input"
                {...register('size', {
                    required: true
                })}>
                <option value="SMALL">Pequeño</option>
                <option value="MEDIUM">Mediano</option>
                <option value="BIG">Grande</option>
            </select>
            {errors.size?.type === 'required' ? (
                <p className="text-red-500 text-xs italic">
                    Tamaño es obligatorio
                </p>
            ) : null}
        </div>


        {/* ESPECIE */}
        <div className="flex gap-1 flex-col items-start justify-center">
            <label htmlFor="breed" className="label">
                Especie:
            </label>
            <select
                className="input"
                placeholder="Especie..."
                {...register('breed', {
                    required: true
                })}>
                <option value="gato">Gato</option>
                <option value="perro">Perro</option>
                <option value="tortuga">Tortuga</option>
                <option value="ave">Ave</option>
                <option value="otro">Otro...</option>
            </select>
            {errors.breed?.type === 'required' ? (
                <p className="text-red-500 text-xs italic">
                    Es obligatorio indicar una especie.
                </p>
            ) : null}
        </div>

        {/* DESCRIPCION */}
        <div className="flex flex-col gap-1 items-start justify-center">
            <label htmlFor="description" className="label">
                ¿Cómo es la mascota que deseas publicar?
            </label>
            <textarea
                placeholder="Escribe aquí una pequeña descripción de tu Paw-Mascota."
                className="input"
                {...register('description', {
                    required: true,
                    minLength: 20,
                    pattern: /[a-zA-Z\s:]/
                })}
            />
            {errors.description?.type === 'required' ? (
                <span className="text-red-500 text-xs">
                    Debes completar éste campo.
                </span>
            ) : null}
            {errors.description?.type === 'minLength' ? (
                <span className="text-red-500 text-xs">
                    Debes agregar una descripción de al menos 20
                    caracteres.
                </span>
            ) : null}
        </div>

        {/* FOTO */}
        <div className="flex flex-col gap-1 items-start justify-center">
            <label className="label">Foto:</label>
            <input
                onChange={e => handleChange(e)}
                className="input"
                id="photo"
                type="file"
                multiple
                accept="image/*"
            />
        </div>

        <button
            type="submit"
            className="text-center bg-pwgreen-500 py-3 my-2 rounded-md shadow-xl text-pwgreen-50 font-bold uppercase font-Rubik hover:bg-pwgreen-800 transition-all">
            CREAR ADOPCIÓN
        </button>
    </form>
  );
};
