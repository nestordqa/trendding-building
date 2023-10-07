import React from 'react';
import { NextComponentType } from 'next';
import Image from 'next/image';
import logo from '../../../public/images/logo_trendding.png';
import styles from '../../../styles/Landing.module.css'

const Landing : NextComponentType = () => {
  return (
    <div className='bg-black-50 w-full h-[calc(100vh-0px)] flex justify-center items-center text-white'>
        <div className={styles.container}>
          <div className={styles.building}>
            <div className={styles.logoContainer}>
              <Image
                  src={logo}
                  style={{
                    width: "59.09px",
                    height: "66.68px",
                  }}
                  alt='Trendding App'
                />
              <span className="text-4xl font-medium pl-2">
                Trendding
              </span>
            </div>
            <div className={styles.infoText}>
              Plataforma
              <br/>
              en construcción.
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>
                ¡Más información!
              </button>
            </div>
          </div>
          <div className={styles.imageBg}></div>
        </div>
    </div>
  );
};

export default Landing;