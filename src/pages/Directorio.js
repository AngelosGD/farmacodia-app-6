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
import axios from "axios";
import doctor1Irapuato from "../assets/images/doctor-irapuato1.png";
import medalla from "../assets/images/medal.png";
import smartphone from "../assets/images/smartphone.png";
import ubicacion from "../assets/images/ubi.png";
import doctor2Irapuato from "../assets/images/doctor-irapuato2.png";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import doctor1Neumologia from "../assets/images/doctor1-neumologia-irapuato.png";
import { data } from "jquery";
import Swal from "sweetalert2";
/* mostrar el menu en responsive */

const localizer = momentLocalizer(moment);

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
  const [sintomas, setSintomas] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [select1, setSelect1] = useState("");
  const [select2, setSelect2] = useState("");
  const [select3, setSelect3] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const [showContent4, setShowContent4] = useState(false);

  // Define la disponibilidad de los médicos
  const availability = {
    // Define la disponibilidad para cada médico
    neurologiaIrapuato: {
      // Define los horarios disponibles
      monday: ["09:00", "10:00", "11:00"],
      tuesday: ["10:00", "11:00", "12:00"],
      // ...
    },
    medGeneralIrapuato: {
      monday: ["14:00", "15:00", "16:00"],
      tuesday: ["15:00", "16:00", "17:00"],
      // ...
    },
  };

  const handleSelect1Change = (event) => {
    setSelect1(event.target.value);
  };

  const handleSelect2Change = (event) => {
    setSelect2(event.target.value);
  };

  const handleSelect3Change = (event) => {
    setSelect3(event.target.value);
  };

  const handleShowButtonClick = () => {
    const isCorrectSelection =
      select1 === "linea" && select2 === "Neurologia" && select3 === "irapuato";
    setShowContent(isCorrectSelection);

    const isCorrectSelection2 =
      (select1 === "linea" || select1 === "presencial") &&
      select2 === "General" &&
      select3 === "irapuato";
    setShowContent2(isCorrectSelection2);

    const isCorrectSelection3 =
      (select1 === "presencial" || select1 === "linea") &&
      select2 === "Interna" &&
      select3 === "irapuato";
    setShowContent3(isCorrectSelection3);

    const isCorrectSelection4 =
      (select1 === "presencial" || select1 === "linea") &&
      select2 === "Neumologia" &&
      select3 === "irapuato";
    setShowContent4(isCorrectSelection4);
  };

  const buscarEspecialidad = async () => {
    console.log("Función buscarEspecialidad ejecutada");
    try {
      const sintomasLimpios = sintomas
        .split("\n")
        .map((sintoma) => sintoma.trim())
        .filter((sintoma) => sintoma !== "");

      const response = await fetch(
        "http://localhost:9002/buscar-especialidad",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sintomas: sintomasLimpios }),
        }
      );

      const data = await response.json();
      setEspecialidades(data.especialidades);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSlotSelect = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setShowForm(true); // Mostramos el formulario al seleccionar un slot
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarías el formulario de cita al backend
  };

  const events = [
    {
      title: "Cita 1",
      start: new Date(2023, 11, 1, 12, 0), // Ejemplo de hora: 1 de diciembre de 2023, 12:00 PM
      end: new Date(2023, 11, 1, 13, 0), // Ejemplo de hora: 1 de diciembre de 2023, 1:00 PM
    },
    {
      title: "Cita 2",
      start: new Date(2023, 11, 1, 14, 0), // Ejemplo de hora: 1 de diciembre de 2023, 2:00 PM
      end: new Date(2023, 11, 1, 15, 0), // Ejemplo de hora: 1 de diciembre de 2023, 3:00 PM
    },
    // Agrega más eventos aquí
  ];

  const omarGRed = () => {
    window.open("https://www.facebook.com/medicoreumatologoirapuato/");
  };
  const enriqueJRed = () => {
    window.open("https://www.facebook.com/neumologopediatraenirapuato/");
  };


  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    sexo: '',
    correo: '',
    telefono: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      title: 'Haras una cita',
      text: '¿Seguro que quieres reservar una cita?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#88ff59',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No, me equivoqué',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:9002/api/formdata', formData)
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'La cita ha sido agendada correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
            setFormData({
              nombre: '',
              apellidoPaterno: '',
              apellidoMaterno: '',
              fechaNacimiento: '',
              sexo: '',
              correo: '',
              telefono: '',
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un error al agendar la cita. Por favor, intenta nuevamente.',
            });
          });
      }
    });
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

                <select
                  className="tipo-cita"
                  value={select1}
                  onChange={handleSelect1Change}
                >
                  <option value="presencial">Cita Presencial</option>
                  <option value="linea">Cita En Linea</option>
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
                  value={select2}
                  onChange={handleSelect2Change}
                >
                  <option disabled selected>
                    Estoy Buscando....
                  </option>
                  <option value="General"> Medicina General</option>
                  <option value="Neurologia"> Neurologia</option>
                  <option value="Interna"> Medicina Interna</option>
                  <option value="Neumologia"> Neumología</option>
                </select>
              </div>
              {/*3ra opcion */}
              <div className="buscar-3-opcion">
                <span className="ciudad-medico">Ciudad</span>
                <br />
                <select
                  className="elegir-ciudad"
                  value={select3}
                  onChange={handleSelect3Change}
                >
                  <option value="abasolo">Abasolo</option>
                  <option value="irapuato">Irapuato</option>
                </select>
              </div>
              {/*Boton para buscar al especialista */}
              <div className="boton-especialista">
                <button className="btn-medico" onClick={handleShowButtonClick}>
                  Buscar
                </button>
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
            <br />
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
        <br />
        <br />
        {/*Medico de prueba 1 */}
        {showContent && (
          <div className="neurologia-irapuato">
            <div className="doctor-1">
              <img src={doctor1Irapuato}></img>

              <div className="contenido-doctor-1">
                <div className="text-doctor-1">
                  <h1>
                    Dr. Gessen Salmerón Gómez <img src={medalla}></img>{" "}
                  </h1>
                </div>

                <span className="text1-doctor-1">
                  Especialidad: Neurología Pediátrica Cédula: 8070756
                </span>

                <button className="btn-doctor-1">
                  <img src={smartphone}></img>
                  <span>4623320436</span>
                </button>
              </div>
            </div>
            <div className="contenido2-doctor-1">
              <span className="text-consultorio">Consultorio</span>

              <div className="cin-doctor-1">
                <img src={ubicacion}></img>
                <span>CIN</span>
              </div>
              <span className="text3-doctor-1">
                PASEO DE LAS FRESAS 74 COL JARDINES DE IRAPUATO , FRENTE AL
                ESTADIO "SERGIO LEÓN CHÁVEZ "
              </span>
            </div>
          </div>
        )}

        {showContent2 && (
          <div className="MedGeneral-irapuato">
            <div className="doctor-2">
              <img src={doctor2Irapuato}></img>

              <div className="contenido-doctor-2">
                <div className="text-doctor-2">
                  <h2>
                    Dr. Omar Guerrero Soto <img src={medalla}></img>{" "}
                  </h2>
                </div>

                <span className="text2-doctor-2">
                  Especialidad: Medicina Interna Cédula: 8129473 | <br />{" "}
                  Especialidad: Reumatología Cédula: 8630448
                </span>

                <div className="btns-doctor-2">
                  <button className="btn-paginaweb-doctor2">Página web</button>

                  <button className="btn2-paginaweb-doctor2">
                    <img src={smartphone}></img>+524623213575
                  </button>
                </div>
              </div>
            </div>

            <div>
              <br />
              <br />
              <br />
              <div className="calendar-container">
                {" "}
                {/* Aplica los estilos al contenedor */}
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSlotSelect}
                />
                {showForm && (
                  <form className="calendar-form" onSubmit={handleSubmit}>
                  <div className="form-citasDirectorio-medGeneral">
                    <span className="datosPaciente-medGen">Datos del paciente</span>
            
                    <span className="nombrePaciente-medGen">Nombre(s)</span>
                    <input
                      className="inpPaciente-medGen"
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
            
                    {/* Otros campos del formulario */}
                    <span className="apellidoPaciente-medGen">Apellido Paterno</span>
                    <input
                      className="inpApellido-medGen"
                      type="text"
                      name="apellidoPaterno"
                      value={formData.apellidoPaterno}
                      onChange={handleInputChange}
                    />
            
                    <span className="apellidoMPaciente-medGen">Apellido materno</span>
                    <input
                      className="inpApellidoM-medGen"
                      type="text"
                      name="apellidoMaterno"
                      value={formData.apellidoMaterno}
                      onChange={handleInputChange}
                    />
            
                    <span className="fechaN-medGen">Fecha de nacimiento</span>
                    <input
                      className="inpFechaN-medGen"
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                    />
            
                    <span className="sexo-medGen">Sexo</span>
                    <select className="slcSexo-medGen" name="sexo" value={formData.sexo} onChange={handleInputChange}>
                      <option disabled selected>
                        Escoge
                      </option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
            
                    <span className="correo-medGen">Correo electrónico</span>
                    <input
                      className="inpCorreo-medGen"
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                    />
            
                    <span className="telefono-medGen">Teléfono celular</span>
                    <input
                      className="inpTelefono-medGen"
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
            
                    {/* ...otros campos del formulario */}
                    <button type="submit" className="btn-agendarCita-medGen">
                      Agendar Cita
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          </div>
        )}

        {showContent3 && (
          <div className="MedGeneral-irapuato">
            <div className="doctor-2">
              <img src={doctor2Irapuato}></img>

              <div className="contenido-doctor-2">
                <div className="text-doctor-2">
                  <h2>
                    Dr. Omar Guerrero Soto <img src={medalla}></img>{" "}
                  </h2>
                </div>

                <span className="text2-doctor-2">
                  Especialidad: Medicina Interna Cédula: 8129473 | <br />{" "}
                  Especialidad: Reumatología Cédula: 8630448
                </span>

                <div className="btns-doctor-2">
                  <button className="btn-paginaweb-doctor2" onClick={omarGRed}>
                    Página web
                  </button>

                  <button className="btn2-paginaweb-doctor2">
                    <img src={smartphone}></img>+524623213575
                  </button>
                </div>
              </div>
            </div>

            <div>
              <br />
              <br />
              <br />
              <div className="calendar-container">
                {" "}
                {/* Aplica los estilos al contenedor */}
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  onSelectSlot={handleSlotSelect}
                />
                {showForm && (
                  <form className="calendar-form" onSubmit={handleFormSubmit}>
                    {" "}
                    {/* Aplica los estilos al formulario */}
                    <div className="form-citasDirectorio-medGeneral">
                      <span className="datosPaciente-medGen">
                        Datos del paciente
                      </span>

                      <span className="nombrePaciente-medGen">Nombre(s)</span>
                      <input
                        type="text"
                        required={true}
                        className="inpPaciente-medGen"
                      ></input>
                      <span className="apellidoPaciente-medGen">
                        Apellido Paterno
                      </span>
                      <input
                        type="text"
                        required={true}
                        className="inpApellido-medGen"
                      ></input>
                      <span className="apellidoMPaciente-medGen">
                        Apellido materno
                      </span>
                      <input
                        type="text"
                        required={true}
                        className="inpApellidoM-medGen"
                      ></input>
                      <span className="fechaN-medGen">Fecha de nacimiento</span>
                      <input
                        type="date"
                        required={true}
                        className="inpFechaN-medGen"
                        placeholder="dd/mm/yy"
                      ></input>
                      <span className="sexo-medGen">Sexo</span>

                      <select className="slcSexo-medGen">
                        <option disabled selected>
                          Escoje
                        </option>
                        <option value="Femenino">Femenino</option>
                        <option value="Mascuino">Mascuino</option>
                      </select>

                      <span className="correo-medGen">Correo electronico</span>
                      <input
                        type="email"
                        required={true}
                        className="inpCorreo-medGen"
                      ></input>

                      <span className="telefono-medGen">Telefono celular</span>
                      <input
                        type="email"
                        required={true}
                        className="inpTelefono-medGen"
                      ></input>

                      <h4 className="agendar-cita-medGen">
                        Agendar cita para:
                      </h4>
                      <p className="fecha-medGen">
                        Fecha: {selectedSlot.start.toLocaleString()}
                      </p>
                      {/* ...otros campos del formulario */}
                      <button type="submit" className="btn-agendarCita-medGen">
                        Agendar Cita
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {showContent4 && (
          <div className="neumologo-irapuato">
            <div className="doctor1-neumologia-irapuato">
              <img src={doctor1Neumologia}></img>

              <div className="contenido-doctor1-neumologia">
                <div className="text-doctor1-neumologia">
                  <h2>
                    Dr. Enrique Jesús López Jara Zárate{" "}
                    <img src={medalla}></img>
                  </h2>
                </div>
              </div>

              <span className="text1-doctor1-neumologia">
                Especialidad: Neumología Pediátrica Cédula: 10481150 | <br />
                Especialidad: Pediatría Cédula: 10128227
              </span>

              <span className="text2-doctor1-neumologia">Primera consulta $700</span>

              <div className="btns-doctor-neumologia">
                  <button className="btn-paginaweb-doctorNeumologia" onClick={enriqueJRed}>Página web</button>

                  <button className="btn2-paginaweb-doctorNeumologia">
                    <img src={smartphone}></img>+524623213575
                  </button>
                </div>
            </div>
            <div className="contenido2-doctor1-neumologia">
              <span className="text-consultorio">Consultorio</span>

              <div className="cin-doctor-1">
                <img src={ubicacion}></img>
                <span>HOSPITALES MAC IRAPUATO</span>
              </div>
              <span className="text3-doctor-1">
              Dr Javier Castellanos Coutiño 516, San Pedro, 36520 Irapuato, Guanajuato.
              </span>

              <span className="text4-doctor1-neumologia">Este doctor aun no realiza citas en linea :(.</span>
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
                <a
                  href="https://depresao.000webhostapp.com"
                  target="_blank"
                  className="a-link-main"
                >
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
      </main>
    </body>
  );
}
