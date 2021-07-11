<template>
  <div id="masterlist-detalle">
    <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div>
      <v-data-table :headers="headers" :items="Datos" >
        <template v-slot:item.Descripcion="props">
          <v-edit-dialog
            :return-value.sync="props.item.Descripcion"
            large
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.Descripcion }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Actualizar registro</div>
              <v-text-field
                v-model="props.item.Descripcion"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}

        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false"> Cerrar </v-btn>
        </template>
      </v-snackbar>
    </div>
    <hr size="10" />
    <!-- <div>
      <v-data-table :headers="headersBaja" :items="DatosBaja">
        <template v-slot:item.Descripcion="props">
          <v-edit-dialog
            :return-value.sync="props.item.Descripcion"
            large
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.Descripcion }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Actualizar registro</div>
              <v-text-field
                v-model="props.item.Descripcion"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}

        <template v-slot:action="{ attrs }">
          <v-btn v-bind="attrs" text @click="snack = false"> Cerrar </v-btn>
        </template>
      </v-snackbar>
    </div> -->
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
        text: 'MasterList',
        disabled: true,
      },
      {
        text: 'Detalle',
        disabled: false
      },
    ],
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: (v) => v.length <= 100 || "Maximo 100 caracteres",
      pagination: {},
      headers: [
        {
          text: "Detalle",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Descripción", value: "Descripcion", sortable: false },
        { text: "Prorroga", value: "Prorroga", sortable: false },
        { text: "Descripción", value: "ProrrogaDescripcion", sortable: false },
        { text: "Histórico", value: "Historico", sortable: false },
        { text: "Descripción", value: "HistoricoDescripcion", sortable: false },
      ],
      Datos: [
        {
          name: "VIN",
          Descripcion: "WATEI-23ERIFN6534",
          Prorroga: "Prorroga",
          ProrrogaDescripcion: "Inicial",
          Historico: "Número de empelado",
          HistoricoDescripcion: "5628-8",
        },
        {
          name: "Auto",
          Descripcion: "A3 SEDAN",
          Prorroga: "Inicio",
          ProrrogaDescripcion: "22/11/2025",
          Historico: "Nombre",
          HistoricoDescripcion: "Christian Hernandez",
        },
        {
          name: "MY",
          Descripcion: 2016,
          Prorroga: "Fin",
          ProrrogaDescripcion: "14/02/2026",
          Historico: "Flotilla",
          HistoricoDescripcion: "MYW-8954",
        },
        {
          name: "Descripción del modelo",
          Descripcion: "A3 SEDAN 1.4 TFSI COD Dynamic 1500p S",
          Prorroga: "Plazo",
          ProrrogaDescripcion: "5",
          Historico: "Estatus flotilla",
          HistoricoDescripcion: "Activo",
        },
        {
          name: "Año pedido",
          Descripcion: "2020",
          Prorroga: "Poliza",
          ProrrogaDescripcion: "MY0K-258",
          Historico: "Inicio",
          HistoricoDescripcion: "14/05/2019",
        },
        {
          name: "Mes pedido",
          Descripcion: "Abril",
          Historico: "fin",
          HistoricoDescripcion: "19/10/2021",
        },
        {
          name: "Inicio contrato",
          Descripcion: "01/12/2021",
          Historico: "Kilometraje",
          HistoricoDescripcion: "7,985",
        },
        {
          name: "Fin contrato",
          Descripcion: "25/05/2022",
          Historico: "Editor",
          HistoricoDescripcion: "Inactivo",
        },
        {
          name: "Plazo",
          Descripcion: "12",
        },
        {
          name: "Concesionario",
          Descripcion: "MYW",
        },
        {
          name: "No Motor",
          Descripcion: "WSQY-LO98735RFD",
        },
        {
          name: "Color",
          Descripcion: "Blanco",
        },
        {
          name: "Placa",
          Descripcion: "C2E-486257",
        },
        {
          name: "Póliza",
          Descripcion: "TRe534-58",
        },
        {
          name: "Fin seguro",
          Descripcion: "12/12/2022",
        },
        {
          name: "Contrato",
          Descripcion: "WUAYUFBV--09254",
        },
        {
          name: "No activo",
          Descripcion: "5469",
        },
        {
          name: "Precio",
          Descripcion: "12,000.00",
        },
        {
          name: "Renta",
          Descripcion: "5,000",
        },
        {
          name: "Estatus VWFS",
          Descripcion: "Activo",
        },
        {
          name: "Fecha entrega",
          Descripcion: "18/05/2022",
        },
        {
          name: "Tipo determinación",
          Descripcion: "22/05/2022",
        },
        {
          name: "Tipo cierre",
          Descripcion: "Finalizado",
        },
        {
          name: "KM excedente",
          Descripcion: "Contrato",
        },
        {
          name: "Costo kilometraje",
          Descripcion: "16,000.00",
        },
        {
          name: "Avalúo",
          Descripcion: "12,000.00",
        },
        {
          name: "Fecha avalúo",
          Descripcion: "06/02/2020",
        },
      ],
      headersBaja: [
        {
          text: "Datos",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Descripción", value: "Descripcion", sortable: false },
      ],
      DatosBaja: [
        {
          name: "Fecha de entrega",
          Descripcion: "01/12/2020",
        },
        {
          name: "Fecha de devolución",
          Descripcion: "02/12/2021",
        },
        {
          name: "Kilometraje al devolver",
          Descripcion: "35,00",
        },
        {
          name: "Kilometraje excedente",
          Descripcion: "5,000",
        },
        {
          name: "Costo kilometraje",
          Descripcion: "20,000.00",
        },
        {
          name: "Avaluo",
          Descripcion: "15,000.00",
        },
        {
          name: "Fecha avaluo",
          Descripcion: "25/11/2020",
        },
        {
          name: "Tipo baja",
          Descripcion: "Terminación normla. Terminación anticipada. Perdida total",
        },
      ],
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Datos Guardados";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Cacelado";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Editar registro";
    },
    close() {
      console.log("Cancelado");
    },
  },
};
</script>