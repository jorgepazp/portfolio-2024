import { motion, useMotionValueEvent, useScroll } from "framer-motion";
export default function Projects(){
    const { scrollY,scrollYProgress } = useScroll()
useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest)
  });
  return(
  <section className="min-h-screen bg-indigo-100">
sdgsdgsd
<motion.div  initial={{ opacity: 0 }}
  whileInView={{ opacity: .4 }} style={{ scaleX: scrollYProgress }} className="size-32 bg-red-500 rounded"></motion.div>
  </section>
  )
}