<template>
 <div id="container-flotilla">
  <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="flotilla">

        <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
        <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title">Carga masiva </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
       <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Carga individual </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Vin" value="vin" true></v-radio>
        <v-radio label="Placa" value="placa" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="vin"  class="elevation-1" >
          <template v-slot:item.ini_contrato="{ item }">
             {{ formatDate(item.ini_contrato) }}
          </template>
          <template v-slot:item.fin_contrato="{ item }">
             {{ formatDate(item.fin_contrato) }}
          </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field v-model="search" append-icon="mdi-magnify"  label="Buscar"  single-line   hide-details   ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="usuarios" >
                 <v-icon>mdi-plus</v-icon>
                 Agregar
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar Flotilla?</v-card-title>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="#f50537" text @click="closeDelete">Cancel</v-btn>
                   <v-btn color="#f50537" text @click="deleteItemConfirm">OK</v-btn>
                   <v-spacer></v-spacer>
                 </v-card-actions>
               </v-card>
             </v-dialog>
           </v-toolbar>
         </template>
         <template v-slot:item.actions="{ item }">
           <v-icon  small  class="mr-2" @click="editItem(item)" > mdi-pencil  </v-icon>
           <v-icon  small  @click="deleteItem(item)"   >  mdi-delete  </v-icon>
         </template>
         <template v-slot:no-data>
           <span>No se encontraron Datos</span>
         </template>
       </v-data-table>
    </div>

    <v-dialog v-model="dialog" persistent max-width="900px" >
          <v-card>
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
         <v-row>
           <v-col  cols="12" sm="6"  md="4" >
             <v-text-field label="Año pedido" :rules="año_pedidoRules"  v-model="editedItem.anio_pedido" required ></v-text-field>
           </v-col>
           <v-col  cols="12"  sm="6"  md="4" >
             <v-text-field label="Mes pedido" :rules="mes_pedidoRules"  v-model="editedItem.mes_pedido" required ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="MY"  :rules="MYRules"  v-model="editedItem.my"  required ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="VIN" :rules="VINRules"  v-model="editedItem.vin"   required ></v-text-field>
           </v-col>
           <v-col  cols="12" sm="6"  md="8" >
             <v-text-field label="Descripción extendida de modelo" required :rules="extModeloRules"  v-model="editedItem.desc_modelo" ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Auto" :rules="AutoRules"  v-model="editedItem.auto"   required ></v-text-field>
           </v-col>
           <v-col  cols="12"  sm="6"  md="4" >
             <v-text-field label="Inicio contrato" required :rules="dateInicioRules"    v-model="editedItem.ini_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog1 = true"  ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field label="Fin contrato" required  :rules="dateFinRules"   v-model="editedItem.fin_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog2 = true"  ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="2"  >
             <v-autocomplete  label="Plazo" :items="itemPlazo"   item-text="valor" item-value="valor"  required :rules="PlazoRules" v-model="editedItem.plazo"  >  </v-autocomplete>
           </v-col>
           <v-col  cols="12" sm="6"  md="6" >
             <v-autocomplete  label="Dealer" :items="itemDealer"   item-text="valor" item-value="valor"  required :rules="DealerRules" v-model="editedItem.dealer"  >  </v-autocomplete>
           </v-col>
           <v-col  cols="12"  sm="6"  md="4" >
             <v-text-field label="No.Motor" required  :rules="MotorRules"   v-model="editedItem.num_motor" ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Color"   required :rules="ColorRules"   v-model="editedItem.color"  ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Placa"   required  :rules="PlacaRules"   v-model="editedItem.placa" ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Póliza"   required  :rules="PólizaRules"   v-model="editedItem.poliza" ></v-text-field>
           </v-col>
           <v-col  cols="12" sm="6"  md="4" >
            <v-text-field label="Fin Seguro" required  :rules="dateFinSeguroRules"   v-model="editedItem.fin_seguro"   prepend-icon="mdi-calendar"  readonly  @click="dialogSeguro = true"  ></v-text-field>
           </v-col>
           <v-col  cols="12"  sm="6"  md="4" >
             <v-text-field label="Contrato/N. Activo" required :rules="ContratoRules"   v-model="editedItem.contrato_vwfs"  ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Precio"   required  :rules="PrecioRules"   v-model="editedItem.precio" ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field  label="Renta"   required  :rules="RentaRules"   v-model="editedItem.renta" ></v-text-field>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-autocomplete  label="Estatus VWFS" :items="itemEstatusVWFS"   item-text="valor" item-value="valor"  required :rules="EstatusRules" v-model="editedItem.estatus_vwfs"  >  </v-autocomplete>
           </v-col>
           <v-col cols="12"  sm="6"  md="4"  >
             <v-text-field label="Fecha entrega" required  :rules="dateEntregaRules"   v-model="editedItem.fecha_entrega"   prepend-icon="mdi-calendar"  readonly  @click="dialogEntrega = true"  ></v-text-field>
           </v-col>

            <v-col  cols="12" sm="6"  md="4" >
              <v-text-field label="Fecha Devolución" required  :rules="dateDevRules"   v-model="editedItem.fecha_devolucion"   prepend-icon="mdi-calendar"  readonly  @click="dialogDev = true"  ></v-text-field>
            </v-col>
             <v-col  cols="12"  sm="6"  md="4" >
               <v-autocomplete  label="Tipo Terminación" :items="itemTipoTerminacion"   item-text="valor" item-value="valor"  required :rules="TerminacionRules" v-model="editedItem.tipo_terminacion"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Tipo Cierre" :items="itemTipoCierre"   item-text="valor" item-value="valor"  required :rules="CierreRules" v-model="editedItem.tipo_cierre"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="alta"  >
               <v-autocomplete  label="Número de empleado" :items="itemUsuario"   item-text="nc" item-value="id"  required :rules="empleadoRules" v-model="editedItem.id_usuario"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
                <v-text-field  label="Nombre"   disabled  v-model="editedItem.nombre_usuario"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
                <v-text-field  label="Número de empleado"   disabled  v-model="editedItem.nc"  ></v-text-field>
             </v-col>
             <v-col  cols="12"  sm="6"  md="4" >
                <v-autocomplete  label="Centro Costos" :items="itemCentroCostos"   item-text="valor" item-value="valor"  required :rules="CostosRules" v-model="editedItem.centro_costos"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Tipo Empleado" :items="itemTipoEmpleado"   item-text="valor" item-value="valor"  required :rules="Tipo_EmpleadoRules" v-model="editedItem.tipo_empleado"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Flotilla" :items="itemFlotilla"   item-text="valor" item-value="valor"  required :rules="FlotillaRules" v-model="editedItem.flotilla"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
                <v-autocomplete  label="Estatus Flotilla" :items="itemEstatus"   item-text="valor" item-value="id"  required :rules="Est_FlotillaRules" v-model="editedItem.estatus_flotilla"  >  </v-autocomplete>
             </v-col>
         </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  color="#f50537"  text  @click="close" >
                Cerrar
              </v-btn>
              <v-btn color="#f50537" text  @click="save"  >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

         <v-dialog   ref="dialog1"   v-model="dialog1" :return-value.sync="editedItem.ini_contrato" persistent  width="290px"  >
             <v-date-picker v-model="editedItem.ini_contrato"  scrollable  >
               <v-spacer></v-spacer>
               <v-btn  text color="primary"  @click="dialog1 = false"  > Cancel </v-btn>
               <v-btn text color="primary"  @click="$refs.dialog1.save(editedItem.ini_contrato)"  >
                 OK
               </v-btn>
             </v-date-picker>
         </v-dialog>

         <v-dialog   ref="dialog2"   v-model="dialog2" :return-value.sync="editedItem.fin_contrato" persistent  width="290px"  >
              <v-date-picker v-model="editedItem.fin_contrato"  scrollable  >
                <v-spacer></v-spacer>
                <v-btn  text color="primary"  @click="dialog2 = false"  > Cancel </v-btn>
                <v-btn text color="primary"  @click="$refs.dialog2.save(editedItem.fin_contrato)"  >
                  OK
                </v-btn>
              </v-date-picker>
         </v-dialog>

         <v-dialog   ref="dialogSeguro"   v-model="dialogSeguro" :return-value.sync="editedItem.fin_seguro" persistent  width="290px"  >
              <v-date-picker v-model="editedItem.fin_seguro"  scrollable  >
                <v-spacer></v-spacer>
                <v-btn  text color="primary"  @click="dialogSeguro = false"  > Cancel </v-btn>
                <v-btn text color="primary"  @click="$refs.dialogSeguro.save(editedItem.fin_seguro)"  >
                  OK
                </v-btn>
              </v-date-picker>
         </v-dialog>

         <v-dialog   ref="dialogEntrega"   v-model="dialogEntrega" :return-value.sync="editedItem.fecha_entrega" persistent  width="290px"  >
               <v-date-picker v-model="editedItem.fecha_entrega"  scrollable  >
                 <v-spacer></v-spacer>
                 <v-btn  text color="primary"  @click="dialogEntrega = false"  > Cancel </v-btn>
                 <v-btn text color="primary"  @click="$refs.dialogEntrega.save(editedItem.fecha_entrega)"  >
                   OK
                 </v-btn>
               </v-date-picker>
         </v-dialog>

         <v-dialog   ref="dialogDev"   v-model="dialogDev" :return-value.sync="editedItem.fecha_devolucion" persistent  width="290px"  >
                <v-date-picker v-model="editedItem.fecha_devolucion"  scrollable  >
                  <v-spacer></v-spacer>
                  <v-btn  text color="primary"  @click="dialogDev = false"  > Cancel </v-btn>
                  <v-btn text color="primary"  @click="$refs.dialogDev.save(editedItem.fecha_devolucion)"  >
                    OK
                  </v-btn>
                </v-date-picker>
         </v-dialog>

    </div>
    </div>
 </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import XLSX from "xlsx"
  import NavigationInfo from "../NavigationInfo";

  export default {
    components: {NavigationInfo},
     data: () => ({
       navigationInfo: [
          {
            text: 'Home',
            disabled: true,
          },
          {
            text: 'Admin',
            disabled: true,
          },
          {
            text: 'Carga datos',
            disabled: true,
          },
          {
            text: 'Flotilla',
            disabled: false
          },
      ],
      dialog: false,
      menu: false,
      file: null,
      alert: false,
      alertError: false,
      validate : false,
      desserts: [],
      itemEstatus: [
         {text: 'valor' , value:'id_rol'},
      ],
      itemUsuario: [
        {text: 'nc' , value:'id_usuario'},
      ],
      itemPlazo: [
         {text: 'valor' , value:'valor'},
      ],
      itemDealer: [
         {text: 'valor' , value:'valor'},
      ],
      itemEstatusVWFS: [
         {text: 'valor' , value:'valor'},
      ],
      itemTipoTerminacion: [
         {text: 'valor' , value:'valor'},
      ],
      itemTipoCierre: [
         {text: 'valor' , value:'valor'},
      ],
      itemCentroCostos: [
         {text: 'valor' , value:'valor'},
      ],
      itemTipoEmpleado: [
         {text: 'valor' , value:'valor'},
      ],
      itemFlotilla: [
         {text: 'valor' , value:'valor'},
      ],
      filter: '',
      CampoFilter: 'vin',
      search: '',
      alta: false,
      updateV: false,
      dialogDelete: false,
      año_pedidoRules: [  v => !!v || 'Año pedido es requerido' ],
      mes_pedidoRules: [   v => !!v || 'Mes pedido es requerido'   ],
      VINRules: [  v => !!v || 'VIN es requerido'  ],
      MYRules: [  v => !!v || 'MY es requerido'  ],
      extModeloRules: [  v => !!v || 'Descripción extendida de modelo es requerido'  ],
      dialog1: false,
      dateInicioRules: [  v => !!v || 'Inicio contrato es requerido'  ],
      dialog2: false,
      dateFinRules: [  v => !!v || 'Fin contrato es requerido'  ],
      PlazoRules: [  v => !!v || 'Plazo es requerido'  ],
      DealerRules: [ v => !!v || 'Dealer es requerido'     ],
      MotorRules: [  v => !!v || 'Motor es requerido'  ],
      AutoRules: [  v => !!v || 'Auto es requerido'  ],
      ColorRules: [   v => !!v || 'Color es requerido'  ],
      PlacaRules: [ v => !!v || 'Placa es requerido'  ],
      PólizaRules: [   v => !!v || 'Póliza es requerido'  ],
      ContratoRules: [ v => !!v || 'Contrato es requerido'  ],
      PrecioRules: [  v => !!v || 'Precio es requerido'  ],
      RentaRules: [  v => !!v || 'Renta es requerido'  ],
      EstatusRules: [  v => !!v || 'Estatus es requerido' ],
      dialogSeguro: false,
      dateFinSeguroRules: [  v => !!v || 'Fin Seguro es requerido'  ],
      dialogEntrega: false,
      dateEntregaRules: [  v => !!v || 'Fecha entrega es requerido'  ],
      dialogDev: false,
      dateDevRules: [   v => !!v || 'Fecha Dev. es requerido' ],
      TerminacionRules: [  v => !!v || 'Tipo Terminacion es requerido'   ],
      CierreRules: [  v => !!v || 'Tipo Cierre es requerido'   ],
      empleadoRules: [   v => !!v || 'Numero de empleado es requerido'   ],
      NombreRules: [  v => !!v || 'Nombre es requerido'   ],
      CostosRules: [   v => !!v || 'Centro Costos es requerido'  ],
      Tipo_EmpleadoRules: [   v => !!v || 'Tipo Empleado es requerido'  ],
      FlotillaRules: [  v => !!v || 'Flotilla es requerido'   ],
      Est_FlotillaRules: [   v => !!v || 'Est. Flotilla es requerido' ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Vin',
          align: 'start',
          sortable: false,
          value: 'vin',
        },
        { text: 'Descripción modelo', value: 'desc_modelo' },
        { text: 'Inicio contrato', value: 'ini_contrato' },
        { text: 'Fin contrato', value: 'fin_contrato' },
        { text: 'Plazo', value: 'plazo' },
        { text: 'Dealer', value: 'dealer' },
        { text: 'Placa', value: 'placa' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {

        anioPedido:'',
        mesPedido:'',
        vin:'',
        auto:'',
        my:'',
        descModelo:'',
        iniContrato:'',
        finContrato:'',
        plazo:'',
        dealer:'',
        numMotor:'',
        color:'',
        placa:'',
        poliza:'',
        iniSeguro:'',
        finSeguro:'',
        contratoVwfs:'',
        precio:'',
        renta:'',
        estatusVwfs:'',
        fechaEntrega:'',
        fechaDevolucion:'',
        tipoTerminacion:'',
        tipoCierre:'',
        centroCostos:'',
        tipoEmpleado:'',
        flotilla:'',
        estatusFlotilla:'',
        idUsuario:'',
      },
      defaultItem: {
        anioPedido:'',
       mesPedido:'',
       vin:'',
       auto:'',
       my:'',
       descModelo:'',
       iniContrato:'',
       finContrato:'',
       plazo:'',
       dealer:'',
       numMotor:'',
       color:'',
       placa:'',
       poliza:'',
       iniSeguro:'',
       finSeguro:'',
       contratoVwfs:'',
       precio:'',
       renta:'',
       estatusVwfs:'',
       fechaEntrega:'',
       fechaDevolucion:'',
       tipoTerminacion:'',
       tipoCierre:'',
       centroCostos:'',
       tipoEmpleado:'',
       flotilla:'',
       estatusFlotilla:'',
       idUsuario:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Flotilla' : 'Actualiza Flotilla'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.CatSistema()
    },

    methods: {
      CargaDatosR : function () {
          this.$router.push({ path: '/admin/cargadatos' })
      },
      formatDate(value) {
          return moment(value).format("YYYY-MM-DD")
      },
      onUpload() {
          if (this.file) {
              const reader = new FileReader();

              reader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const sheetnames = Object.keys(wb.Sheets);
                let i = sheetnames.length;
                const resData = {};

               // console.log("lenght_Sheetnames>>",i);
                const documents = {};

                while (i--) {
                    var sheetname = sheetnames[i];
                    resData[sheetname] = XLSX.utils.sheet_to_json(wb.Sheets[sheetname], {defval:'',raw:false,dateNF:'yyyy-mm-dd'});
                    documents[sheetname] = resData[sheetname];
                }
                // console.log(documents);

                 let objJsonStr = JSON.stringify(documents);
                 let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
                // console.log("VVVV>>: ",objJsonB64);
                 this.CargaMasiva(objJsonB64)

              }
          reader.readAsBinaryString(this.file);
        }
      },
      async CargaMasiva (objJsonB64) {
           let oUsuario= {
              "modulo":"Flotilla",
              "data" : objJsonB64,
              "idUsrModif":1
           };

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/carga`
            const headers={
                    "Content-Type":'application/json',
                    "Access-Control-Allow-Credentials": false
            }

            try {
             console.log(oUsuario);
             const response = await axios.post(url,oUsuario,headers);
             console.log(response.data.result);
             this.alert = true
            } catch (error) {
              console.error(error);
              this.alertError = true
            }
      },
      async usuarios () {
        this.dialog = true
        this.alta = true
        this.updateV = false
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario`
        try {
            const response = await axios.get(url);
            this.itemUsuario = response.data.result
            console.log(response.data.result)

        } catch (error) {
            console.error(error);
        }
      },
      async getseach (campoFilter,search) {
        if(search == ''){
            console.log('No hay datos')
        }else{
            console.log(campoFilter , search)
            let busqueda={campoFilter : search}

            let params = '';
            if (typeof busqueda !== 'undefined' && busqueda !== null  )
               params= params.concat(`?${campoFilter}=${busqueda.campoFilter}`);

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla${params}`
            try {
                console.log(url)
                const response = await axios.get(url);
                this.desserts = response.data.result

            } catch (error) {
                console.error(error);
            }

        }
      },
      async CatSistema () {
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
          try {
              const response = await axios.get(url);
              this.itemPlazo = response.data.result.catalogos.plazo
              this.itemDealer = response.data.result.catalogos.dealer
              this.itemEstatusVWFS = response.data.result.catalogos.estatusVWFS
              this.itemTipoTerminacion = response.data.result.catalogos.tipoTerminacion
              this.itemTipoCierre = response.data.result.catalogos.tipoCierre
              this.itemCentroCostos = response.data.result.catalogos.centroCostos
              this.itemTipoEmpleado = response.data.result.catalogos.tipoEmpleado
              this.itemFlotilla = response.data.result.catalogos.flotilla
              this.itemEstatus = response.data.result.catalogos.estatus
              //console.log(response.data.result.catalogos.vigencia)

          } catch (error) {
              console.error(error);
          }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.alta = false
        this.updateV = true
        this.editedItem.ini_contrato = this.formatDate(this.editedItem.ini_contrato)
        this.editedItem.fin_contrato = this.formatDate(this.editedItem.fin_contrato)
        this.editedItem.fin_seguro = this.formatDate(this.editedItem.fin_seguro)
        this.editedItem.fecha_entrega = this.formatDate(this.editedItem.fecha_entrega)
        this.editedItem.fecha_devolucion = this.formatDate(this.editedItem.fecha_devolucion)
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        console.log(this.editedItem)
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        let oUsuario= {
            data:{
                 "idFlotilla": this.editedItem.id_flotilla,
                 "idUsuario": this.editedItem.id_usuario
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
          const headers={
                  "Content-Type":'application/json',
                  "Access-Control-Allow-Credentials": false
          }

          try {
           console.log(oUsuario);
           const response = await axios.delete(url,oUsuario,headers);
           console.log(response.data.result);

          } catch (error) {
            console.error(error);
         }

        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)

        var fe = new Date();
        var hora  = fe.getHours() + ':' + fe.getMinutes() + ':' + fe.getSeconds();
        var fin_contrato = this.editedItem.fin_contrato + ' ' + hora;
        var iniContrato = this.editedItem.ini_contrato + ' ' + hora;
        var finSeguro = this.editedItem.fin_seguro + ' ' + hora;
        var fechaEntrega = this.editedItem.fecha_entrega + ' ' + hora;
        var fechaDevolucion = this.editedItem.fecha_devolucion + ' ' + hora;

         let oUsuario= {
           "idFlotilla": this.editedItem.id_flotilla ,
           "anioPedido": this.editedItem.anio_pedido,
           "mesPedido":this.editedItem.mes_pedido,
           "vin":this.editedItem.vin,
           "auto":this.editedItem.auto,
           "my":this.editedItem.my,
           "descModelo":this.editedItem.desc_modelo,
           "iniContrato":iniContrato,
           "finContrato":fin_contrato,
           "plazo":this.editedItem.plazo,
           "dealer":this.editedItem.dealer,
           "numMotor":this.editedItem.num_motor,
           "color":this.editedItem.color,
           "placa":this.editedItem.placa,
           "poliza":this.editedItem.poliza,
           "iniSeguro": finSeguro,
           "finSeguro": finSeguro,
           "contratoVwfs":this.editedItem.contrato_vwfs,
           "precio":this.editedItem.precio,
           "renta":this.editedItem.renta,
           "estatusVwfs":this.editedItem.estatus_vwfs,
           "fechaEntrega": fechaEntrega,
           "fechaDevolucion": fechaDevolucion,
           "tipoTerminacion":this.editedItem.tipo_terminacion,
           "tipoCierre":this.editedItem.tipo_cierre,
           "centroCostos":this.editedItem.centro_costos,
           "tipoEmpleado":this.editedItem.tipo_empleado,
           "flotilla":this.editedItem.flotilla,
           "estatusFlotilla":this.editedItem.estatus_flotilla,
           "idUsuario":this.editedItem.id_usuario
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
          const headers={
                  "Content-Type":'application/json',
                  "Access-Control-Allow-Credentials": false
          }

          try {
           console.log(oUsuario);
           const response = await axios.put(url,oUsuario,headers);
           console.log(response.data.result);

          } catch (error) {
            console.error(error);
          }

        } else {
          this.desserts.push(this.editedItem)

           fe = new Date();
           hora  = fe.getHours() + ':' + fe.getMinutes() + ':' + fe.getSeconds();
           fin_contrato = this.editedItem.fin_contrato + ' ' + hora;
           iniContrato = this.editedItem.ini_contrato + ' ' + hora;
           finSeguro = this.editedItem.fin_seguro + ' ' + hora;
           fechaEntrega = this.editedItem.fecha_entrega + ' ' + hora;
           fechaDevolucion = this.editedItem.fecha_devolucion + ' ' + hora;

           let oUsuario= {
             "anioPedido": this.editedItem.anio_pedido,
             "mesPedido":this.editedItem.mes_pedido,
             "vin":this.editedItem.vin,
             "auto":this.editedItem.auto,
             "my":this.editedItem.my,
             "descModelo":this.editedItem.desc_modelo,
             "iniContrato":iniContrato,
             "finContrato":fin_contrato,
             "plazo":this.editedItem.plazo,
             "dealer":this.editedItem.dealer,
             "numMotor":this.editedItem.num_motor,
             "color":this.editedItem.color,
             "placa":this.editedItem.placa,
             "poliza":this.editedItem.poliza,
             "iniSeguro": finSeguro,
             "finSeguro": finSeguro,
             "contratoVwfs":this.editedItem.contrato_vwfs,
             "precio":this.editedItem.precio,
             "renta":this.editedItem.renta,
             "estatusVwfs":this.editedItem.estatus_vwfs,
             "fechaEntrega": fechaEntrega,
             "fechaDevolucion": fechaDevolucion,
             "tipoTerminacion":this.editedItem.tipo_terminacion,
             "tipoCierre":this.editedItem.tipo_cierre,
             "centroCostos":this.editedItem.centro_costos,
             "tipoEmpleado":this.editedItem.tipo_empleado,
             "flotilla":this.editedItem.flotilla,
             "estatusFlotilla":this.editedItem.estatus_flotilla,
             "idUsuario":this.editedItem.id_usuario
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
            const headers={
                    "Content-Type":'application/json',
                    "Access-Control-Allow-Credentials": false
            }

            try {
             console.log(oUsuario);
             const response = await axios.post(url,oUsuario,headers);
             console.log(response.data.result);

            } catch (error) {
              console.error(error);
            }

        }
        this.close()

      },
    },
  }
</script>