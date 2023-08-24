import react from "react";
import './BtnContinuar.css';
import { Link } from 'react-router-dom';
import { blogdata } from '../blogdata';
import { useParams } from 'react-router-dom';

function BtnContinuar() {



    const { slug } = useParams();
    const blogpost = blogdata.find(post => post.slug === slug);

    return (
        <>
            <button className="btnContinuar">

                <Link to={`/juego/${blogpost.slug}`}>
                    Continuar
                </Link>
            </button>
        </>
    );
}

export { BtnContinuar };