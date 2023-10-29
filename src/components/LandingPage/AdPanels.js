import React, { useState, useRef } from 'react';
import image1 from "../../images/iph13.webp"
import image2 from "../../images/ssa13.jpg"
import image3 from "../../images/motorola.webp"
import image4 from "../../images/ssa54.jpg"
import image5 from "../../images/oppor8.webp"
import "./AdPanels.css"

const AdPanels = () => {

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const adpanelsRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - adpanelsRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - adpanelsRef.current.offsetLeft;
        const scrollX = x - startX;
        adpanelsRef.current.scrollLeft = scrollLeft - scrollX;
    };

    return(
        <div className="adpanels"
         ref={adpanelsRef}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         >
            <article className="card">
                <img src={image1} class="image"/>
                <section class="body white-text">
                    <h3 class="tittle">Iphone 13</h3>
                    <a class="link">Titanio</a>
                    <p class="text">Desde 50,79 €/mes al 
                        <strong><u> 0% TAE</u></strong>
                        <sup>1</sup>
                        o desde 1.219,00 € sin&nbsp;renovación
                    </p>
                </section>
            </article>

            <article className="card">
                <img src={image2} class="image"/>
                <section class="body">
                    <h3 class="tittle">Sansung A13</h3>
                    <a class="link">Vente arriba</a>
                    <p class="text">Desde 39,96 €/mes al 
                        <strong><u>0% TAE</u></strong>
                        <sup>1</sup>
                        o desde 959 € sin&nbsp;renovación
                    </p>
                </section>
            </article>

            <article className="card">
                <img src={image3} class="image"/>
                <section class="body">
                    <h3 class="tittle">Motorola</h3>
                    <a class="link">Negro</a>
                    <p class="text">Desde 49,90 €/mes al 
                        <strong><u>0% TAE</u></strong>
                        <sup>1</sup>
                        o desde 1.199 € sin&nbsp;renovación
                    </p>
                </section>
            </article>

            <article className="card">
                <img src={image4} class="image"/>
                <section class="body">
                    <h3 class="tittle">Sansung A54</h3>
                    <a class="link">Lite</a>
                    <p class="text">Desde 20,90 €/mes al 
                        <strong><u>0% TAE</u></strong>
                        <sup>1</sup>
                        o desde 1.359 € sin&nbsp;renovación
                    </p>
                </section>
            </article>

            <article className="card">
                <img src={image5} class="image"/>
                <section class="body">
                    <h3 class="tittle">Oppo Reno 8</h3>
                    <a class="link">Negro</a>
                    <p class="text">Desde 30,90 €/mes al 
                        <strong><u>0% TAE</u></strong>
                        <sup>1</sup>
                        o desde 1.400 € sin&nbsp;renovación
                    </p>
                </section>
            </article>
        </div>
    )
}

export default AdPanels