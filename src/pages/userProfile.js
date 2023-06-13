import React, { Component, useEffect, useState } from "react";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import Swal from "sweetalert2";
import menuIcon from "../assets/images/ham-menu-icon.png";
import avatarUsuario from "../assets/images/avatar-de-usuario.png";
import vistaPerfil from "../assets/images/vista.png";
import subscribirse from "../assets/images/subscribirse.svg";
import cerrrarSesion from "../assets/images/logout.svg";
import x from "../assets/images/x.svg";
import { hideBtn, showBtn, hideMenuUser, showMenuUser } from "./HomeFarmacodia";
import "./userProfile.css";
import axios from "axios";
import usuarioImg from "../assets/images/usuario.png";
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import "tailwindcss/tailwind.css";
import twitter from "../assets/images/twitter-app-symbol.png"; //Modulo necesarios para el funcionamiento de la pagina

export function UserProfilePage() {
  //Variables para distintas funciones (token de login, usuario Admin, etc)
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setLoggin] = useState(false);
  const [userData, setUserData] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false); //Fin variables

  //Codigo para ver si esta logeado o no, en caso de que no se expira el token y se manda un mensaje.
  useEffect(() => {
    fetch("https://farma-app.onrender.com/userData", {
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
      fetch("https://farma-app.onrender.com/userData", {
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


  const subscriptionRed = () =>{
    window.location.href = 'subscribirse'
  }

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

  const [fname, setFname] = useState(userData.fname);
  const [lname, setLname] = useState(userData.lname);
  const [email, setEmail] = useState(userData.email);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fname && !lname && !email) {
      // Mostrar una alerta si no se ha actualizado ningún campo
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor, actualiza al menos un campo antes de guardar los cambios.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      return;
    }

    // Mostrar una alerta personalizada utilizando SweetAlert2
    Swal.fire({
      title: "Actualizar datos",
      text: "¿Estás seguro de que deseas actualizar los datos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#88ff59",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No, me equivoqué",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedData = {};

          if (fname) {
            updatedData.fname = fname;
          }
          if (lname) {
            updatedData.lname = lname;
          }
          if (email) {
            updatedData.email = email;
          }

          // Hacer la solicitud PUT al backend solo con los campos actualizados
          const response = await axios.put(
            `http://localhost:9002/users/${userData._id}`,
            updatedData,
            {
              headers: {
                Authorization: userData._id, // Pasar el ID del usuario logeado en los encabezados
              },
            }
          );

          console.log(response.data); // Datos actualizados del usuario

          // Recargar la página después de la actualización
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const [opcionSeleccionada, setOpcionSeleccionada] =
    useState("ajustesUsuario");

  
  

  const mostrarContenido = () => {
    if (opcionSeleccionada === "ajustesUsuario") {
      return (
        <div>
          <h2 className="titulo-perfilUsuario">Perfil Del Usuario</h2>
          <form onSubmit={handleUpdate}>
            <div className="container-fname">
              <label className="lbl-fname">
                Primer Nombre: <br />
                <input
                  type="text"
                  value={fname}
                  placeholder={userData.fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="inp-fname"
                />
              </label>
            </div>

            <div className="container-lname">
              <label className="lbl-lname">
                Segundo Nombre: <br />
                <input
                  type="text"
                  value={lname}
                  placeholder={userData.lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="inp-lname"
                />
              </label>
            </div>

            <div className="container-email">
              <label className="lbl-email">
                Email: <br />
                <input
                  type="email"
                  value={email}
                  placeholder={userData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="inp-email"
                />
              </label>
            </div>

            <div className="container-btnUserProfile">
              <button type="submit" className="btn-actualizar-userProfile">
                Update
              </button>
            </div>
          </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        </div>

);
    } else if (opcionSeleccionada === "ajustesSuscripcion") {
      return (
        <div>
          <h2 className="text-5xl left-60 ml-60 absolute mt-40 top-60">
            Panel De Subscripción
          </h2>
          <span className="text-subscripcion">
            Recuerda que para que aparezca un plan aqui, tienes que estar
            suscrito a uno.
          </span>

          <div className="bg-blue-500 text-white font-bold w-60 rounded btn-irPlanes transition-all duration-400">
            <button onClick={subscriptionRed}>Ir a los planes</button>
          </div>

          <div className="">
            <div className="card-tipoPlan">
              {userData.subscriptionPlan ? (
                <p className="textTipoPlan-1 bg-blue-500  rounded text-white h-40 text-3xl font-bold">Actualmente usted cuenta con el <span className="textTipoPlan-2">{userData.subscriptionPlan}</span></p>
              ) : (
                <p className="bg-red-500 h-40 rounded textTipoPlan-3 text-white text-3xl font-bold">No cuentas con un plan de subscripcion.</p>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <body className="body-userProfile-page">
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
                        <a href="#" className="sub-menu-link">
                          <img
                            src={vistaPerfil}
                            className="ver-perfil-img"
                          ></img>
                          <p>Ver Perfil</p>
                        </a>

                        <a href="/Subscribirse" className="sub-menu-link">
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

      {isLoggedIn ? (
        <section className="py-5 my-5">
          <div className="container-userProfilePage">
            <div className="menu-lateral-upp">
              <div className="header-cuenta">
                <img src={usuarioImg} className="img-ajustes-cuenta"></img>
                <h2 className="text-ajustes-cuenta-1">Cuenta</h2>
              </div>
              <ul>
                <li
                  onClick={() => setOpcionSeleccionada("ajustesUsuario")}
                  className={
                    opcionSeleccionada === "ajustesUsuario" ? "activo" : ""
                  }
                >
                  <div className="ajustes-usuario">Ajustes De Usuario</div>
                </li>
                <li
                  onClick={() => setOpcionSeleccionada("ajustesSuscripcion")}
                  className={
                    opcionSeleccionada === "ajustesSuscripcion"
                      ? "activo-2"
                      : ""
                  }
                >
                  <div className="ajustes-subscripccion">
                    Ajustes Subscripccion
                  </div>
                </li>
              </ul>
            </div>
            <div className="contenido-principal">{mostrarContenido()}</div>
          </div>
        </section>
      ) : (
        <div>
          <p className="userP-no-logeado1">
            Actualmente no estas logeado en alguna cuenta asi que no tienes
            acceso aqui.
          </p>
          <p className="userP-no-logeado2">
            Por favor inicia sesion en alguna cuenta para poder entrar a este
            apartado.{" "}
          </p>
        </div>
      )}
      
      {/*Seccion del footer o pie de pagina, seccion final pue */}
      <footer id="footer" className="footer text-center relative -top-20 m-0 p-0 footer-userProfile">
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
              <a href="#" className="a-link-other">
                Subscribirse
              </a>
              <a href="#" className="a-link-other">
                Perfil
              </a>
              <a href="#" className="a-link-other">
                Blog
              </a>
              <a href="#" className="a-link-other">
                Iniciar Sesion
              </a>
              <a href="#" className="a-link-other">
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

      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    </body>
  );
}
