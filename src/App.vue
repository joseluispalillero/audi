<template>
  <div>
    <div class="">
      <div>
      </div>
    </div>
    <v-app>
      <div>
        <v-toolbar tile style="background: white; opacity: 0.9;">
          <div>
            <img style="float: left" src="./assets/scss/images/logo_audi.svg" class="imgLogo"/>
          </div>
          <div style="padding-top: 10px;">
            <span class="red--text txtencabezado">Audi</span>
            <span class="black--text txtencabezado">Fleet</span>
          </div>
          <div style="padding-left: 50px;">
            <v-toolbar-items style="height: 25px;">
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Masterlist
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Masterlist" :key="index" router :to="item.link"
                               class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Company Car
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Company" :key="index" router :to="item.link"
                               class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Leasing
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Leasing" :key="index" router :to="item.link"
                               class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Fleet
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Fleet" :key="index" router :to="item.link" class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Formatos
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Formatos" :key="index" router :to="item.link"
                               class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Reportes
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Reportes" :key="index" router :to="item.link"
                               class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-menu :rounded="rounded" open-on-hover offset-y transition="slide-x-transition" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn flat v-bind="attrs" v-on="on" style="color: white; font-size: 14px; background: #f50437;"
                         class="textmenu"> Admin
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item v-for="(item, index) in Admin" :key="index" router :to="item.link" class="vmenu txtbody">
                    <v-list-item-action>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
              <!-- <v-btn to="/about" flat> About Us </v-btn> -->
            </v-toolbar-items>
          </div>
          <!-- <v-spacer></v-spacer> -->
          <div style="width: 100%">
            <v-toolbar-items class="hidden-sm-and-down">
              <div id="banner">
                <div class="content">
                  <img src="./assets/scss/images/loginLogo.png" class="imgLogin"/>
                  <span class="txtbody">Freddy Amaury Osorio Jiménez</span>
                </div>
              </div>
            </v-toolbar-items>
          </div>
        </v-toolbar>
      </div>
      <div class="body__content txtbody">
        <router-view/>
      </div>
      <div style="width: 100%">
        <MessageArea/>
      </div>
    </v-app>
  </div>
</template>

<script>
import MessageArea from './components/MessageArea.vue'

export default {
  components: {MessageArea},
  data: () => ({
    activate: true,
    theme: 1,
    themes: [{
      text: "Dark",
      icon: "mdi-clock"
    },
      {
        text: "Light",
        icon: "mdi-account"
      }
    ],
    mini: true,
    Masterlist: [
      {
        title: "Modificar",
        link: "/Masterlist/Modificar"
      },
      {
        title: "Traspaso",
        link: "/Masterlist/Traspaso"
      },
      {
        title: "Prorroga",
        link: "/Masterlist/Prorroga"
      },
      {
        title: "Baja",
        link: "/Masterlist/Baja"
      },
      {
        title: "Detalle",
        link: "/Masterlist/Detalle"
      }
    ],
    Company: [{
      title: "Asignación",
      link: "/CompanyCar/Asignacion"
    },
      {
        title: "Solicitud",
        link: "/CompanyCar/Solicitud"
      },
      {
        title: "Mi auto de empresa",
        link: "/CompanyCar/MiAutoEmpresa"
      }
    ],
    Leasing: [{
      title: "Asignacion",
      link: "/Leasing/Asignacion"
    },
      {
        title: "Solicitud",
        link: "/Leasing/Solicitud"
      },
      {
        title: "Mi Leasing",
        link: "/Leasing/MiLeasing"
      }
    ],
    Fleet: [{
      title: "Multas",
      link: "/Fleet/Multas"
    },
      {
        title: "Verificaciones",
        link: "/Fleet/Verificaciones"
      },
      {
        title: "Mantenimientos",
        link: "/Fleet/Mantenimientos"
      },
      {
        title: "Pagos",
        link: "/Fleet/Pagos"
      },
      {
        title: "Tarjeta de gasolina",
        link: "/Fleet/TarjetaGasolina"
      },
      {
        title: "Consumo de gasolina",
        link: "/Fleet/ConsumoGasolina"
      }
    ],
    Formatos: [{
      title: "Formatos",
      link: "/Formatos/Formatos"
    }
    ],
    Reportes: [{
      title: "Flotilla",
      link: "/Reportes/Flotilla"
    },
      {
        title: "Pagos",
        link: "/Reportes/Pagos"
      },
      {
        title: "Verificaciones",
        link: "/Reportes/Verificaciones"
      },
      {
        title: "Multas",
        link: "/Reportes/Multas"
      },
      {
        title: "Gasolina",
        link: "/Reportes/Gasolina"
      },
    ],
    Admin: [{
      title: "Carga datos",
      link: "/Admin/cargadatos"
    },
      {
        title: "Catalogo sistemas",
        link: "/Admin/CatalogoSistema"
      },
      {
        title: "Usuarios",
        link: "/Admin/Usuarios"
      },
      {
        title: "Perfiles",
        link: "/Admin/Perfiles"
      }
    ]
  })
};
</script>
