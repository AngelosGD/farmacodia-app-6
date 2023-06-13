import {Route, Routes} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import LogoPng from '../assets/images/farmacodia-logo-final1.png'
import About from '../assets/images/About.png'
import menuIcon from '../assets/images/ham-menu-icon.png'
import './About.css'
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import twitter from "../assets/images/twitter-app-symbol.png";
import citasServicios from '../assets/images/citas-about.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserDoctor, faNotesMedical, faSadTear, faCapsules} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //Modulos necesarios para el funcionamiento de la pagina


/* mostrar el menu en responsive */
function showBtn(){
    
    const navbarShowBtn = document.querySelector('.navbar-show-btn')
    const navbarCollapseDiv = document.querySelector('.navbar-collapse')
    
    navbarShowBtn.addEventListener('click', function(){
        navbarCollapseDiv.classList.add('navbar-show')
    })
}


    /* Ocultar menu en responsive */
function hideBtn() {

    const navbarHideBtn = document.querySelector('.navbar-hide-btn')
    const navbarCollapseDiv = document.querySelector('.navbar-collapse')
    navbarHideBtn.addEventListener('click', function(){
        navbarCollapseDiv.classList.remove('navbar-show')
    })
}


export function AboutPage() 
{
    return(
        <body>
            
            {/* Navbar Navigation -- Barra De Navegacion entre paginas */}
            <header className='header bg-blue'>
            <nav className='navbar bg-blue'>
                <div className='container flex'>
                    <a href='/' className='navbar-brand'>
                        <img src={LogoPng} className='img logoT'/>
                    </a>

                    <button type='button' className='navbar-show-btn' onClick={showBtn}>   
                        <img src={menuIcon}></img>
                    </button>

                    {/* colapsar la navegacion responsaiva */}
                    <div className='navbar-collapse'>
                        <button type='button' className=' navbar-hide-btn' onClick={hideBtn}>
                            <img src='https://raw.githubusercontent.com/prabinmagar/revo-hospital-website-html-css-js/master/images/close-icon.png'></img>
                        </button>

                        {/* Barra De Navegacion -- NavBar */}
                        <ul className='navbar-nav'>
                            {/* Inicio */}
                            <li className='nav-item'>
                                <a href='/' className='nav-link'>
                                    Inicio
                                </a>
                            </li>
                            {/* Sobre Nosotros -- About Us */}
                            <li className='nav-item'>
                                <a href='/About' className='nav-link'>
                                    Sobre Nosotros
                                </a>
                            </li>
                            {/* Contacto -- Contact */}
                            <li className='nav-item'>
                                <a href='/Contacto' className='nav-link'>
                                    Contacto
                                </a>
                            </li>
                            {/* Blog en laboratirio -- 1 day in laboratory */}
                            <li className='nav-item'>
                                <a href='/Blog' className='nav-link'>
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div> {/* Fin de la barra de navegacion */}

                    
                </div>
            </nav>
            </header>
            {/* Final del header -- encabezado */}

        <main  className='body-about'>
       
       {/*Seccion Sobre Nosotros -- About Us */}
       <div className='about-section'>
        <div className='inner-container'>
            <h1 className='titulo-about'>Sobre Nosotros</h1>
            <p className='text-about'>
                Somos una empresa con vista en el futuro, que busca hacer mas comoda y mejor la manera en la que actualmente se llevan acabo la citas medicas, asi como otros metodos tales como la venta y compra de medicamentos en linea, viendo por la necesidad de las personas y tomando en cuenta su opinion y trantando de mejorar dia con dia.
            </p>

            <div className='skills'>
                <span>lorem ipsum</span>
                <span>lorem ipsum</span>
                <span>lorem ipsum</span>
            </div>
        </div>
       </div>

       
        </main>

        {/*Seccion Nuestros Servicios */}
        <div className='container-ourServices'>
            <h1>Nuestros Servicios</h1>
            <div className='row'>
                <div className='service-1'>
                <FontAwesomeIcon icon={faUserDoctor} className='i'/>
                    <h2>Ambas Citas</h2>
                    <p className='text-service-1'>Puedes escojer el tipo de cita, en linea o presencial de igual forma el especialista que buscas y te buscaremos en nuestra base de datos el mejor para ti.</p>
                </div>

                <div className='service-2'>
                <FontAwesomeIcon icon={faNotesMedical} className='i'/>
                    <h2>Especialistas</h2>
                    <p className='text-service-2'>Puedes escojer el tipo de cita, en linea o presencial de igual forma el especialista que buscas y te buscaremos en nuestra base de datos el mejor para ti.</p>
                </div>

                <div className='service-3'>
                <FontAwesomeIcon icon={faSadTear} className='i'/>
                    <h2>Test Depresion</h2>
                    <p className='text-service-3'>Puedes escojer el tipo de cita, en linea o presencial de igual forma el especialista que buscas y te buscaremos en nuestra base de datos el mejor para ti.</p>
                </div>

                <div className='service-4'>
                <FontAwesomeIcon icon={faCapsules} className='i'/>
                    <h2>Tienda En Linea</h2>
                    <p className='text-service-4'>Puedes escojer el tipo de cita, en linea o presencial de igual forma el especialista que buscas y te buscaremos en nuestra base de datos el mejor para ti.</p>
                </div>
            </div>
        </div>
        
        <br/>
        <br/>
        <br/>
        <br/>
        {/*Seccion del footer o pie de pagina, seccion final pue */}
      <footer id="footer" className="footer text-center">
        <div className="section1-footer">
          <img src={LogoPng} className="img-logo-footer"></img>
          <p className="text-redesSociales">
            Visita nuestras redes sociales para no perderte de nada sobre
            contenido.
          </p>
          <div className="logos-redesSociales-footer">
            <img src={facebook} className="logoFacebook-footer"></img>
            <img src={instagram} className="logoInstagram-footer"></img>
            <img src={twitter} className="logoTwitter-footer"></img>
          </div>

          <div className="Main-Links">
            <h2>Sitios Principales</h2>
            <div className="a-mainLinks">
              <a href="/About" className="a-link-main">
                Sobre Nosotros <br />
              </a>
              <a href="/Directorio" className="a-link-main">
                Directorio Medico <br />
              </a>
              <a href="/Contacto" className="a-link-main">
                Contacto <br />
              </a>
              <a href="#" className="a-link-main">
                Test Depresao <br />
              </a>
            </div>
          </div>

          <div className="Other-Links">
            <h2>Otros Sitios</h2>
            <div className="a-otherLinks">
              <a href="#" className="a-link-other">Subscribirse</a>
              <a href="#" className="a-link-other">Perfil</a>
              <a href="#" className="a-link-other">Blog</a>
              <a href="#" className="a-link-other">Iniciar Sesion</a>
              <a href="#" className="a-link-other">Registrarse</a>
            </div>
          </div>

          <div className="img-logo2-footer">
                  <img src={LogoPng}></img>
          </div>
          {/*Barra derechos de autor footer */}
          <div className="barra-F-footer">
            <p className="text1-derechosAutor">Farmacodia</p>
            <p className="text2-derechosAutor">© Derechos Reservados A - Farmacodia </p>
          </div>
        </div>
      </footer>
      
        </body>
       
    )
}