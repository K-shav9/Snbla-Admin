import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import arrowUp from "../../assets/img/arrow-up.svg";


const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation(); // Detect route change
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 600); // Show button after 300px scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <button className="scroll_to_top bg-light border-0" type="button" onClick={scrollToTop}><img src={arrowUp} alt="image" className="h-[30px] w-[30px]"
            /></button>
        )
    );
};

export default ScrollToTop;

