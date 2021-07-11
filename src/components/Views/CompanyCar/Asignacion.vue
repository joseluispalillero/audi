<template>
 <div id="container-asignacion">
   <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="asignacion">
    <div class="load">
         <span class="title"> Solicitud  </span>

            <v-row>
              <v-col  cols="9" sm="9"  md="9" >
                <v-text-field  class="search" v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
              </v-col>
               <v-col  cols="2" sm="2" md="2" >
                <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
                  <v-icon>mdi-magnify</v-icon>
                  <div class="d-none d-sm-flex d-lg-none">Buscar</div>
               </v-btn>
              </v-col>
        </v-row>
         <div class="filter">
         <v-radio-group  v-model="CampoFilter"  row >
            <v-radio label="Número de empleado" value="nc" true></v-radio>
            <v-radio   label="Nombre de empleado" value="nombreUsuario" ></v-radio>
         </v-radio-group>
         </div>
    </div>

     <div class="TablesolicitudPendiente">
      <v-data-table  :headers="headers" :items="desserts"  sort-by="empleado"  class="elevation-1" >
         <template v-slot:top>

         </template>
         <template v-slot:item.actions="{ item }">
           <v-icon  small  class="mr-2" @click="editItem(item)" > mdi-pencil  </v-icon>
         </template>
         <template v-slot:no-data>
           <span>No se encontraron Datos</span>
         </template>
       </v-data-table>
    </div>

    <div class="formularioLectura">
        <v-row >
          <v-col md="4" cols="12">
            <v-text-field ref="Nempleado" v-model="Nempleado"  label="Número de empleado" disabled  outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field ref="NomEmpleado" v-model="NomEmpleado"  label="Nombre del empleado" disabled outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field ref="UO" v-model="UO"  label="Unidad Organizacional" disabled outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field ref="GrupoPersona" v-model="GrupoPersona"  label="Grupo Persona" disabled outlined ></v-text-field>
          </v-col>
           <v-col md="4" cols="12">
              <v-text-field ref="Cfamiliar" v-model="Cfamiliar"  label="Clasificación familiar" disabled outlined></v-text-field>
           </v-col>
        </v-row>
    </div>

    <div class="formulario">
      <v-form v-model="valid" >
        <v-row >
           <v-col md="4" cols="12">
             <span class="A1primera" >Primer auto*</span>
          </v-col>
          <v-col md="4" cols="12">
              <v-text-field ref="A1PrimeraOpcion" v-model="A1PrimeraOpcion"  label="Primera opción" disabled outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
             <v-text-field ref="A1SegundaOpcion" v-model="A1SegundaOpcion"  label="Segunda opción" disabled outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12" v-show="tipoGrupoPersona" >
             <span class="A1primera" >Segundo auto</span>
          </v-col>
          <v-col md="4" cols="12" v-show="tipoGrupoPersona" >
             <v-text-field ref="A2PrimeraOpcion" v-model="A2PrimeraOpcion"  label="Primera opción" disabled outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12" v-show="tipoGrupoPersona" >
             <v-text-field ref="A2SegundaOpcion" v-model="A2SegundaOpcion"  label="Segunda opción" disabled outlined ></v-text-field>
          </v-col>
          <v-col cols="12">
          <div class="TablesolicitudPendiente">
            <v-data-table  :headers="headersAutos" :items="dessertsAutos"  sort-by="VIN"  hide-default-footer class="elevation-1" >
               <template v-slot:top>

               </template>
               <template v-slot:no-data>
                 <span>No se encontraron Datos</span>
               </template>
             </v-data-table>
          </div>
          </v-col>
          <v-col md="4" cols="12">
              <v-select  label="modelos" :items="modelosList"   required :rules="modelosRules" v-model="modelos " outlined  >
              </v-select>
          </v-col>
          <v-col cols="8" >
             <v-btn color="#f50537" class="btn-buscar"   v-on:click="Cars"  >
                 Buscar
             </v-btn>
           </v-col>
           <v-col cols="12">
           <div class="TableCars">
               <v-data-table  :headers="headersCars" item-key="VIN" :single-select="singleSelect" show-select  v-model="selected"  :items="dessertsCars"  sort-by="VIN"  hide-default-footer class="elevation-1" >
                  <template v-slot:top>
                  </template>
                  <template v-slot:no-data>
                    <span>No se encontraron Datos</span>
                  </template>
                </v-data-table>
           </div>
           </v-col>
           <v-col md="4" cols="12">
              <v-text-field ref="Lugar" v-model="lugar" :rules="LugarRules" label="Lugar de entrega*" required outlined ></v-text-field>
           </v-col>
          <v-col md="4" cols="12">
              <v-text-field ref="hora" v-model="hora" :rules="HoraRules" label="Hora de entrega del auto*" required outlined ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
             <v-text-field label="Fecha de entrega del auto*" required  :rules="dateFechaRules"   v-model="FechaEntrega" outlined  prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
          </v-col>
          <v-col md="4" cols="12">
            <v-btn  class="btn-add" color="#f50537" @click="showAlert" :disabled="!valid" href="Archivo.pdf"  download >Guardar </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <div>
        <b-alert  :show="dismissCountDown"  dismissible  variant="success"  @dismissed="dismissCountDown=0"  @dismiss-count-down="countDownChanged">
          Proceso exitoso
        </b-alert>
     </div>
      <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="FechaEntrega" persistent  width="290px"  >
        <v-date-picker v-model="FechaEntrega"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogFecha.save(FechaEntrega)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

    </div>
 </div>
</template>

<script>
import NavigationInfo from '../NavigationInfo.vue'
export default {
  components: {NavigationInfo},
    data: () => ({
      navigationInfo: [
        {
          text: 'Home',
          disabled: true,
        },
        {
          text: 'Company',
          disabled: true,
        },
        {
          text: 'Asignación',
          disabled: false
        },
      ],
      valid: false,
      desserts: [],
      dessertsCars: [],
      dessertsAutos: [],
      dismissSecs: 10,
      dismissCountDown: 0,
      tipoGrupoPersona: true,
      mensaje:'Solicitud Realizada con éxito',
      filter: '',
      singleSelect: false,
      selected: [],
      CampoFilter: 'nc',
      search: '',
      Nempleado: '',
      NomEmpleado: '',
      GrupoPersona: '',
      UO: 'Unidad organizacional',
      Cfamiliar: 'Clasificacion familiar',
      A1PrimeraOpcion:'',
      A1SegundaOpcion:'',
      A2PrimeraOpcion:'',
      A2SegundaOpcion:'',
      modelos: '',
      FechaEntrega: '',
      dialogFecha: false,
      dateFechaRules: [ v => !!v || 'Fecha de entrega del auto es requerido'   ],
      modelosList: [  'A1' , 'A3' ,  'A4' ,  'A6' ],
      A1PrimeraRules: [  v => !!v || 'Primera opción es requerido' ],
      A1SegundaRules: [  v => !!v || 'Segunda opción es requerido'  ],
      modelosRules: [  v => !!v || 'modelo es requerido'  ],
      LugarRules: [  v => !!v || 'Lugar de entrega es requerido'  ],
      HoraRules: [  v => !!v || 'Hora de entrega del auto es requerido'  ],
      searchRules: [  v => !!v || 'Search es requerido'  ],
      lugar:'',
      hora:'',
      headers: [
        {
          text: 'Folio de solicitud',
          align: 'start',
          sortable: false,
          value: 'folio',
        },
        { text: 'Número de empleado', value: 'empleado' },
        { text: 'Nombre del empleado', value: 'Nombre' },
        { text: 'Grupo de personal ', value: 'grupo' },
        { text: 'Clasificación familiar', value: 'clasificacion' },
        { text: 'Modelos de autos', value: 'autos' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headersAutos: [
        {
          text: 'VIN',
          align: 'start',
          sortable: false,
          value: 'VIN',
        },
        { text: 'Descripción Modelo', value: 'Modelo' },
        { text: 'Fecha inicio contrato', value: 'Fecha_inicio' },
        { text: 'Fecha fin contrato', value: 'Fecha_fin' }
      ],
      headersCars: [
        {
          text: 'VIN',
          align: 'start',
          sortable: false,
          value: 'VIN',
        },
        { text: 'Auto', value: 'Auto' },
        { text: 'MY', value: 'MY' },
        { text: 'Descripción Modelo', value: 'Modelo' },
        { text: 'Color', value: 'Color' },
        { text: 'Fecha inicio contrato', value: 'Fecha_inicio' },
        { text: 'Fecha fin contrato', value: 'Fecha_fin' },
        { text: 'Plazo del contrato', value: 'PContrato' }
      ],
  }),
  created () {
    this.initialize()
  },
  methods: {
    registerUser () {
      console.log('envio de registro')
       alert(this.mensaje)
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    initialize () {
      this.desserts = [
        {
          folio: '40025',
          empleado: '835579',
          Nombre: 'EDUARDO ALAN GARRIDO ALEJANDRE',
          grupo: 'OMK (Local/Impat)',
          clasificacion: 'Soltero',
          autos: 'A3 , A1',
        },
        {
          folio: '32580',
          empleado: '900203',
          Nombre: 'Audi Mexico',
          grupo: 'MK Gerente/At/T+ (Local/Impat)',
          clasificacion: 'familia 2+ hijos',
          autos: 'A3 , A1',
        },
      ]
    },
    initializeAutos () {
       this.dessertsAutos = [
        {
          VIN: 'WAUZZZFY0H2030210',
          Modelo: 'A1 1.4 TFSI  122 hp  cool Manual',
          Fecha_inicio: '11/05/2015',
          Fecha_fin: '01/05/2017'
        },
        {
          VIN: 'WAU8CF8V4FA082182',
          Modelo: 'A3   1.8 TFSI  180 hp  Ambiente S tronic  ',
          Fecha_inicio: '17/03/2015',
          Fecha_fin: '08/03/2017'
        },
       ]
    },
    initializeCars () {
       this.dessertsCars = [
        {
          VIN: 'WAUZZZFY0H2454654',
          Auto: 'A3',
          MY: '2015',
          Modelo: 'A3   1.8 TFSI  180 hp  Ambiente S tronic  ',
          Color: 'Blanco glaciar',
          Fecha_inicio: '11/05/2015',
          Fecha_fin: '01/05/2017',
          PContrato: '24'
        },
        {
          VIN: 'AZCVSGOO2563C0',
          Auto: 'A3',
          MY: '2015',
          Modelo: 'A3   1.8 TFSI  180 hp  Ambiente S tronic  ',
          Color: 'Blanco glaciar',
          Fecha_inicio: '11/05/2015',
          Fecha_fin: '01/05/2017',
          PContrato: '24'
        },
        {
          VIN: 'WAUZZZFY0H2030210',
          Auto: 'A3',
          MY: '2015',
          Modelo: 'A3   1.8 TFSI  180 hp  Ambiente S tronic  ',
          Color: 'Blanco glaciar',
          Fecha_inicio: '11/05/2015',
          Fecha_fin: '01/05/2017',
          PContrato: '24'
        },
       ]
    },
    editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)

         this.Nempleado = this.editedItem.empleado,
         this.NomEmpleado= this.editedItem.Nombre,
         this.GrupoPersona= this.editedItem.grupo,
         this.UO= this.editedItem.Nombre,
         this.Cfamiliar= this.editedItem.clasificacion,
         this.A1PrimeraOpcion='A3',
         this.A1SegundaOpcion='A1'

          this.initializeAutos();
    },
    Cars () {
        this.initializeCars();
    }
  }
}
</script>