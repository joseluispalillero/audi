<template>
 <div id="container-PagosVwfs">
    <div class="Pagos-Vwfs">

    <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
    <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Cargar archivo de Pagos VW FS </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
       <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Pagos VW FS </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Documento" value="documento" true></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="documento"  class="elevation-1" >
         <template v-slot:item.fecha="{ item }">
            {{ formatDate(item.fecha) }}
         </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field
                     v-model="search"
                     append-icon="mdi-magnify"
                     label="Buscar"
                     single-line
                     hide-details
                   ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Flotilla" >
                 <v-icon>mdi-plus</v-icon>
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar Pagos VW FS?</v-card-title>
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

    <v-dialog v-model="dialog" persistent max-width="850px" >
          <v-card>
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
            <v-row>
               <v-col cols="12"  sm="6"  md="4"  >
                 <v-text-field  label="Documento" :rules="DocumentoRules"   v-model="editedItem.documento"  required ></v-text-field>
               </v-col>
               <v-col  cols="12" sm="6"  md="4" >
                  <v-autocomplete  label="Concepto" :items="itemConcepto"   item-text="valor" item-value="valor"  required :rules="ConceptoRules" v-model="editedItem.concepto"  >  </v-autocomplete>
               </v-col>
               <v-col  cols="12" sm="6"  md="4" >
                <v-text-field label="Fecha" required  :rules="dateFechaRules"   v-model="editedItem.fecha"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4"  >
                 <v-text-field  label="Capital del Servicio Adicional"   required :rules="CapitalRules"   v-model="editedItem.capital_serv_ad"  ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4"  >
                 <v-text-field  label="Interés del Servicio Adicional"   required  :rules="InterésRules"   v-model="editedItem.interes_serv_ad" ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4"  >
                 <v-text-field  label="Renta"   required  :rules="RentaRules"   v-model="editedItem.renta" ></v-text-field>
               </v-col>
                <v-col cols="12"  sm="6"  md="4"  >
                  <v-text-field  label="Renta Total"   required  :rules="RentaTRules"   v-model="editedItem.renta_total" ></v-text-field>
                </v-col>
               <v-col  cols="12" sm="6"  md="4" v-if="updateV" >
                 <v-text-field label="Contrato"  v-model="editedItem.contrato_vwfs" disabled ></v-text-field>
               </v-col>
               <v-col  cols="12"  sm="6"  md="4" v-if="updateV" >
                 <v-text-field label="Inicio contrato" disabled v-model="editedItem.ini_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog1 = true"  ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
                 <v-text-field label="Fin contrato" disabled   v-model="editedItem.fin_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog2 = true"  ></v-text-field>
               </v-col>
               <v-col  cols="12"  sm="6"  md="4" v-if="updateV" >
                 <v-text-field label="Plazo" disabled  v-model="editedItem.plazo"  ></v-text-field>
               </v-col>
               <v-col  cols="12"  sm="6"  md="4" v-if="updateV" >
                 <v-text-field label="Modelo" disabled  v-model="editedItem.desc_modelo"  ></v-text-field>
               </v-col>
               <v-col  cols="12"  sm="6"  md="4"  v-if="alta" >
                 <v-autocomplete  label="Vin" :items="itemFlotilla"   item-text="vin" item-value="id_flotilla"  required :rules="ChasisRules" v-model="editedItem.id_flotilla"  >  </v-autocomplete>
               </v-col>
               <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
                 <v-text-field  label="Nombre"   disabled  v-model="editedItem.nombre_usuario" ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
                 <v-text-field  label="Número de empleado"  disabled  v-model="editedItem.nc" ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
                 <v-text-field  label="Centro de Costos"   disabled   v-model="editedItem.centro_costos" ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4"  v-if="updateV" >
                 <v-text-field  label="Tipo Empleado"  disabled  v-model="editedItem.tipo_empleado" ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="4"  v-if="updateV" >
                 <v-text-field  label="Flotilla"  disabled  v-model="editedItem.flotilla"  ></v-text-field>
               </v-col>
            <v-col  cols="12" sm="6"  md="4" v-if="updateV" >
              <v-text-field label="Fecha Devolución" disabled   v-model="editedItem.fecha_devolucion"   prepend-icon="mdi-calendar"  readonly  @click="dialogDev = true"  ></v-text-field>
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

          <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="editedItem.fecha" persistent  width="290px"  >
               <v-date-picker v-model="editedItem.fecha"  scrollable  >
                 <v-spacer></v-spacer>
                 <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancel </v-btn>
                 <v-btn text color="primary"  @click="$refs.dialogFecha.save(editedItem.fecha)"  >
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

  export default {
    data: () => ({
      dialog: false,
      menu: false,
      file: null,
      alert: false,
      alertError: false,
      validate : false,
      desserts: [],
      itemConcepto: [
         {text: 'valor' , value:'valor'},
      ],
      itemFlotilla: [
         {text: 'vin' , value:'id_flotilla'},
      ],
      alta: false,
      updateV: false,
      filter: '',
      CampoFilter: 'documento',
      search: '',
      dialogDelete: false,

        ContratoRules: [  v => !!v || 'Contrato es requerido'  ],
        dialog1: false,
        dateInicioRules: [  v => !!v || 'Inicio contrato es requerido'   ],
        dialog2: false,
        dateFinRules: [  v => !!v || 'Fin contrato es requerido'   ],
        PlazoRules: [  v => !!v || 'Plazo es requerido' ],
        DocumentoRules: [  v => !!v || 'Documento es requerido'   ],
        ConceptoRules: [   v => !!v || 'Concepto es requerido'  ],
        dialogFecha: false,
        dateFechaRules: [  v => !!v || 'Fecha es requerido' ],
        CapitalRules: [   v => !!v || 'Capital del Servicio Adicional es requerido'  ],
        InterésRules: [  v => !!v || 'Interés del Servicio Adicional es requerido'   ],
        RentaRules: [  v => !!v || 'Renta es requerido' ],
        RentaTRules: [  v => !!v || 'Renta Total es requerido'    ],
        ModeloRules: [   v => !!v || 'Modelo es requerido'  ],
        ChasisRules: [  v => !!v || 'Chasis es requerido' ],
        NombreRules: [  v => !!v || 'Nombre es requerido'  ],
        NCRules: [   v => !!v || 'NC es requerido' ],
        CCRules: [   v => !!v || 'CC es requerido'  ],
        Tipo_EmpleadoRules: [  v => !!v || 'Tipo Empleado es requerido'  ],
        FlotillaRules: [   v => !!v || 'Flotilla es requerido' ],
        Est_FlotillaRules: [  v => !!v || 'Est. Flotilla es requerido'   ],
        dialogDev: false,
        dateDevRules: [  v => !!v || 'Fecha Dev. es requerido' ],

      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Documento',
          align: 'start',
          sortable: false,
          value: 'documento',
        },
        { text: 'Concepto', value: 'concepto' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Capital', value: 'capital_serv_ad' },
        { text: 'Interés', value: 'interes_serv_ad' },
        { text: 'Renta', value: 'renta' },
        { text: 'Renta Total', value: 'renta_total' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
          documento:'',
          concepto: '',
          fecha: '',
          capital_serv_ad:'',
          interes_serv_ad:'',
          renta:'',
          renta_total: '',
          estatus:'',
          id_flotilla:'',
          ini_contrato:'',
          fin_contrato:'',
          desc_modelo:'',
          plazo:'',
          vin:'',
          contrato_vwfs:'',
          estatus_flotilla:'',
          nombre_usuario:'',
          centro_costos:'',
          nc:'',
          tipo_empleado:'',
          flotilla:'',
          fecha_devolucion: '',
      },
      defaultItem: {
          documento:'',
          concepto: '',
          fecha: '',
          capital_serv_ad:'',
          interes_serv_ad:'',
          renta:'',
          renta_total: '',
          estatus:'',
          id_flotilla:'',
          ini_contrato:'',
          fin_contrato:'',
          desc_modelo:'',
          plazo:'',
          vin:'',
          contrato_vwfs:'',
          estatus_flotilla:'',
          nombre_usuario:'',
          centro_costos:'',
          nc:'',
          tipo_empleado:'',
          flotilla:'',
          fecha_devolucion: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Pagos VW FS' : 'Actualiza Pagos VW FS'
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
      //this.initialize()
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
                   console.log(documents);

                   let objJsonStr = JSON.stringify(documents);
                   let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
                   console.log("VVVV>>: ",objJsonB64);
                   this.CargaMasiva(objJsonB64)

                }
            reader.readAsBinaryString(this.file);
          }
      },
      async CargaMasiva (objJsonB64) {
         let oUsuario= {
            "modulo":"Pago",
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
      async Flotilla () {
          this.dialog = true
          this.alta = true
          this.updateV = false
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
          try {
              const response = await axios.get(url);
              this.itemFlotilla = response.data.result
              console.log(response.data.result)

          } catch (error) {
              console.error(error);
          }
      },
      async CatSistema () {

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
            try {
                const response = await axios.get(url);
                this.itemConcepto = response.data.result.catalogos.concepto
                //console.log(response.data.result.catalogos.vigencia)

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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pago${params}`
            try {
                console.log(url)
                const response = await axios.get(url);
                this.desserts = response.data.result

            } catch (error) {
                console.error(error);
            }

        }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.alta = false
        this.updateV = true
        this.editedItem.fecha = this.formatDate(this.editedItem.fecha)
        this.editedItem.ini_contrato = this.formatDate(this.editedItem.ini_contrato)
        this.editedItem.fin_contrato = this.formatDate(this.editedItem.fin_contrato)
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
                 "idPayment": this.editedItem.id_payment,
                 "usuarioModif":"1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pago`
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
        var fecha = this.editedItem.fecha + ' ' + hora;

         let oUsuario= {
           "idPayment": this.editedItem.id_payment ,
           "documento": this.editedItem.documento,
           "concepto":this.editedItem.concepto,
           "fecha":fecha,
           "capitalServAd":this.editedItem.capital_serv_ad,
           "interesServAd":this.editedItem.interes_serv_ad,
           "renta":this.editedItem.renta,
           "rentaTotal":this.editedItem.renta_total,
           "estatus": 1,
           "idFlotilla":this.editedItem.id_flotilla,
           "usuarioModif": "1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pago`
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
           fecha = this.editedItem.fecha + ' ' + hora;

         let oUsuario= {
           "documento": this.editedItem.documento,
           "concepto":this.editedItem.concepto,
           "fecha":fecha,
           "capitalServAd":this.editedItem.capital_serv_ad,
           "interesServAd":this.editedItem.interes_serv_ad,
           "renta":this.editedItem.renta,
           "rentaTotal":this.editedItem.renta_total,
           "estatus": 1,
           "idFlotilla":this.editedItem.id_flotilla,
           "usuarioModif": "1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pago`
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