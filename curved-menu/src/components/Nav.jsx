import { navItems } from "../constants"
import { motion } from "framer-motion"
import { menuSlide } from "../constants/anime"
import Curve from "./Curve"

const Nav = () => {
    return (
        <motion.div
        variants={menuSlide}
        initial='initial'
        animate='enter'
        exit='exit'
        className="menu"
        >
            <div className="body">
                <div className="nav">
                    <div className="header">
                        <p>Navigation</p>
                    </div>
                    {
                        navItems.map((data, index) => (
                            <a
                                key={index}
                                href={data.href}
                            >
                                {data.title}
                            </a>
                        ))
                    }
                </div>
            </div>
            <Curve/>
        </motion.div>
    )
}

export default Nav