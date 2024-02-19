import ThreeScene from "../components/ThreeScene";
import Diamonds from "../components/diamonds";

const LandingPage = () =>{
    return(
    <section className=" relative flex h-screen w-screen  lg:flex-row flex-col-reverse overflow-hidden">
    <div className="pointer-events-none z-50 flex flex-1 w-full justify-center relative h-full  p-4 md:pr-96 ">
        <div className="opacity-0 md:mt-72 max-w-full md:max-w-xl relative flex flex-col justify-end md:justify-center">

            <h1 data-aos="animation-scale-y" data-aos-delay="200" className=" text-5xl lg:text-6xl xl:text-7xl font-semibold font-sans dark:text-bluegray-50">
            <span className="flex text-9xl font-mono font-extrabold text-indigo-500 transition-all mix-blend-color-dodge">Hey!</span>
            <p className="leading-tight text-4xl">I'm Jorge but some call me @jürgendev</p>
            <p className="tracking-tighter text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></h1>
        
        </div>
        
    </div>

        <div className="z-30 mr-5  w-full h-full absolute">
            {/* <app-isometric-cubes ></app-isometric-cubes> */}
            {/* <Diamonds/> */}
            <ThreeScene/>
        </div>
        <div className="pointer-events-none w-full h-80 bg-gradient-to-t absolute bottom-0 dark:from-slate-900 from-indigo-100 z-30"></div>
</section>
    );
}
export default LandingPage;