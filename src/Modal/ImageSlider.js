import React, { useState } from 'react';
import tutorial1 from './resources/tutorial/tutorial1.png';
import tutorial2 from './resources/tutorial/tutorial4.png';
import tutorial3 from './resources/tutorial/tutorial2.png';
import tutorial4 from './resources/tutorial/tutorial3.png';

const ImageSlider = () => {
    // Definimos el estado para seguir el índice de la imagen actual
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array de imágenes
    const images = [
        tutorial1,
        tutorial2,
        tutorial3,
        tutorial4,
        // Agrega más URLs de imágenes según necesites
    ];
    const texto = [
        "Toca el campo amarillo para introducir el código que verás en la pantalla del museo Lili",
        "Completa el formulario de registro, digita nombre, documento de identidad, correo y acepta los términos y condiciones.",
        "Escoge un rol, visualiza en la pantalla los roles que ya se han elegido y quién los eligió. ",
        "Después de elegir el rol, verá en las instrucciones respectivas y un botón para continuar",

        // Agrega más URLs de imágenes según necesites
    ];

    // Función para cambiar la imagen al hacer clic en un checkbox
    const handleChangeImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div>
            <p style={{ textAlign: 'center' }}>{texto[currentImageIndex]}</p>
            <img
                src={images[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
            // style={{ width: '300px', height: '200px', marginBottom: '10px' }}
            />
            <div>
                {images.map((_, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            checked={index === currentImageIndex}
                            onChange={() => handleChangeImage(index)}
                        />

                    </label>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
