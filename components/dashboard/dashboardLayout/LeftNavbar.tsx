import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import IsoGreen from '@components/public/images/testing-logo.jpg';
import { AiFillAppstore } from 'react-icons/ai'
import { FaUser, FaPaw, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query';
import { useUsers } from '@components/components/ContextProvider/ContextProvider'
import { useT } from "@components/components/ContextProvider/LanguagesProvider";

const getUserById = async(id : String) =>{

    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    
    if(!user){
        return 'There is no data';
    };
    return user;
};

const LeftNavbar: any = () => {

    const t = useT();
    const usuario = useUsers();
    const router = useRouter();
    const [dropdown, setDropdown] = useState(false)
    const { user } = useUser()
    const [isAdmin, setIsAdmin] = useState(false)

    let id: string = ''
    if (user && user.sub && usuario) {
        id = usuario
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    useEffect(() => {
        if (!isLoading && dbUser && usuario) {
            if (dbUser.role === 'ADMIN') {
                setIsAdmin(true)
                return
            }
        }
    }, [dbUser, usuario]);

    return (
        <div className="h-full bg-white p-5 min-w-[15rem] rounded-r-lg lg:rounded-none lg:p-8">
            <div className="relative hidden lg:flex lg:items-center md:gap-2 lg:justify-start">
                <Image src={IsoGreen} alt="not found" width={40} height={40} />
                <h1 className="font-Rubik text-pwgreen-900 hidden lg:block lg:text-2xl">
                    Trendding App
                </h1>
            </div>
            <div className="my-6">
                {isAdmin ? (
                    <ul>
                        <h3 className="dashboardSideTitle">{t.leftNav.general}</h3>
                        <li
                            className={
                                router.pathname === '/dashboard'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <AiFillAppstore />
                            <Link href={'/dashboard'} className="dashboardLinks">
                                {t.leftNav.resume}
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/users'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/dashboard/users'} className="dashboardLinks">
                                {t.leftNav.users}
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/teachers'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/dashboard/users'} className="dashboardLinks">
                                {t.leftNav.teachers}
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">{t.leftNav.courses}</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/products'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <Link href={'/dashboard/#'} className="dashboardLinks">
                                {t.leftNav.courses}
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/createcourse'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <Link href={'/dashboard/#'} className="dashboardLinks">
                                {t.leftNav.create}
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">{t.leftNav.transactions}</h3>
                        <li
                            className={
                                router.pathname === '/dashboard/transactions'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/dashboard/transactions'} className="dashboardLinks">
                                {t.leftNav.transactions}
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">{t.leftNav.config}</h3>
                        <li
                            className={
                                router.pathname === '/profile'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/profile'} className="dashboardLinks">
                                {t.leftNav.profile}
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/api/auth/logout'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/api/auth/logout'} className="dashboardLinks">
                                {t.leftNav.logout}
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li
                            className='dashboardButton'>
                            <Link href={'/dashboard/mycourses'} className="dashboardLinks">
                                {t.leftNav.myCourses}
                            </Link>
                        </li>
                        <li
                            className='dashboardButton'>
                            <Link href={'/profile/apply'} className="dashboardLinks">
                                {t.leftNav.myCert}
                            </Link>
                        </li>
                        <h3 className="dashboardSideTitle">{t.leftNav.profile}</h3>
                        <li
                            className={
                                router.pathname === '/profile'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaUser />
                            <Link href={'/profile'} className="dashboardLinks">
                                {t.leftNav.profile}
                            </Link>
                        </li>
                        <li
                            className={
                                router.pathname === '/dashboard/'
                                    ? 'dashboardButton active'
                                    : 'dashboardButton'
                            }>
                            <FaSignOutAlt />
                            <Link href={'/api/auth/logout'} className="dashboardLinks">
                                {t.leftNav.logout}
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default LeftNavbar