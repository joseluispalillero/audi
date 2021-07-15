<template>
  <div id="">
    <!-- ==== Menu ==== -->
    <div class="building">
      <div>
        <div>
          <img
            style="float: left"
            src="./assets/scss/images/logo_audi.png"
            class="imgLogo"
          />
          <a style="float: left" Class="Tiulo">Audi</a>
          <a style="float: left" Class="TiuloFleet">Fleet</a>
        </div>
        <div id="banner">
          <div class="content">
            <img src="./assets/scss/images/loginLogo.png" class="imgLogin" />
            <a>Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </div>
    <div conteiner class="divprincipal">
      <div class="MenuDesktop">
        <ul>
          <li class="dropdown">
            <a href="" class="dropbtn">Masterlist</a>
            <div class="dropdown-content">
              <router-link to="/MasterList/Modificar">Modificar</router-link>
              <router-link to="/MasterList/Traspaso">Traspaso</router-link>
              <router-link to="/MasterList/Prorroga">Prorroga</router-link>
              <router-link to="/MasterList/Baja">Baja</router-link>
              <router-link to="/MasterList/Detalle">Detalle</router-link>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Company car</a>
            <div class="dropdown-content">
              <a href="#">Asignación</a>
               <router-link to="/CompanyCar/MiAutoEmpresa">MiAutoEmpresa</router-link>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Leasing</a>
            <div class="dropdown-content">
              <a href="#">Asignación</a>
               <router-link to="/Leasing/Solicitud">Solicitud</router-link>
              <a href="#">Mi Leasing</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Fleet</a>
            <div class="dropdown-content">
              <a href="#">Multas</a>
              <a href="#">Verificaciones</a>
              <a href="#">Mantenimientos</a>
              <a href="#">Pagos</a>
              <a href="#">Tarjeta de gasolina</a>
              <a href="#">Consumo de gasolina</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Formatos</a>
            <div class="dropdown-content">
              <a href="#">Carga de documentos</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Reportes</a>
            <div class="dropdown-content">
              <a href="#">Flotilla</a>
              <a href="#">Pagos</a>
              <a href="#">Verificaciones</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="" class="dropbtn">Admin</a>
            <div class="dropdown-content">
              <a href="#">Catalogo autos</a>
              <router-link to="/admin/cargadatos">Carga de datos</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- ==== End Menu ==== -->
  </div>
</template>

<style scoped>
#banner {
  width: 50%;
  height: 55px;
  position: relative;
  overflow: visible;
  margin: 0 0 0 auto;
  background: #fff;
}

#banner:before {
  content: "";
  display: block;
  z-index: 1;
  position: absolute;
  top: 0;
  left: -30px;
  background: #f50437;
  transform: skew(-45deg);
  height: 100%;
  width: 30%;
}

#banner .content {
  margin-left: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
  background: transparent;
}

.MenuDesktop {
  position: absolute;
  width: 95%;
  top: 80px;
  opacity: 0.5;
  flex-direction: row;
  display: grid;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 2;
  font-weight: bold;
}

.Tiulo {
  color: white;
  font-size: 20px;
  font-family: "VWText-Regular";
  font-weight: bold;
  padding-left: 10px;
  padding-top: 30px;
  font-family: "AudiType-BoldItalic_4.03";
  /* src: url('./assets/scss/Tipografias/AudiType v4.03 PostScript OpenType/AudiType-BoldItalic_4.03.otf'); */
}

.TiuloFleet {
  color: #f50437;
  font-size: 20px;
  font-family: "VWText-Regular";
  font-weight: bold;
  padding-left: 10px;
  padding-top: 30px;
  font-family: "AudiType-BoldItalic_4.03";
  /* src: url('./assets/scss/Tipografias/AudiType v4.03 PostScript OpenType/AudiType-BoldItalic_4.03.otf'); */
}

.imgLogo {
  width: 120px;
  padding-left: 20px;
  padding-top: 20px;
}

.imgSalir {
  width: 50px;
  padding-top: 730px;
}

.imgLogin {
  width: 20px;
  padding-right: 5px;
}

.zdiv {
  z-index: 3;
  position: absolute;
  width: 95%;
  height: 500px;
  border: 3px solid #0f0f0f;
  margin: 160px 15px;
  background: white;
  opacity: 0.8;
}
.building {
  /* background: url("./assets/scss/images/HomeBackground.jpg"); */
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 100%;
  z-index: 0;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a,
.dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-family: "AudiType-BoldItalic_4.03";
  /* src: url('./assets/scss/Tipografias/AudiType v4.03 PostScript OpenType/AudiType-BoldItalic_4.03.otf'); */
}

li a:hover,
.dropdown:hover .dropbtn {
  background-color: #f50537;
}

li.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #f50537;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

