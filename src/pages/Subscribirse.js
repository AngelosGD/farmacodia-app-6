import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Axios from "axios";
import Swal from "sweetalert2";
import "./Subscribirse.css";
import LogoPng from "../assets/images/farmacodia-logo-final1.png";
import menuIcon from "../assets/images/ham-menu-icon.png"; 
import avatarUsuario from "../assets/images/avatar-de-usuario.png";
import vistaPerfil from "../assets/images/vista.png";
import subscribirse from "../assets/images/subscribirse.svg";
import cerrrarSesion from "../assets/images/logout.svg";
import x from '../assets/images/x.svg'
import cheque from '../assets/images/cheque.png';
import facebook from "../assets/images/facebook-app-symbol.png";
import instagram from "../assets/images/instagram-app-symbol.png";
import twitter from "../assets/images/twitter-app-symbol.png"; //Moduelo necesarios para que funcione la pagina

const stripePromie = loadStripe(
  "pk_test_51NBf40K9ExXi2sPZYy8GYHLUMpenenPsQ5IAPlYTS7nB5JbFZ6JpUOxmj8OCymM5Ekmwj7FidLq02qPfargQq68t00F4Xmkt3G"
);

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

const TarjetaForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [precio, setPrecio] = useState(50);
  const [plan, setPlan] = useState('No Tienes Plan Aun') // Valor inicial del plan normal


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  
    if (!error) {
      const { id } = paymentMethod;
  
      const { data } = await Axios.post(
        "http://localhost:9002/api/subscribirse",
        {
          id,
          amount: precio,
          plan: plan,
          token: localStorage.getItem("token"), // Envía el token JWT del usuario
        }
      );
  
      console.log(data);
      // Si el pago se realiza correctamente, establecer subscrito en verdadero
      
    
    }
  };

  const handlePlanSelection = (newPrecio, newPlan) => {
    setPrecio(newPrecio);
    setPlan(newPlan);
  };

  return (
    <div>
<form onSubmit={handleSubmit}>
        <h1 className="titulo-escoje-plan-normal">Escoje un <span className="titulo-escoje-plan-normal-2">plan</span></h1>
        <p className="line-escoje-plan"></p>
        {/*Tarjeta del plan normal */}
        <div className="main-background-plan-normal">
          <h2 className="titulo-plan-normal">Plan Normal</h2>
          <p className="precio-plan-normal">$50 Pesos</p>
          <span className="plan-normal-1">Por<span className="plan-normal-2"> mes</span></span>
          <p className="line-plan-normal"></p>
          {/*Seccion beneficios plan normal */}
          <div className="container-be-1">
              <p className="beneficio-1-normal"> <img className="beneficio-1-img" src={cheque}></img>Beneficio 1</p>
          </div>
          <div className="container-be-2">
              <p className="beneficio-2-normal"> <img className="beneficio-2-img" src={cheque}></img>Beneficio 2</p>
          </div>
          <div className="container-be-3">
              <p className="beneficio-3-normal"> <img className="beneficio-3-img" src={cheque}></img>Beneficio 3</p>
          </div>
          
          <br />
          <button className="btn-plan-normal" onClick={() => handlePlanSelection(248, 'Plan Normal')}>
            Empezemos
          </button>
        </div>
        {/*Tarjeta del plan pro */}
        <div className="main-background-plan-pro">
          <h2 className="titulo-plan-pro">Plan Pro</h2>
          <p className="precio-plan-pro">$75 Pesos</p>
          <span className="plan-pro-1">Por <span className="plan-pro-2">mes</span></span>
          <p className="line-plan-pro"></p>
          {/*Seccion beneficios plan pro */}
          <div className="container-be-1-pro">
            <p className="beneficio-1-pro"> <img className="beneficio-1-img-pro" src={cheque}></img>Beneficio 1 Pro</p>
          </div>
  
          <div className="container-be-2-pro">
            <p className="beneficio-2-pro"> <img className="beneficio-2-img-pro" src={cheque}></img>Beneficio 2 Pro</p>
          </div>
  
          <div className="container-be-3-pro">
            <p className="beneficio-3-pro"> <img className="beneficio-3-img-pro" src={cheque}></img>Beneficio 3 Pro</p>
          </div>
  
          <br />
          <button className="btn-plan-pro" onClick={() => handlePlanSelection(425, 'Plan Pro')}>
            Empezemos
          </button>
        </div>
  
        <div className="main-background-plan-avanzado">
          <h2 className="titulo-plan-avanzado">Plan Avanzado</h2>
          <p className="precio-plan-avanzado">$100 Pesos</p>
          <span className="plan-avanzado-1">Por <span className="plan-avanzado-2">mes</span></span>
          <p className="line-plan-avanzado"></p>
          {/*Seccion beneficios plan avanzado */}
          {/*Seccion beneficios plan normal */}
          <div className="container-be-1-avanzado">
              <p className="beneficio-1-avanzado"> <img className="beneficio-1-img-avanzado" src={cheque}></img>Beneficio 1 avanzado</p>
          </div>
          <div className="container-be-2-avanzado">
              <p className="beneficio-2-avanzado"> <img className="beneficio-2-img-avanzado" src={cheque}></img>Beneficio 2 avanzado</p>
          </div>
          <div className="container-be-3-avanzado">
              <p className="beneficio-3-avanzado"> <img className="beneficio-3-img-avanzado" src={cheque}></img>Beneficio 3 avanzado</p>
          </div>
          <br />
          <button
            className="btn-plan-avanzado"
            onClick={() => handlePlanSelection(567, 'Plan Avanzado')}
          >
            Empezemos
          </button>
        </div>
        <h2 className="titulo-pago">Recuerda llenar con tus datos abajo</h2>
        <CardElement className="main-input-pago" />   
  
      <br/>
      <br/>
      <br/>
      </form>
    </div>
  );
};
export function showMenuUser() {
  const userMenuBtn = document.querySelector(".avatar-usuario-img");
  const subMenu = document.querySelector(".sub-menu")

  userMenuBtn.addEventListener("click", function(){
      subMenu.classList.add("class-test")
  })
}
export function hideMenuUser(){
    const hideMenuBtn = document.querySelector(".icon-x")
    const subMenu = document.querySelector(".sub-menu")

    hideMenuBtn.addEventListener("click", function(){
      subMenu.classList.remove("class-test")
      subMenu.style.transition = ".5s ease-out"
    })
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
  

export function Subscribirse() {
  const [isLoggedIn, setLoggin] = useState(false);
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

 //Codigo para ver si esta logeado o no, en caso de que no se expira el token y se manda un mensaje.
 useEffect(() => {
  fetch("https://farmacodia-app6.onrender.com/userData", {
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
    fetch("https://farmacodia-app6.onrender.com/userData", {
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

  //Funciones para que al darle click los botones te manden a las pagines hijos.
  const DirectorioRed = () => {
    window.location.href = "/Directorio";
  };
  const SubscribirseRed = () => {
    window.location.href = "/Subscribirse";
  };
  const registrarseRed = () =>{
    window.location.href = '/Signup'
  }
  const IniciarSesionRed = () =>{
    window.location.href = '/Login'
  }


  return (
    <body>
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
                      <img src={avatarUsuario} className="avatar-usuario-img"></img>
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
                          <img src={vistaPerfil} className="ver-perfil-img"></img>
                          <p>Ver Perfil</p>
                        </a>

                        <a className="sub-menu-link" onClick={SubscribirseRed}>
                          <img src={subscribirse} className="subscribirse-img"></img>
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/*Fin del html de la barra de navegacion */}

      <Elements stripe={stripePromie}>
        {isLoggedIn ? (
          <div className="container-subs-elements">
          {/*Seccion de texto de las subscripcciones */}
          <div className="container-text-subs">
            <span className="text-sub-1">
              Mira los planes que te
              <span className="text-sub-2">ofrecemos en farmacodia.</span>
            </span>
            <h3 className="titulo-sub-1">Selecciona tu plan Farmaco plan.</h3>
            <br />
            <p className="text-sub-3">
              
              Tenemos 3 tipos de planes para ti, cada uno mejor que el anterior.
            </p>
            <p className="text-sub-4">
              Escoje el plan que mayor crees que te convenga, mientras mejor{" "}
              <br />
              sea el precio del plan o mejor nivel sea, mayores beneficios y
              mejoras <br />
              tendras en la pagina.
            </p>
            {/* Botones para desplegar info de los planes avanzados */}
            <div className="container-info-plan-pro">
              <div className="container">
                <div class="tab">
                  <input type="radio" name="abrir" id="acc2" />
                  <label for="acc2">
                    <h2>02</h2>
                    <h3>Mas Sobre Plan Pro</h3>
                  </label>
                  <div class="content">
                    <p>
                      Este es el plan intermedio de la pagina, beneficios del plan normal y algunos extra, 
                    </p>
                  </div>
                </div>
                {/* 2da info-plan avanzado */}
                <div className="container-info-plan-avanzado">
                  <div class="tab">
                    <input type="radio" name="abrir" id="acc3" />
                    <label for="acc3">
                      <h2>03</h2>
                      <h3>Mas Sobre Plan Avanzado</h3>
                    </label>
                    <div class="content">
                      <p>
                        Este es el mejor plan que te podemos ofrecer, con los mejores beneficios y opciones para ti, con todos los beneficios y mejoras para ti a tu alcanze
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-pNormal">
              {userData.subscriptionPlan ? (
                  <h2>Actualmente ya cuentas con un plan de subscripcion en esta cuenta.</h2>
                ) : (
                  <div>
                  <TarjetaForm/>
                </div>
              )}
          </div>
          
        </div>
        ) : (
          <div>
            <p className="text-subscribirte-nl-1">Actualmente no estas logeado en alguna cuenta,y y para poder subscribirte tienes que estar logeado con una cuenta.</p>
            <p className="text-subscribirte-nl-2">Inicia sesion  para poder acceder a alguno de nuestros planes y tener beneficios extras.</p>

            <div className="container-btn-subscribirse-nl">
              <button onClick={registrarseRed} className="btn-subscribirse-nl-1">Registrarse</button>
              <button onClick={IniciarSesionRed} className="btn-subscribirse-nl-2">Iniciar Sesion</button>
            </div>
          </div>
        )}
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
      </Elements>
    </body>
  );
}
