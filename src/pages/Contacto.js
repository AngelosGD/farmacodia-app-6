import React, { Component, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import menuIcon from "../assets/images/ham-menu-icon.png";
import avatarUsuario from "../assets/images/avatar-de-usuario.png";
import vistaPerfil from "../assets/images/vista.png";
import telefono from "../assets/images/telefono.png";
import gmail from "../assets/images/correo.png";
import facebook from "../assets/images/twitter.png";
import twitter from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import ubicacion from "../assets/images/ubicacion.png";
import subscribirse from "../assets/images/subscribirse.svg";
import cerrrarSesion from "../assets/images/logout.svg";
import x from "../assets/images/x.svg";
import Swal from "sweetalert2";
import "./contacto.css"; //Modulos para el funcionamiento de la pagina

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

export function Contacto() {
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

  const [firstName, setFirstName] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9002/enviar-mensaje", {
        nombre,
        correo,
        mensaje,
      });
      setEnviado(true);
    } catch (error) {
      console.log(error);
    }
  };

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
      </header>
      <div>
        {enviado ? (
          <h3>¡Mensaje enviado!</h3>
        ) : (
          <section className="section-contacto">
            <div className="container-contacto">
              <div className="contactInfo">
                {/*Informacion de la tarjeta de contacto (tarjeta azul) */}
                <div>
                  <h2>Informacion De Contacto</h2>
                  <ul className="info-contacto">
                    <li className="ubicacion">
                      <span>
                        <img src={ubicacion}></img>
                      </span>
                      <span>
                        Cbtis 171, Juarez <br />
                        Abasolo, Gto <br />
                        36970
                      </span>
                    </li>

                    <li className="gmail">
                      <span>
                        <img src={gmail}></img>
                      </span>
                      <span>angelde9919@gmail.com</span>
                    </li>

                    <li className="tel">
                      <span>
                        <img src={telefono}></img>
                      </span>
                      <span>462-116-9534</span>
                    </li>
                  </ul>
                </div>
                {/*Lista de redes sociales en la tarjeta de la informacion del contacto */}
                <ul className="sci-contact">
                  <li>
                    <a href="#">
                      <img src={facebook}></img>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={twitter}></img>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={instagram}></img>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="contactForm">
                <h2 className="titulo-1-contacto">Mandanos Un Mensaje.</h2>
                <div className="formBox">
                  <form onSubmit={handleSubmit}>
                    <div className="inputBox-nombre">
                      <input
                        placeholder="Nombre Completo"
                        id="inp-nombre"
                        className="inp-nombre-contacto"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      <br />
                    </div>

                    <div className="inputBox-correo">
                      <input
                        placeholder="Correo"
                        id="inp-correo"
                        className="inp-correo-contacto"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                      <br />
                    </div>

                    <div className="inputBox-mensaje">
                      <textarea
                        placeholder="Escribe Tu Mensaje Aqui"
                        className="inp-mensaje-contacto"
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                      />
                      <br />
                    </div>

                    <div className="inputBox-btn-enviar">
                      <button
                        type="submit"
                        className="btn-enviarFormulario-contacto"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          
        )}
      </div>
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
  );
}
