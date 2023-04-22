import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { useUsers } from '@components/components/ContextProvider/ContextProvider';
import { useT } from "@components/components/ContextProvider/LanguagesProvider";

type Props = {
    userName: string
    userEmail: string
    userPicture: string
}

const getUserById = async(id : String) =>{
    const response = await fetch(`http://localhost:3000/api/users/${id}`);
    const user = await response.json();
    
    if(!user){
        return 'There is no data';
    };
    return user;
};

const UserButton = ({ userName, userEmail, userPicture }: Props) => {

    const t = useT();
    const usuario = useUsers();
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
    }, [dbUser, usuario])

    const showMenu = () => {
        const menu = document.getElementById('dropdown')

        if (!menu) return
        if (dropdown) {
            menu.classList.add('hidden')
            setDropdown(false)
            return
        }

        menu.classList.remove('hidden')
        setDropdown(true)
    }

    return (
        <div className="w-max relative z-40">
            <button
                onClick={showMenu}
                className="w-max text-pwgreen-50 bg-pwgreen-600 hover:bg-pwgreen-800 font-medium rounded-lg text-sm px-4 py-2.5 flex gap-2 items-center z-40 transition-all"
                type="button">
                <Image
                    src={userPicture}
                    alt="not found"
                    width={24}
                    height={24}
                    className="rounded-full"
                />
                <span className="hidden xl:block">{userName}</span>
            </button>
            <div
                id="dropdown"
                className="absolute top-12 border border-pwgreen-500 hidden right-0 z-40 w-max bg-pwgreen-50 rounded divide-y divide-slate-200 shadow-lg transition-all">
                <div className="py-3 px-4 text-sm text-pwgreen-800">
                    <div className="font-medium truncate">{userEmail}</div>
                </div>
                <ul
                    className="text-sm text-pwgreen-800"
                    aria-labelledby="dropdownInformationButton">
                    <li className={isAdmin ? '' : 'hidden'}>
                        <Link href={'/dashboard'} className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                            {t.navbar.dashboard}
                        </Link>
                    </li>
                    <li>
                        <Link href={'/profile'} className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                            {t.navbar.profile}
                        </Link>
                    </li>
                    <li>
                        <Link href={'/bookmarks'} className="block py-3 px-4 md:hidden hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                            {t.navbar.favorites}
                        </Link>
                    </li>
                    <li>
                        <Link href={'/profile/transaction'} className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                            {t.navbar.courses}
                        </Link>
                    </li>
                </ul>
                <div className="text-sm text-pwgreen-800">
                    <Link href={'/api/auth/logout'} className="block py-3 px-4 hover:bg-pwgreen-600 hover:text-pwgreen-50 transition-colors">
                        {t.navbar.logout}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserButton;