<template>
  <div id="container-usuarios">
    <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="usuarios">
      <div class="formulario">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Búsqueda</span>
          </v-col>
        </v-row>
      </div>
      <div class="load">
        <!--                <span class="title">Solicitud</span> -->
        <v-row>
          <v-col xs="10" sm="10" md="12" cols="12">
            <v-row>
              <v-col xs="10" sm="8" md="10" cols="8">
                <v-text-field  v-model="filter" label="Search" outlined></v-text-field>
              </v-col>
              <v-col xs="2" sm="2" md="2" cols="2">
                <v-btn class="btn-load" color="#f50537" v-on:click="getseach(CampoFilter,filter)">
                  <v-icon>mdi-magnify</v-icon>
                  <div class="d-none d-sm-flex">Buscar</div>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <div class="filter">
            <v-radio-group v-model="CampoFilter" row>
              <v-radio label="Número de empleado" value="nc" true></v-radio>
              <v-radio label="Nombre de empleado" value="nombreUsuario"></v-radio>
            </v-radio-group>
          </div>
        </v-row>
      </div>
      <div class="formulario">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Solicitudes pendientes por atender</span>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table :headers="headers" :items="desserts" item-key="folSol" :items-per-page="3" class="elevation-1">
            <template v-slot:top>
            </template>
            <template v-slot:item.actions="{  }">
              <v-icon small class="mr-2" @click="editItem()"> mdi-pencil</v-icon>
            </template>
          </v-data-table>
        </v-row>
      </div>
      <!--Monto disponible-->
      <div class="formulario" v-show="mostrarSolicitud">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Monto disponible</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Número de empleado"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nombre del empleado"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Fecha de ingreso"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Frecuencia de nómina"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Monto mensual disponible para renta de autos"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Fecha de emisión"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Este cálculo tendrá validez hasta"></v-text-field>
          </v-col>
        </v-row>
      </div>
      <!--Datos del auto-->
      <div class="formulario" v-show="mostrarSolicitud">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Datos del auto</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-select :items="['A1', 'A3',  'Q5']" label="Modelo"></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-select :items="['Nuevo', 'Renovación']" label="Tipo de solicitud"></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field label="Fecha de solicitud"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field label="Preferencia de color (sujeto a disponibilidad)"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field label="Preferencia de color (sujeto a disponibilidad)"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field label="Preferencia de color (sujeto a disponibilidad)"></v-text-field>
          </v-col>
        </v-row>
      </div>
      <!--Datos del empleado-->
      <div class="formulario" v-show="mostrarSolicitud">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Datos del empleado</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Número de empelado*" value="5213" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nombre de empleado*" value="José Pérez Pérez" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Dirección*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nacionalidad*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Edad*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Estado civil*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Celular personal*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Correo personal*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Número de licencia*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Vigencia*"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Tipo de licencia*"></v-text-field>
          </v-col>
        </v-row>
        <!--Datos del empleado Aval 1-->
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12">
            <span class="A1primera">Aval 1</span>
          </v-col>
        </v-row>
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nombre completo del aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Edad Aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Domicilio del aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nacionalidad aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-select :items="['Soltero', 'Casado', 'Divorciado', 'Separado', 'Viudo', 'Concubinato']"
                      label="Estado civil aval"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-checkbox>
              <template v-slot:label>
                <div>
                  Propiedad mancomunada o propiedad adicional
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <!--Datos del empleado Aval 2-->
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12">
            <span class="A1primera">Aval 2</span>
          </v-col>
        </v-row>
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nombre completo del aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Edad aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Domicilio del aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nacionalidad aval"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-select :items="['Soltero', 'Casado', 'Divorciado', 'Separado', 'Viudo', 'Concubinato']"
                      label="Estado civil aval"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-checkbox>
              <template v-slot:label>
                <div>
                  Propiedad mancomunada o propiedad adicional
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
        <!--Usuarios autorizados-->
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12">
            <span class="A1primera">Usuarios autorizados para manejar</span>
          </v-col>
        </v-row>
        <v-row v-show="mostrarSolicitud">
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Nombre"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-select :items="['Padre', 'Madre', 'Hermano', 'Hijo', 'Pareja', 'Cónyuge', 'Suegro(a)', 'Abuelo(a)']"
                      label="Parentesco"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <template>
              <v-card class="mx-auto" max-width="300" tile>
                <v-list flat>
                  <v-subheader>Usuarios autorizados</v-subheader>
                  <v-list-item-group v-model="selectedItem" color="#f50537">
                    <v-list-item v-for="(usrA, i) in usrAut" :key="i">
                      <v-list-item-content>
                        <v-list-item-title v-text="usrA.nombreAut"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title v-text="usrA.parentAut"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon v-text="usrA.icon"></v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </div>
      <!--Documentos-->
      <div class="formulario" v-show="mostrarSolicitud">
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <template>
              <div class="text-left">
                <v-dialog v-model="dialogGuia" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#f50537" dark v-bind="attrs" v-on="on">Guía de documentos</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h7 red accent-4">
                      Guía de documentos a subir
                    </v-card-title>
                    <v-card-text>
                      Formato de solicitud firmado (descargar de Audi mynet)
                    </v-card-text>
                    <v-card-text>
                      Credencial de Audi México
                    </v-card-text>
                    <v-card-text>
                      Licencia de conducir vigente (mexicana)
                    </v-card-text>
                    <v-card-text>
                      Identificación oficial con foto y firma (IFE, pasaporte o FM3)
                    </v-card-text>
                    <v-card-text>
                      Comprobante de domicilio actual (agua, luz, teléfono)
                    </v-card-text>
                    <v-card-text>
                      Solicitud de leasing
                    </v-card-text>
                    <v-card-text>
                      Es necesario proporcionar del aval los siguientes documentos:
                    </v-card-text>
                    <v-card-text>
                      •Identificación oficial con foto y firma (IFE, pasaporte o FM3)
                    </v-card-text>
                    <v-card-text>
                      Comprobante de domicilio actual (agua, luz, teléfono)
                    </v-card-text>
                    <v-card-text>
                      Escrituras de la propiedad que deja en garantía a nombre del aval (liberadas y sin ningún
                      gravamen)
                    </v-card-text>
                    <v-card-text>
                      Boleta de predial actual de la propiedad que deja en garantía a nombre del aval (el pago deberá
                      indicar el valor catastral de la propiedad el cual debe ser igual o mayor al valor comercial del
                      auto a solicitar)
                    </v-card-text>
                    <v-card-text>
                      En caso de haber copropietarios del inmueble en garantía sólo se aceptará si están casados en
                      sociedad conyugal debiendo proporcionar los siguientes documentos adicionales:
                    </v-card-text>
                    <v-card-text>
                      Identificación oficial con foto y firma del copropietario
                    </v-card-text>
                    <v-card-text>
                      Acta de matrimonio
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#f50537" text @click="dialogGuia = false">Cerrar</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </template>
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-btn icon href="https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf" target="_blank">
              Plantilla de solicitud
            </v-btn>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-btn icon href="https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf" target="_blank">
              Reglas de solicitud
            </v-btn>
          </v-col>
        </v-row>
        <div id="colapsable">

          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header>Carga de documentos</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Formato de solicitud firmado</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Credencial de Audi México</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Licencia de conducir vigente</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Identificación oficial con foto y firma</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Comprobante de domicilio actual</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Solicitud de leasing</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <template>
                  <v-divider></v-divider>
                </template>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-card-text>Documentos aval</v-card-text>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Identificación oficial con foto y firma del aval</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Comprobante de domicilio actual del aval</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Escrituras de la propiedad que deja en garantía a nombre del aval</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Boleta de predial actual de la propiedad que deja en garantía a nombre del aval
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <template>
                  <v-divider></v-divider>
                </template>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-card-text>Documentos del copropietario</v-card-text>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Identificación oficial con foto y firma del copropietario</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="5" md="5">
                    <v-card-text>Acta de matrimonio</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-file-input label="Cargar archivo" outlined dense></v-file-input>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-card-text>Nombre del archivo</v-card-text>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-icon color="green">mdi-check-bold</v-icon>
                    <v-icon color="#f50537">mdi-close</v-icon>
                    <v-icon color="#f50537">mdi-delete</v-icon>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <br/>
      <div>
        <v-row>
          <v-col cols="12" sm="2" md="2">
            <v-btn color="#f50537" dark>Cancelar</v-btn>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-btn color="#f50537" dark>Guardar</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationInfo from '../NavigationInfo.vue'

export default {
  components: {NavigationInfo},
  data() {
    return {
      dialogGuia: false,
      selected: [{}],
      mostrarSolicitud: false,
      navigationInfo: [
        {
          text: 'Home',
          disabled: true,
        },
        {
          text: 'Leasing',
          disabled: true,
        },
        {
          text: 'Solicitud',
          disabled: false
        },
      ],
      headers: [
        {
          text: "Folio de la solicitud",
          align: "left",
          sortable: false,
          value: "folSol"
        },
        {text: "Estatus de la solicitud", value: "estSol"},
        {text: "Número de empleado", value: "numEmp"},
        {text: "Nombre del empleado", value: "nomEmp"},
        {text: "Modelo", value: "modelo"},
        {text: "Tipo de solicitud", value: "tipoSol"},
        {text: "Fecha estimada de entrega", value: "fechaEntrega"},
        {text: "Fecha solicitud", value: "fechaSol"},
        {text: 'Ver Solicitud', value: 'actions', sortable: false}
      ],
      desserts: [
        {
          id: 1,
          folSol: "000058",
          estSol: "Solicitud aprobada",
          numEmp: "4532",
          nomEmp: "José Perez Perez",
          modeloT: "A3",
          tipoSol: "Nuevo",
          fechaEntrega: "2021/06/20",
          fechaSol: "2021/06/01"
        },
        {
          id: 2,
          folSol: "000059",
          estSol: "Solicitud aprobada",
          numEmp: "4533",
          nomEmp: "Juan Guerrero Perez",
          modeloT: "A1",
          tipoSol: "Nuevo",
          fechaEntrega: "2021/06/20",
          fechaSol: "2021/06/01"
        },
        {
          id: 3,
          folSol: "000100",
          estSol: "Solicitud aprobada",
          numEmp: "4501",
          nomEmp: "Emilio Sanchez Gutierrez",
          modeloT: "Q3",
          tipoSol: "Nuevo",
          fechaEntrega: "2021/06/20",
          fechaSol: "2021/06/01"
        },
        {
          id: 4,
          folSol: "041236",
          estSol: "Solicitud aprobada",
          numEmp: "7896",
          nomEmp: "Jorge Peña Ortega",
          modeloT: "Q5",
          tipoSol: "Nuevo",
          fechaEntrega: "2021/06/20",
          fechaSol: "2021/06/01"
        },
        {
          id: 5,
          folSol: "874523",
          estSol: "Solicitud aprobada",
          numEmp: "7563",
          nomEmp: "Javier Guerrero Saldivar",
          modeloT: "A3",
          tipoSol: "Nuevo",
          fechaEntrega: "2021/06/20",
          fechaSol: "2021/06/01"
        }
      ],
      usrAut: [
        {nombreAut: 'José Sanchez', parentAut: 'Hermano', icon: 'mdi-delete'},
        {nombreAut: 'Lucrecia Martinez', parentAut: 'Pareja', icon: 'mdi-delete'},
        {nombreAut: 'Juan Sanchez', parentAut: 'Hijo', icon: 'mdi-delete'},
      ]
    }
  },
  methods: {
    toggle(isSelected, select) {
      select(!isSelected)
    },
    closeGuia() {
      this.dialogGuia = false
    },
    editItem() {
      this.mostrarSolicitud = true
    }
  }
}
</script>
