import React from 'react';
import { NextComponentType } from 'next';
import Image from 'next/image';
import phone from '../../../public/images/phone1.png';
import styles from '../../../styles/Landing.module.css'

const Landing : NextComponentType = () => {
  return (
    <div className='bg-black-500 w-full h-[calc(100vh-112px)] flex justify-center items-center text-white'>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <h1>
                La opcion mas
                <br/> 
                asequible para <span>aprender</span>
                <br/>
                <span>trading</span> a nivel mundial
              </h1>
            </div>

            <div className={styles.finalPart}>
              <p>
                Descubre la forma mas eficiente y economica de aprender
              </p>
              <p>
                ¡Inscribete ahora y disfruta de un mes a nuestro cargo!
              </p>
              <button className={styles.button}>
                ¡Inscribete YA!
              </button>
              <div className={styles.selecterContainer}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              src={phone}
              alt="not found"
              width={350}
              height={420}
            />
          </div>
        </div>
    </div>
  );
};

export default Landing;