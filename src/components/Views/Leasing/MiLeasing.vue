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
        <!--                <span class="title">Mi Leasing</span> -->
        <v-row>
          <v-col cols="9" sm="9" md="9">
            <v-text-field class="search" v-model="filter" label="Search" outlined></v-text-field>
          </v-col>
          <v-col cols="2" sm="2" md="2">
            <v-btn class="btn-load" color="#f50537" v-on:click="getseach(CampoFilter,filter)">
              <v-icon>mdi-magnify</v-icon>
              <div class="d-none d-sm-flex d-lg-none">Buscar</div>
            </v-btn>
          </v-col>
        </v-row>
        <div class="filter">
          <v-radio-group v-model="CampoFilter" row>
            <v-radio label="Número de empleado" value="nc" true></v-radio>
            <v-radio label="Nombre de empleado" value="nombreUsuario"></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div class="formulario">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Asignación Actual</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="VIN" value="WER34FDFFD45GV21E" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Descripción del modelo" value="A3 estandar equipado" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="MY" value="2020" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Placas" value="L23QWA" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Número de contrato" value="A00475" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Fecha inicio de contrato leasing" value="2020/07/14" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Fecha fin de contrato leasing" value="2021/0/14" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Póliza" value="52410" disabled></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field label="Color" value="Rojo" disabled></v-text-field>
          </v-col>
        </v-row>
      </div>
      <!--Historico de asignaciones-->
      <div class="formulario">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Historial de asignaciones</span>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table :headers="headersHisAuto" :items="tablaHistAutos" item-key="modVin" :items-per-page="3"
                        class="elevation-1">
            <template v-slot:top>
            </template>
          </v-data-table>
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
          text: 'Mi leasing',
          disabled: false
        },
      ],
      headersHisAuto: [
        {
          text: "VIN",
          align: "left",
          sortable: false,
          value: "modVin"
        },
        {text: "Descripción del modelo", value: "descAuto"},
        {text: "MY", value: "MyAuto"},
        {text: "Placas", value: "placasAuto"},
        {text: "Número de contrato", value: "contratoAuto"},
        {text: "Fecha inicio de contrato leasing", value: "fecIniCAuto"},
        {text: "Fecha fin de contrato leasing", value: "fecFinCAuto"},
        {text: "Póliza", value: "polizaAuto"},
        {text: "Color", value: "colorAuto"}
      ],
      tablaHistAutos: [
        {
          id: 1,
          modVin: "QA55665256HJJL7H",
          descAuto: "A3 estandar equipado",
          MyAuto: "2019",
          placasAuto: "4523DSW",
          contratoAuto: "A000521",
          fecIniCAuto: "2020/10/20",
          fecFinCAuto: "2021/10/20",
          polizaAuto: "57896321",
          colorAuto: "Negro"
        },
        {
          id: 2,
          modVin: "QA5561228HTESDF",
          descAuto: "Q5 estandar",
          MyAuto: "2021",
          placasAuto: "R87NKP",
          contratoAuto: "B000021",
          fecIniCAuto: "2020/09/20",
          fecFinCAuto: "2021/09/20",
          polizaAuto: "57896001",
          colorAuto: "Gris"
        },
        {
          id: 3,
          modVin: "QA55665256H134GTB",
          descAuto: "A1 equipado",
          MyAuto: "2021",
          placasAuto: "X233FTY",
          contratoAuto: "A004751",
          fecIniCAuto: "2020/10/20",
          fecFinCAuto: "2021/10/20",
          polizaAuto: "57896321",
          colorAuto: "Rojo"
        },
        {
          id: 4,
          modVin: "QA55665256QWO49F",
          descAuto: "Q3 Advance",
          MyAuto: "2021",
          placasAuto: "P49KRT",
          contratoAuto: "C142537",
          fecIniCAuto: "2020/10/20",
          fecFinCAuto: "2021/10/20",
          polizaAuto: "57896323",
          colorAuto: "Blanco"
        },
        {
          id: 5,
          modVin: "QA55665256HJQ135F",
          descAuto: "A2",
          MyAuto: "2019",
          placasAuto: "A45ASD",
          contratoAuto: "A000006",
          fecIniCAuto: "2020/10/20",
          fecFinCAuto: "2021/10/20",
          polizaAuto: "57896321",
          colorAuto: "Azul"
        }
      ]
    }
  },
  methods: {}
}
</script>
