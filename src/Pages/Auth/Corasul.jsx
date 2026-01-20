
 
import styles from '../../Styles/Corasul.module.css';
import Image1 from '../../Assets/Corasul_imgs/lastone.png' ;
import Image2 from '../../Assets/Corasul_imgs/bluethemtw.svg'; 
import Image3 from '../../Assets/Corasul_imgs/bluethem3.png' ;

import { useState, useEffect } from 'react';
 
import LoginSignup from '../../Pages/Auth/SigninSignup'; 
const carouselData = [
  {
     title: 'Manage Your Employees Details Easily',
    subtitle: 'You can create a employee account and manage your employees details easily like salary,leaves you can create one here. or If you have an account,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout you can and more.',
    image: Image3, 
  },
  {
    title: ' Manage And Track your whole Work in one place.',
    subtitle: 'Like Projects,Employees-Details,Task-Details you can create one here. or If you have an account,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout you can sign in here and more.',
    image: Image2, 
  },
  {
   
    title: 'Authentication Process',
    subtitle: 'If you don\'t have an account, you can create one here. or If you have an account,It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout you can sign in here.',
    image: Image1, 
  },
];
 
export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
 
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.signinsignup}>
            {/* <h1>Sign in/Sign up </h1> */}
           < LoginSignup/>
      </div>
      <div className={styles.carouselContent} key={activeSlide}>
        
        <div className={styles.imageWrapper}>
          <img
            src={carouselData[activeSlide].image}
            alt={carouselData[activeSlide].title}
            className={styles.carouselImage}
          />
        </div>
 
        
        <h2 className={styles.carouselTitle}>
          {carouselData[activeSlide].title}
        </h2>
 
        
        <p className={styles.carouselSubtitle}>
          {carouselData[activeSlide].subtitle}
        </p>
 
        
        <div className={styles.dots}>
          {carouselData.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                index === activeSlide ? styles.dotActive : ''
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
 

 
