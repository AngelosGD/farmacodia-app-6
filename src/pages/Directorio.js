//Modulos necesarios para el funcionamiento de la pagina
import React, { Component, useEffect, useState } from "react";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import About from "../assets/images/About.png";
import menuIcon from "../assets/images/ham-menu-icon.png";
import "./DirectorioMedicos.css";
import buscarIcon from "../assets/images/buscar.png";
import sintomasImg2 from "../assets/images/sintomas-img-2.png";
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import twitter from "../assets/images/twitter-app-symbol.png";

/* mostrar el menu en responsive */
function showBtn() {
  const navbarShowBtn = document.querySelector(".navbar-show-btn");
  const navbarCollapseDiv = document.querySelector(".navbar-collapse");

  navbarShowBtn.addEventListener("click", function () {
    navbarCollapseDiv.classList.add("navbar-show");
  });
}

/* Ocultar menu en responsive */
function hideBtn() {
  const navbarHideBtn = document.querySelector(".navbar-hide-btn");
  const navbarCollapseDiv = document.querySelector(".navbar-collapse");
  navbarHideBtn.addEventListener("click", function () {
    navbarCollapseDiv.classList.remove("navbar-show");
  });
}

export function DirectorioPage() {
    const [sintomas, setSintomas] = useState('');
    const [especialidades, setEspecialidades] = useState([]);
  
    const buscarEspecialidad = async () => {
        console.log('Función buscarEspecialidad ejecutada');
        try {
          const sintomasLimpios = sintomas.split('\n').map((sintoma) => sintoma.trim()).filter((sintoma) => sintoma !== '');
      
          const response = await fetch('http://localhost:9002/buscar-especialidad', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sintomas: sintomasLimpios }),
          });
      
          const data = await response.json();
          setEspecialidades(data.especialidades);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <body>
      {/* Navbar Navigation -- Barra De Navegacion entre paginas */}
      <header className="header bg-blue">
        <nav className="navbar bg-blue">
          <div className="container flex">
            <a href="/" className="navbar-brand">
              <img src={LogoPng} className="img logoT" />
            </a>
            <button type="button" className="navbar-show-btn" onClick={showBtn}>
              <img src={menuIcon}></img>
            </button>
            {/* colapsar la navegacion responsaiva */}
            <div className="navbar-collapse">
              <button
                type="button"
                className=" navbar-hide-btn"
                onClick={hideBtn}
              >
                <img src="https://raw.githubusercontent.com/prabinmagar/revo-hospital-website-html-css-js/master/images/close-icon.png"></img>
              </button>

              {/* Barra De Navegacion -- NavBar */}
              <ul className="navbar-nav">
                {/* Inicio */}
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Inicio
                  </a>
                </li>
                {/* Sobre Nosotros -- About Us */}
                <li className="nav-item">
                  <a href="/About" className="nav-link">
                    Sobre Nosotros
                  </a>
                </li>
                {/* Contacto -- Contact */}
                <li className="nav-item">
                  <a href="/Contacto" className="nav-link">
                    Contacto
                  </a>
                </li>
                {/* Blog en laboratirio -- 1 day in laboratory */}
                <li className="nav-item">
                  <a href="/Blog" className="nav-link">
                    Blog
                  </a>
                </li>
              </ul>
            </div>{" "}
            {/* Fin de la barra de navegacion */}
          </div>
        </nav>
      </header>
      {/* Final del header -- encabezado */}

      <main>
        {/* Seccion para buscar un medico en el directorio */}
        <div className="directorio-main-background">
          <h2 className="directorio-titulo">Directorio De Farmacodia</h2>
          <div className="directorio-info">
            <span className="directorio-info-1">
              Reserva tu cita con medicos
              <span className="directorio-info-2">
                y especialistas de tu zona.
              </span>
            </span>
          </div>
          {/*Codigo html para la seccion de los especialistas (donde los buscas) */}
          <div className="centrar-directorio">
            <div className="buscar-main-background">
              {/*1ra opcion */}
              <div className="buscar-1-opcion">
                <span className="tipo-consulta">Tipo De Consulta</span>
                <br />
                <select className="tipo-cita">
                  <option value="linea">Cita En Linea</option>
                  <option value="presencial">Cita Presencial</option>
                </select>
              </div>
              {/*2da opcion */}
              <div className="buscar-2-opcion">
                <span className="tipo-medico">
                  Especialidad medica/Especialista
                </span>
                <br />
                <select
                  className="tipo-especialista"
                  placeholder="Estoy Buscando..."
                >
                  <option disabled selected>
                    Estoy Buscando....
                  </option>
                  <option value="Neurologia"> Neurologia</option>
                </select>
              </div>
              {/*3ra opcion */}
              <div className="buscar-3-opcion">
                <span className="ciudad-medico">Ciudad</span>
                <br />
                <select className="elegir-ciudad">
                  <option value="abasolo">Abasolo</option>
                </select>
              </div>
              {/*Boton para buscar al especialista */}
              <div className="boton-especialista">
                <button className="btn-medico">Buscar</button>
                <img className="buscar-icon" src={buscarIcon}></img>
              </div>
            </div>
            {/*Imagen de fondo del directorio */}
          </div>
          <img className="directorio-fondo" src={sintomasImg2}></img>
        </div>

        {/*Seccion para ingresar tus sintomas */}

        <div className="mover-sintomas-section">
          <div className="sintomas-main-background">
            <h2 className="sintomas-titulo">
              ¿No sabes cual especialista elegir?
            </h2>
            <span className="sintomas-text-1">
              Escribe tus síntomas y te ayudaré, en recomendarte una
              especialidad de forma rapida. (conforme a tus sintomas)
            </span>
            <textarea
              className="poner-sintomas"
              type="text"
              placeholder="Tengo mareos, dolor de cabeza...."
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            ></textarea>
            <br />
            {/*Boton para guardar los sintomsa y dar la especialidad medica */}
            <button
              className="obtener-especialidad-sintomas"
              onClick={buscarEspecialidad}
            >
              Obtener Especialidad
            </button>
            <br/>
            {especialidades.length > 0 && (
              <div className="especialidad-recomendada">
                <h2>Especialidades encontradas:</h2>
                <ul>
                  {especialidades.map((especialidad) => (
                    <li key={especialidad._id}>{especialidad.nombre}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
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
      </main>
    </body>
  );
}
