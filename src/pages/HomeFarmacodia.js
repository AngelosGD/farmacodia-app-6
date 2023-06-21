//Modulos necesarios para la HomePage
import React, { Component, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import ReactDOM from "react-dom/client";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import menuIcon from "../assets/images/ham-menu-icon.png";
import medicos from "../assets/images/Medicos.png";
import Doctor from "../assets/images/Doctor1.png";
import { data } from "autoprefixer";
import "./HomeFarmacodia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import depresao from "../assets/images/depresao.png";
import consultaD from "../assets/images/consultaD.svg";
import paciente from "../assets/images/paciente.png";
import BuscarDoctor from "../assets/images/buscar-doctor.png";
import avatarUsuario from "../assets/images/avatar-de-usuario.png";
import vistaPerfil from "../assets/images/vista.png";
import subscribirse from "../assets/images/subscribirse.svg";
import cerrrarSesion from "../assets/images/logout.svg";
import x from "../assets/images/x.svg";
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import twitter from "../assets/images/twitter-app-symbol.png";
import "tailwindcss/tailwind.css";
import img2Depresao from '../assets/images/img-depresao-2.png'
import img1Depresao from "../assets/images/img-depresao-1.png";
import img3Depresao from '../assets/images/img-depresao-3.png'
//Fin de los modulos de la HomePage

/* Funcion para mostrar el Menu en modo responsive */
export function showBtn() {
  const navbarShowBtn = document.querySelector(".navbar-show-btn");
  const navbarCollapseDiv = document.querySelector(".navbar-collapse");

  navbarShowBtn.addEventListener("click", function () {
    navbarCollapseDiv.classList.add("navbar-show");
  });
}

/* Ocultar menu en modo responsive */
export function hideBtn() {
  const navbarHideBtn = document.querySelector(".navbar-hide-btn");
  const navbarCollapseDiv = document.querySelector(".navbar-collapse");
  navbarHideBtn.addEventListener("click", function () {
    navbarCollapseDiv.classList.remove("navbar-show");
  });
}

export function showMenuUser() {
  const userMenuBtn = document.querySelector(".avatar-usuario-img");
  const subMenu = document.querySelector(".sub-menu");

  userMenuBtn.addEventListener("click", function () {
    subMenu.classList.add("class-test");
  });
}
export function hideMenuUser() {
  const hideMenuBtn = document.querySelector(".icon-x");
  const subMenu = document.querySelector(".sub-menu");

  hideMenuBtn.addEventListener("click", function () {
    subMenu.classList.remove("class-test");
    subMenu.style.transition = ".5s ease-out";
  });
}

//Funcion para el menu de interfaz si esta logeado el usuario

export function HomeFarmacodia() {
  //Variables para distintas funciones (token de login, usuario Admin, etc)
  const [isLoggedIn, setLoggin] = useState(false);
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false); //Fin variables

  //Codigo para ver si esta logeado o no, en caso de que no se expira el token y se manda un mensaje.
  useEffect(() => {
    fetch("http://localhost:9002/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired" && !tokenExpired) {
          setTokenExpired(true);
          setLoggin(false);
          window.localStorage.clear();
        }
      });
  }, []); //Fin codigo para ver si hay un usuario logeado

  //Codigo para traer los datos del usuario desde el backend y mostrarlos en la pagina.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = token;

    if (token) {
      fetch("http://localhost:9002/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.data) {
            setLoggin(true);
          } else {
            setLoggin(false);
          }
        });
    } else {
      setLoggin(false);
    }
  }); //Fin del codigo para traer los datos del usuario

  //Codigo cerrar sesion en la pagina
  const logout = () => {
    Swal.fire({
      title: "Quieres Salir?",
      text: "¿Seguro quieres cerrar la sesion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No, me equivoque",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setLoggin(false);
        window.location.href = "/";
      } else {
      }
    });
  }; //Fin del codigo de cerar sesion

  //Funciones para que al darle click los botones te manden a las pagines hijos.
  const DirectorioRed = () => {
    window.location.href = "/Directorio";
  };
  const SubscribirseRed = () => {
    Swal.fire({
      title: "Iras a subscribirte",
      text: "¿Quiees ir a ver los tipos de subscripciones?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#88ff59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No, me equivoque",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/Subscribirse";
      } else {
      }
    });
  };
  /*Funcion para mandar al manejo del perfil del ususario */
  function userPageRed() {
    Swal.fire({
      title: "Iras a tu perfil",
      text: "¿Quieres ir al manejo de tu perfil?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#88ff59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No, me equivoque",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/UserProfile";
      } else {
      }
    });
  }

  const testDepresaoRed = () =>{
    window.open('https://depresao.000webhostapp.com')
  }
  

  return (
    <body>
      {/* Navbar -- Barra de navegacion entre paginas */}
      <header className="header bg-blue" id="seccion1">
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
                {/* Link de Inicio barra de navegacion */}
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
                {/*Boton para iniciar sesion y deslogearse */}
                {isLoggedIn && (
                  <div>
                    {/*Seccion del menu despegable para interfaz de usuario */}

                    <button onClick={showMenuUser}>
                      <img
                        src={avatarUsuario}
                        className="avatar-usuario-img"
                      ></img>
                    </button>

                    <div className="sub-menu-wrap" id="subMenu">
                      <div className="sub-menu">
                        <div className="user-info">
                          <h2>Hola {userData.fname}</h2>
                          <button onClick={hideMenuUser}>
                            <img src={x} className="icon-x"></img>
                          </button>
                        </div>
                        <hr></hr>

                        {/*Opciones del usuario cuando esta logeado */}
                        <a className="sub-menu-link" onClick={userPageRed}>
                          <img
                            src={vistaPerfil}
                            className="ver-perfil-img"
                          ></img>
                          <p>Ver Perfil</p>
                        </a>

                        <a className="sub-menu-link" onClick={SubscribirseRed}>
                          <img
                            src={subscribirse}
                            className="subscribirse-img"
                          ></img>
                          <p>Subscribirse</p>
                        </a>

                        <a href="#" className="sub-menu-link">
                          <img src={cerrrarSesion} className="logout-img"></img>
                          <p onClick={logout}>Cerrar Sesion</p>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {/*Fin del html de la barra de navegacion */}
        <br />

        <div className="moveSect header-inner text-white text-center">
          <div className="container grid">
            <div className="header-inner-left">
              <h1>
                Tu sitio de mayor confianza
                <br /> <span>para agendar</span>
              </h1>
              <p className="lead">
                Los mejores servicios de los mejores medicos para ti.
              </p>
              {/* Nuestros medicos asociados -- associations with medics */}
              <div>
                {isLoggedIn ? (
                  <div>
                    <p className="text-nombre-usuario">
                      Bienvenido,{userData.fname}!
                    </p>
                    <section className="btns-islogged">
                      <button className="enc-especialistas" onClick={DirectorioRed}>
                        Encontrar especialistas
                      </button>
                      <button className="btn-test-dps" onClick={testDepresaoRed}>
                        Test De Depresion
                      </button>
                    </section>
                  </div>
                ) : (
                  <div>
                    <p className="text text-md cuenta-crear">
                      Crea una cuenta o Inicia sesion si es que ya tienes una
                      :).
                    </p>
                    <div className="btn-group">
                      <div className="move-boton-login">
                        {/* Iniciar sesion -- Login */}
                        <a href="/Login" className="btn-Login">
                          Iniciar Sesion
                        </a>

                        {/* Registrarse -- Register */}
                        <a href="/Signup" className="btn-Signup">
                          Registrarse
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="header-inner-right">
              <img src={medicos}></img>
            </div>
          </div>
        </div>
      </header>
      {/* Fin del header -- Encabezado zaaa */}

      <main>
        {/* Seccion Sobre Nosotros en la pagina principal */}
        <div className="Border-About">
          <div className="heading">
            <h1>Sobre Nosotros</h1>
            <p>
              La medicina es algo de lo que sabemos tanto pero aun nos falta
              mucho por descubrir y avanzar.
            </p>
          </div>

          <div className="container-about-home">
            <section className="about-home">
              <div className="about-home-image">
                <img src={LogoPng}></img>
              </div>

              <div className="about-content">
                <h2>Farmacodia</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <a href="/About" className="saberMas">
                  Saber Mas
                </a>
              </div>
            </section>
          </div>
        </div>{" "}
        {/* Fin de la seccion Sobre Nosotros */}
        {/*Inicia Seccion de las consultas a los medicos */}
        <div className="citas-main">
          <h2 className="citas-titulo-principal">Citas En Linea Facilmente!</h2>
          <div className="mover-card-1">
            <img className="paciente-citas" src={paciente}></img>
            <div className="citas-card-1">
              <div className="buscar-medicos-card">
                <h2 className="directorio-card">Directorio Medico</h2>
                <span className="encuentra-1">
                  Encuentra a un especialista a tu eleccion y <br />
                  <span className="encuentra-2">
                    Programa una cita en fisico o en linea.
                  </span>{" "}
                </span>
                {/*Boton para ir al directorio de medicos */}
                <button onClick={DirectorioRed} className="directorio-boton">
                  Encontrar Medicos
                </button>
              </div>
            </div>
            {/*Informacion del directorio de los medicos */}
            <div className="directorio-informacion">
              <span className="info-1">
                Podras acceder a especialistas de tu gusto basandose en los
                criterios de tu busqueda.
              </span>
              <span className="info-2">
                Desde su especialidad, hasta su ciudad de trabajo, <br />
                <span className="info-3">
                  asi como agendar una cita, ya sea en linea o presencialmente
                  :).
                </span>
              </span>
            </div>
            <img className="directorio-img-buscar" src={BuscarDoctor}></img>
          </div>

          {/* Empieza codigo para la 2da tarjeta */}
          <div className="mover-card-2">
            <div className="sintomas-card">
              <h2 className="consultas-card">Consultas Con Sintomas</h2>
              <span className="sintomas-1">
                Con base a los sintomas que tengas <br />
                <span className="sintomas-2">
                  te recomendamos un especialista rapidamente de nuestro
                  catalogo.
                </span>
              </span>
              <br />
              {/* Boton para ir a poner tus sintomas y recetarte. */}
              <button onClick={DirectorioRed} className="sintomas-button">
                Poner Sintomas
              </button>
            </div>
            {/*Codigo html para poner tus sintomas */}
            <div className="sintomas-informacion">
              <span className="info-sintomas-1">
                Podras escribir tus sintomas y en base <br />
              </span>
              <span className="info-sintomas-2">
                a estos nosotros te recomendaremos un especialista <br />
              </span>
              <span className="info-sintomas-3">
                de manera adecuada y rapida.{" "}
              </span>
            </div>
            <img
              className="sintomas-img"
              src="https://media.istockphoto.com/id/1262675992/es/vector/consulta-m%C3%A9dica-en-l%C3%ADnea-apoyo-m%C3%A9dico-en-l%C3%ADnea-servicios-de-salud-m%C3%A9dico-macho-de-familia.jpg?s=170667a&w=0&k=20&c=IV5--EBl2lbxxgDofptfP71-aKNPVGAtfo5yOs_jtCY="
            ></img>
          </div>
        </div>
      </main>

      {/* Boton para llevar al inicio */}
      <a href="#seccion1">
        <button className="btn-regresar">
          <FontAwesomeIcon
            icon={faCircleArrowUp}
            fade
            style={{ color: "#5673e6" }}
            className="regresar-imagen btn-regresar"
          />
        </button>
      </a>
      <br />
      <br />
      <br />
      <br />
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
              <a href="https://depresao.000webhostapp.com" target="_blank" className="a-link-main">
                Test Depresao <br />
              </a>
            </div>
          </div>

          <div className="Other-Links">
            <h2>Otros Sitios</h2>
            <div className="a-otherLinks">
              <a href="/Subscribirse" className="a-link-other">
                Subscribirse
              </a>
              <a href="/userProfile" className="a-link-other">
                Perfil
              </a>
              <a href="#" className="a-link-other">
                Blog
              </a>
              <a href="/Login" className="a-link-other">
                Iniciar Sesion
              </a>
              <a href="/Signup" className="a-link-other">
                Registrarse
              </a>
            </div>
          </div>

          <div className="img-logo2-footer">
            <img src={LogoPng}></img>
          </div>
          {/*Barra derechos de autor footer */}
          <div className="barra-F-footer">
            <p className="text1-derechosAutor">Farmacodia</p>
            <p className="text2-derechosAutor">
              © Derechos Reservados A - Farmacodia{" "}
            </p>
          </div>
        </div>
      </footer>
    </body>
  );
}
