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
        <!--                <span class="title">Multas</span> -->
        <v-text-field class="search" v-model="filter" label="Search" outlined></v-text-field>
        <v-btn class="btn-load" color="#f50537" v-on:click="getseach()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <div class="filter">
          <v-radio-group v-model="CampoFilter" row>
            <v-radio label="VIN" value="busqVin" true></v-radio>
            <v-radio label="Placa" value="busqPlaca" true></v-radio>
            <v-radio label="Número de empleado" value="busqNc" true></v-radio>
            <v-radio label="Nombre de empleado" value="busqNombre"></v-radio>
          </v-radio-group>
        </div>
      </div>
      <!--Historico de multas-->
      <div class="formulario" v-show="mostrar">
        <v-row>
          <v-col cols="12">
            <span class="solicitud">Histórico de multas</span>
          </v-col>
        </v-row>
        <v-row>
          <v-data-table :headers="headersHistMultas" :items="tablaHistMultas" item-key="vin" :items-per-page="3"
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
      mostrar: false,
      headersHistMultas: [
        {
          text: "VIN",
          align: "left",
          sortable: false,
          value: "vin"
        },
        {text: "Modelo", value: "modelo"},
        {text: "Placas", value: "placas"},
        {text: "Folio infracción", value: "folioInfraccion"},
        {text: "Fecha infracción", value: "fecInfraccion"},
        {text: "Hora infracción", value: "horaInfraccion"},
        {text: "Importe infracción", value: "importeInfraccion"},
        {text: "Estatus de la multa", value: "estatusMulta"},
        {text: "Nombre del empleado", value: "nombreEmpleado"},
        {text: "Usuario de modificación", value: "usuarioModificacion"}
      ],
      tablaHistMultas: [
        {
          id: 1,
          vin: "2654SDFDFGFG2ER5ERRG",
          modelo: "A3",
          placas: "4523DSW",
          folioInfraccion: "541239821",
          fecInfraccion: "2020/07/20",
          horaInfraccion: "15:45",
          importeInfraccion: "756.35",
          estatusMulta: "Pagado",
          numeroEmpleado: "41256",
          nombreEmpleado: "José Pérez Pérez",
          usuarioModificacion: "Rogelio Garza",
        },
        {
          id: 2,
          vin: "2654SDFDFGFG2ER5ERRG",
          modelo: "A1",
          placas: "Q90OJU",
          folioInfraccion: "321239167",
          fecInfraccion: "2021/01/20",
          horaInfraccion: "17:44",
          importeInfraccion: "1,000.00",
          estatusMulta: "Adeudo",
          numeroEmpleado: "12369",
          nombreEmpleado: "Julio Pérez Solano",
          usuarioModificacion: "Rogelio Garza",
        },
        {
          id: 3,
          vin: "2654SDFDFG542ERT5GGG52W",
          modelo: "A1",
          placas: "R58DDO",
          folioInfraccion: "541237459",
          fecInfraccion: "2021/07/05",
          horaInfraccion: "20:30",
          importeInfraccion: "1,547.00",
          estatusMulta: "Adeudo",
          numeroEmpleado: "78632",
          nombreEmpleado: "Aldo Mendez Montes",
          usuarioModificacion: "Rogelio Garza",
        },
        {
          id: 4,
          vin: "ASDSDF565FDGFG234",
          modelo: "Q5",
          placas: "Q69PLN",
          folioInfraccion: "981233620",
          fecInfraccion: "2021/03/15",
          horaInfraccion: "09:00",
          importeInfraccion: "1,526.00",
          estatusMulta: "Pagado",
          numeroEmpleado: "71225",
          nombreEmpleado: "Arturo Estrada Luna",
          usuarioModificacion: "Rogelio Garza",
        },
        {
          id: 5,
          vin: "2654SDFDFGFG2ER458PO",
          modelo: "A3",
          placas: "ERT369",
          folioInfraccion: "541239123",
          fecInfraccion: "2021/02/18",
          horaInfraccion: "21:03",
          importeInfraccion: "756.35",
          estatusMulta: "Pagado",
          numeroEmpleado: "41256",
          nombreEmpleado: "José Pérez Pérez",
          usuarioModificacion: "Rogelio Garza",
        }
      ],
      navigationInfo: [
        {
          text: 'Home',
          disabled: true,
        },
        {
          text: 'Fleet',
          disabled: true,
        },
        {
          text: 'Multas',
          disabled: false
        },
      ]
    }
  },
  methods: {
    getseach() {
      this.mostrar = true
    }
  }
}
</script>
