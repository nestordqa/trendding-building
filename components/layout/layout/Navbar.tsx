import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import UserButton from './UserButton';
import {
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { useUser } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import { useUsers } from '@components/components/ContextProvider/ContextProvider'
import { useT } from "@components/components/ContextProvider/LanguagesProvider";
import logo from '../../../public/images/logo_trendding.png';
import styles from '../../../styles/Navbar.module.css';

const getUserById = async(id : String) =>{
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  const user = await response.json();
  
  if(!user){
      return 'There is no data';
  };
  return user;
};

export const Navbar = () => {

    const usuario = useUsers();
    const { user } = useUser();
    const t = useT();
    const [navbar, setNavbar] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');

    const router = useRouter();
    const { asPath, locale } = useRouter();

    let id: string = ''
    if (user && user.sub && usuario) {
        id = usuario
    }
    const { data: dbUser, isLoading } = useQuery(['user', id], () =>
        getUserById(id)
    )

    useEffect(() => {
      if (!isLoading && dbUser) {
        setName(dbUser.firstName || user?.name);
        setEmail(dbUser.email || user?.email);
        setPicture(dbUser.photo || user?.picture);
      }
  }, [isLoading])
  
  return (
    <nav className="w-full bg-black-50 text-white shadow fixed h-28 z-50">
      <div className="justify-around px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 mt-4  border-pink-50 border rounded-3xl z-50">
        <div>
          <div className="flex flex-row items-center justify-between py-3 md:py-5 md:block">
            <Link href="/"
                style={{
                    display: `flex`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    flexDirection: `row`
                }}            
            >
              <Image
                src={logo}
                style={{
                  width: "49.09px",
                  height: "56.68px",
                }}
                alt='Trendding App'
              />
            <span className="text-3xl font-medium">
              Trendding
            </span>
            </Link>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col justify-center ml-16 items-center p-8 w-auto h-3/4 space-y-4 opacity-50 md:flex md:flex-row md:w-auto md:h-full md:space-x-12 md:space-y-0 md:p-0 md:opacity-100 mt-2">
                <li className="text-dark hover:text-darkBlue font-bold md:font-medium text-base">
                <Link href="/courses">{t.navbar.inicio}</Link>
                </li>
                <li className="text-dark hover:text-darkBlue font-bold md:font-medium text-base">
                <Link href="/resources">{t.navbar.memberships}</Link>
                </li>
                <li className="text-dark hover:text-darkBlue font-bold md:font-medium text-base">
                <Link href="/memberships">{t.navbar.resources}</Link>
                </li>
                <li className="text-dark hover:text-darkBlue font-bold md:font-medium text-base">
                <Link href="/about">{t.navbar.help}</Link>
                </li>
                <li>
                {/* <div className="mt-3 space-x-4 flex flex-row w-full justify-center items-center">
                    {
                        locale === 'en' ?
                            <Link href={asPath} locale={'es'}>
                                ES
                            </Link>
                        :
                            <Link href={asPath} locale={'en'}>
                                EN
                            </Link>
                    }
                </div> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="ml-2">
          {!user ? (
              <div>
                <Link href="/api/auth/login" style={{textDecoration: 'none'}}>                  
                    <button className={styles.button}>
                        {t.navbar.login}
                    </button>
                </Link>
                <Link href="/#" style={{textDecoration: 'none'}}>                  
                    <button className={styles.buttonStart}>
                        {t.navbar.start}
                    </button>
                </Link>
              </div>
          ) : (
              <UserButton
                userName={name ?? ''}
                userEmail={email ?? ''}
                userPicture={picture ?? ''}
              />
          )}
        </div>
      </div>
    </nav>
  );
};