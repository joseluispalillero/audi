<template>
  <v-app>    
    <nav>   
      <v-toolbar>   
        <!--v-btn color="red" dark @click="drawer =! drawer" class="d-sm-none"> Menú </v-btn-->  
        <v-app-bar-nav-icon color="deep-gray darken-3" app @click="drawer=!drawer"></v-app-bar-nav-icon>
          <div class="logoUser">
            <img style="float: left" src="./assets/scss/images/logo_audi.svg" class="imgLogo"/>
          </div>   
          <v-toolbar-title>
            <div style="padding-top: 10px;">
                <span class="red--text txtencabezado">Audi</span>
                <span class="black--text txtencabezado">Fleet</span>
              </div>
          </v-toolbar-title>       
      </v-toolbar> 
    </nav>
    
      <v-navigation-drawer app v-model="drawer"
        
        expand-on-hover
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Freddy Amaury Osorio Jiménez
              </v-list-item-title>
              <v-list-item-subtitle>fredy@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          router :to="child.link"
        >
          <v-list-item-content>             
            <v-list-item-title v-text="child.title"></v-list-item-title>             
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
      </v-navigation-drawer>    
      <div class="zdiv txtbody contentView" style=" width:100%; height:100%; overflow: scroll;">
        <router-view />
      </div>
      <div style="width: 100%">
        <div>          
          <div id="bannerfooter">
            <div class="content" >              
              <span class="white--text textmenu">"Area de mensajes"</span>
            </div>
          </div>
        </div>
      </div>
  </v-app>
</template>
<script>
export default {
    data: () => ({
        activate: true,
        mobilWidth: 1024,
        sizeWindow: '',
        drawer:false,
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
        items: [
        {
          action: 'mdi-label',
          items: [{
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
                }],
          title: 'MasterList',
        },
        {
          action: 'mdi-home-city',
          active: true,
          items: [
                  {
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
          title: 'Company',
        },
        {
          action: 'mdi-wrench',
          items: [
                    {
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
          title: 'Leasing',
        },
        {
          action: 'mdi-gavel',
          items: [            
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
          title: 'Multas',
        },
        {
          action: 'mdi-tag',
          items: [
                    {
                      title: "Formatos",
                      link: "/Formatos/Formatos"
                    }
                  ],
          title: 'Formatos',
        },
        {
          action: 'mdi-folder',
          items: [
                    {
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
          title: 'Reportes',
        },
        {
          action: 'mdi-account',
          items: [
                    {
                      title: "Carga datos",
                      link: "/Admin/cargadatos"
                    },
                    {
                      title: "Pagos",
                      link: "/Admin/CatalogoSistema"
                    },
                    {
                      title: "Verificaciones",
                      link: "/Admin/Usuarios"
                    },
                    {
                      title: "Multas",
                      link: "/Admin/Perfiles"
                    },                   
          ],
          title: 'Admin',
        },
      ]

    }),

    
    
};
</script>

