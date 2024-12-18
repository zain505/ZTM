import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Teams = () => {
    let i = 1;

    const nextSlide = () =>{
      if(i == 3){
        let activeSlide = document.querySelector('.slide.translate-x-0');
        activeSlide.classList.remove('translate-x-0');
        activeSlide.classList.add('translate-x-full');
  
        let nextSlide = activeSlide.previousElementSibling.previousElementSibling;
        nextSlide.classList.remove('translate-x-full');
        nextSlide.classList.add('translate-x-0');
  
        i = 1;
      }
      else{
        i++;
  
        let activeSlide = document.querySelector('.slide.translate-x-0');
        activeSlide.classList.remove('translate-x-0');
        activeSlide.classList.add('translate-x-full');
  
        let nextSlide = activeSlide.nextElementSibling;
        nextSlide.classList.remove('translate-x-full');
        nextSlide.classList.add('translate-x-0');
    }
  
    }
  
    const previousSlide =() =>{
      if(i == 1){
        let activeSlide = document.querySelector('.slide.translate-x-0');
        activeSlide.classList.remove('translate-x-0');
        activeSlide.classList.add('translate-x-full');
  
        let previousSlide = activeSlide.nextElementSibling.nextElementSibling;
        previousSlide.classList.remove('translate-x-full');
        previousSlide.classList.add('translate-x-0');
  
        i = 3;
      }
      else{
        i--;
  
        let activeSlide = document.querySelector('.slide.translate-x-0');
        activeSlide.classList.remove('translate-x-0');
        activeSlide.classList.add('translate-x-full');
  
        let previousSlide = activeSlide.previousElementSibling;
        previousSlide.classList.remove('translate-x-full');
        previousSlide.classList.add('translate-x-0');
      }
    }

    return (
        <>
            <div id="header_slider" class="relative w-12/12 h-96 overflow-hidden mx-auto mt-5">
                <div id="slide_item" class="absolute px-10 pb-10 inset-0 bg-pink-500 flex items-end justify-center transition-all ease-in-out duration-1000 transform translate-x-0 slide">
                    <p class="bg-gray-900 px-7 py-3 text-white font-bold uppercase rounded-md opacity-80">Start your morning with a cup of coffee</p>
                </div>
                <div id="slide_item" class="absolute px-10 pb-10 inset-0 bg-purple-500 flex items-end justify-center transition-all ease-in-out duration-1000 transform translate-x-full slide">
                    <p class="bg-gray-900 px-7 py-3 text-white font-bold uppercase rounded-md opacity-80">Take a break, drink some coffee</p>
                </div>
                <div id="slide_item" class="absolute px-10 pb-10 inset-0 bg-blue-500 flex items-end justify-center transition-all ease-in-out duration-1000 transform translate-x-full slide">
                    <p class="bg-gray-900 px-7 py-3 text-white font-bold uppercase rounded-md opacity-80">Coffee is always a good idea</p>
                </div>
                <div class="absolute z-10 ml-16 bg-gray-200 w-16 h-16 flex items-center justify-center text-black cursor-pointer" onClick={nextSlide}>
                    &#x276F;
                </div>
                <div class="absolute z-10 bg-gray-200 w-16 h-16 mr-16 border-r border-gray-400 flex items-center justify-center text-black cursor-pointer" onClick={previousSlide}>
                    &#x276E;
                </div>
            </div>
        </>
    )
}
export default Teams;
