//modulos necesarios para el login.js
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./Login.css";
import axios from "axios";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import menuIcon from "../assets/images/ham-menu-icon.png";
import avatarUsuario from "../assets/images/avatar-de-usuario.png";
import vistaPerfil from "../assets/images/vista.png";
import subscribirse from "../assets/images/subscribirse.svg";
import cerrrarSesion from "../assets/images/logout.svg";
import x from "../assets/images/x.svg";
import { hideBtn, showBtn, hideMenuUser, showMenuUser } from "./HomeFarmacodia";
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import twitter from "../assets/images/twitter-app-symbol.png";
//Modulo necesarios para el funcionamiento de la pagina

export function LoginPage() {
  //Variables del login necesarios en codigo mas adelante
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //Fin de las variables
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
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
      title: 'Quieres Salir?',
      text: "¿Seguro quieres cerrar la sesion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, me equivoque'
      
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setLoggin(false);
        window.location.href = "/";
      } else {
        
      }
    })
    
    
  }; //Fin del codigo de cerar sesion
  
  //Codigo para mandar los datos al BackEnd desde el FrontEnt
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:9002/Login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data, "userRegister");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", false);
        
        if (data.status == "ok") {
          Swal.fire({
            title: 'Inicio Exitoso!',
            text: "¿quieres ir a la pagina de inicio?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, claro',
            cancelButtonText: 'No, gracias'
            
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href='/'
            } else {
              window.location.href = "/Login"
            }
          })
          
           //Cuando se logea te regresa a la pagina principal
        }
      }); //Fin de la funcion para logear un usuario existente
  }
  /* Funcion para mostrar el Menu en modo responsive */
  function showBtn() {
    const navbarShowBtn = document.querySelector(".navbar-show-btn");
    const navbarCollapseDiv = document.querySelector(".navbar-collapse");

    navbarShowBtn.addEventListener("click", function () {
      navbarCollapseDiv.classList.add("navbar-show");
    });
  }

  /* Ocultar menu en modo responsive */
  function hideBtn() {
    const navbarHideBtn = document.querySelector(".navbar-hide-btn");
    const navbarCollapseDiv = document.querySelector(".navbar-collapse");
    navbarHideBtn.addEventListener("click", function () {
      navbarCollapseDiv.classList.remove("navbar-show");
    });
  }

  function registrateRed() {
    window.location.href = "/Signup";
  }

  /*Funcion para mandar al manejo del perfil del ususario */
  function userPageRed(){
    Swal.fire({
      title: 'Iras a tu perfil',
      text: "¿Quieres ir al manejo de tu perfil?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#88ff59',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, me equivoque'
      
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/UserProfile";
      } else {
        
      }
    })
  }
  const SubscribirseRed = () => {
    Swal.fire({
      title: 'Iras a subscribirte',
      text: "¿Quiees ir a ver los tipos de subscripciones?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#88ff59',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, me equivoque'
      
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/Subscribirse";
      } else {
        
      }
    })
  };

  return (
    <body className="body-loginPage">
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
            <div className="navbar-collapse ">
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
      <div className="main-background-lf">
        {isLoggedIn ? (
          <div>
            <p className="logeado-login-text1">Estas logeado con una cuenta actualmente.</p>
            <p className="logeado-login-text2">Cierra sesion en la parte de arriba para poder iniciar cuenta en otra sesion.</p>
          </div>
        ) : (
          <div>
            <div className="main-background-loginForm">
          <div className="auth-wrapper">
            <div className="">
              <form onSubmit={handleSubmit}>
                <h3 className="text-iniciar">Iniciar Sesion</h3>
                <p className="line-inicar-text"></p>
                <div className="move-email-section">
                  <label className="text-email">Correo Electronico:</label>
                  <input
                    type="email"
                    className="input-email"
                    placeholder="Introduce Tu Correo"
                    onChange={(e) => setEmail(e.target.value)} //Codigo para darle el email en la funcion el valor del input
                  />
                </div>

                <div className="move-password-section">
                  <label className="text-password">Contraseña:</label>
                  <input
                    type="password"
                    className="input-password"
                    placeholder="Ingresa Tu Contraseña"
                    onChange={(e) => setPassword(e.target.value)} //Codigo para darle la contraseña en la funcion el valor del input
                  />
                </div>

               

                <div className="mover-section-submit">
                  <button type="submit" className="btn-submit">
                    Iniciar
                  </button>
                </div>
                <p className="line-signup"></p>
                <p className="">
                  <a className="move-section-admin" href="#">
                    Eres Admin?
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <h2 className="registrate-titulo-1">Aun No Tienes Cuenta?</h2>
        <p className="registrate-text-1">
          Puedes registrarte completamente gratis dandole click al boton de
          abajo.
        </p>
        <p className="registrate-text-2">
          Para poder acceder a beneficios tales como subscribirte.
        </p>
        <button className="btn-registrate" onClick={registrateRed}>
          Registrate Gratis
        </button>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
{/*Seccion del footer o pie de pagina, seccion final pue */}
<footer id="footer" className="footer text-center ">
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
            <p className="text2-derechosAutor">© Derechos Reservados A - Farmacodia </p>
          </div>
        </div>
      </footer>
    </body>
  );
}
