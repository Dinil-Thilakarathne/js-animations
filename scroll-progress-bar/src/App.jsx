import { Body } from "../components/Body"
import Lenis from '@studio-freight/lenis'
import { motion, useScroll, useSpring } from "framer-motion";

function App() {
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  return (
    <>
    <motion.div className="progress-bar" style={{ scaleX }} />
    <Body/>
    </>
  )
}

export default App
