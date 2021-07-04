<template>
 <div id="container-foto">
    <div class="Foto_multas">

    <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
    <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Cargar archivo de foto multas </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
       <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Foto multas</span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Folio Infracción" value="folio_infraccion" true></v-radio>
        <v-radio   label="Linea" value="linea" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="folio_infraccion"  class="elevation-1" >
        <template v-slot:item.fecha_infraccion="{ item }">
            {{ formatDateHrs(item.fecha_infraccion) }}
         </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field   v-model="search"  append-icon="mdi-magnify"  label="Buscar"   single-line hide-details    ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Flotilla" >
                 <v-icon>mdi-plus</v-icon>
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar foto multas?</v-card-title>
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
            <v-col  cols="12"  sm="6"  md="4" >
              <v-text-field label="Folio Infracción" :rules="Folio_InfracciónRules"  v-model="editedItem.folio_infraccion" required ></v-text-field>
            </v-col>
            <v-col  cols="12"  sm="6"  md="4" >
              <v-text-field label="Fecha Infracción" required :rules="dateInfracciónRules"    v-model="editedItem.fecha_infraccion"   prepend-icon="mdi-calendar"  readonly  @click="dialog1 = true"  ></v-text-field>
            </v-col>
            <v-col  cols="12" sm="6"  md="4" >
              <v-text-field label="Hora Infracción" required :rules="ImporteRules"   v-model="HoraInf"  ></v-text-field>
            </v-col>
            <v-col  cols="12" sm="6"  md="4" >
              <v-text-field label="Importe" required :rules="ImporteRules"   v-model="editedItem.importe"  ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4"  >
              <v-text-field  label="Línea"   required  :rules="LíneaRules"   v-model="editedItem.linea" ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4"  >
              <v-text-field  label="Tipo"   required  :rules="TipoRules"   v-model="editedItem.tipo" ></v-text-field>
            </v-col>
            <v-col  cols="12"  sm="6"  md="4" v-if="alta" >
               <v-autocomplete  label="Placa" :items="itemFlotilla"   item-text="placa" item-value="id_flotilla"  required :rules="PlacaRules" v-model="editedItem.id_flotilla"  >  </v-autocomplete>
            </v-col>
            <v-col  cols="12" sm="6"  md="4" v-if="updateV"  >
              <v-text-field label="Contrato" disabled  v-model="editedItem.contrato_vwfs"  ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"   >
              <v-text-field  label="Vin"   disabled  v-model="editedItem.vin"  ></v-text-field>
            </v-col>
            <v-col  cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field label="Modelo" disabled  v-model="editedItem.desc_modelo"  ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Nombre"   disabled   v-model="editedItem.nombre_usuario" ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Número de empleado"  disabled   v-model="editedItem.nc" ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Centro de Costos"   disabled   v-model="editedItem.centro_costos" ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Tipo Empleado"   disabled  v-model="editedItem.tipo_empleado" ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Flotilla"   disabled  v-model="editedItem.flotilla"  ></v-text-field>
            </v-col>
            <v-col cols="12"  sm="6"  md="4" v-if="updateV"  >
              <v-text-field  label="Fecha devolución"   disabled  v-model="editedItem.fecha_devolucion"  ></v-text-field>
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

      <v-dialog   ref="dialog1"   v-model="dialog1" :return-value.sync="editedItem.fecha_infraccion" persistent  width="290px"  >
          <v-date-picker v-model="editedItem.fecha_infraccion"  scrollable  >
            <v-spacer></v-spacer>
            <v-btn  text color="primary"  @click="dialog1 = false"  > Cancel </v-btn>
            <v-btn text color="primary"  @click="$refs.dialog1.save(editedItem.fecha_infraccion)"  >
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
      alta: false,
      file: null,
      HoraInf:'',
      alert: false,
      alertError: false,
      updateV: false,
      validate : false,
      desserts: [],
      itemFlotilla: [
         {text: 'placa' , value:'id_flotilla'},
      ],
      filter: '',
      CampoFilter: 'folio_infraccion',
      search: '',
      dialogDelete: false,
      ContratoRules: [  v => !!v || 'Contrato es requerido' ],
        Folio_InfracciónRules: [  v => !!v || 'Folio Infracción es requerido'   ],
        dialog1: false,
        dateInfracciónRules: [  v => !!v || 'Fecha Infracción es requerido'  ],
        HoraRules: [   v => !!v || 'Hora Infracción es requerido' ],
        ImporteRules: [    v => !!v || 'Importe es requerido' ],
        PlacaRules: [  v => !!v || 'Placa es requerido'  ],
        SerieRules: [ v => !!v || 'Serie es requerido'  ],
        LíneaRules: [  v => !!v || 'Línea es requerido'  ],
        TipoRules: [ v => !!v || 'Tipo es requerido'  ],
        ModeloRules: [  v => !!v || 'Modelo es requerido'  ],
        NombreRules: [  v => !!v || 'Nombre es requerido'   ],
        NCRules: [  v => !!v || 'NC es requerido'   ],
        CCRules: [  v => !!v || 'CC es requerido'  ],
        Tipo_EmpleadoRules: [  v => !!v || 'Tipo Empleado es requerido'   ],
        FlotillaRules: [   v => !!v || 'Flotilla es requerido'  ],
        Est_FlotillaRules: [ v => !!v || 'Est. Flotilla es requerido' ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Folio Infracción',
          align: 'start',
          sortable: false,
          value: 'folio_infraccion',
        },
        { text: 'Fecha infracción', value: 'fecha_infraccion' },
        { text: 'Importe', value: 'importe' },
        { text: 'Línea', value: 'linea' },
        { text: 'Tipo', value: 'tipo' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        folio_infraccion:'',
        fecha_infraccion:'',
        importe: '',
        linea:'',
        tipo:'',
        id_flotilla:'',
        contrato_vwfs:'',
        vin:'',
        desc_modelo:'',
        nombre_usuario:'',
        nc:'',
        centro_costos:'',
        tipo_empleado:'',
        flotilla:'',
        estatus_flotilla:'',
      },
      defaultItem: {
        folio_infraccion:'',
        fecha_infraccion:'',
        importe: '',
        id_flotilla:'',
        contrato_vwfs:'',
        vin:'',
        linea:'',
        tipo:'',
        desc_modelo:'',
        nombre_usuario:'',
        nc:'',
        centro_costos:'',
        tipo_empleado:'',
        flotilla:'',
        estatus_flotilla:'',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta foto multas' : 'Actualiza foto multas'
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
     // this.initialize()
    },

    methods: {
      CargaDatosR : function () {
          this.$router.push({ path: '/admin/cargadatos' })
      },
      formatDateHrs(value) {
          return moment(value).format("DD-MM-YYYY HH:mm:ss")
      },
      formatDate(value) {
          return moment(value).format("YYYY-MM-DD")
      },
      formatHrs(value) {
          return moment(value).format("HH:mm:ss")
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
              "modulo":"Multa",
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
      async getseach (campoFilter,search) {
        if(search == ''){
            console.log('No hay datos')
        }else{
            console.log(campoFilter , search)
            let busqueda={campoFilter : search}

            let params = '';
            if (typeof busqueda !== 'undefined' && busqueda !== null  )
               params= params.concat(`?${campoFilter}=${busqueda.campoFilter}`);

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/multa${params}`
            try {
                console.log(url)
                const response = await axios.get(url);
                this.desserts = response.data.result

            } catch (error) {
                console.error(error);
            }

        }
      },
      async Flotilla () {
        this.dialog = true
        this.alta = true
        this.updateV = false
        this.HoraInf=''
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
        try {
            const response = await axios.get(url);
            this.itemFlotilla = response.data.result
            console.log(response.data.result)

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
        this.HoraInf = this.formatHrs(this.editedItem.fecha_infraccion)
        this.editedItem.fecha_infraccion = this.formatDate(this.editedItem.fecha_infraccion)
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
                 "idMulta": this.editedItem.id_multa,
                  "usuarioModif":"1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/multa`
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

          /*var fe = new Date();
          var hora  = fe.getHours() + ':' + fe.getMinutes() + ':' + fe.getSeconds();
          */
          var fecha = this.editedItem.fecha_infraccion + ' ' + this.HoraInf;
           console.log(fecha)
          let oUsuario= {
           "idMulta": this.editedItem.id_multa ,
           "folioInfraccion": this.editedItem.folio_infraccion,
           "fechaInfraccion":fecha,
           "importe":this.editedItem.importe,
           "linea":this.editedItem.linea,
           "tipo":this.editedItem.tipo,
           "idFlotilla":this.editedItem.id_flotilla,
           "estatus": 1,
           "usuarioModif":"1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/multa`
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

           /*fe = new Date();
           hora  = fe.getHours() + ':' + fe.getMinutes() + ':' + fe.getSeconds();*/
           fecha = this.editedItem.fecha_infraccion + ' ' + this.HoraInf;
           console.log(fecha)

          let oUsuario= {
             "folioInfraccion": this.editedItem.folio_infraccion,
             "fechaInfraccion":fecha,
             "importe":this.editedItem.importe,
             "linea":this.editedItem.linea,
             "tipo":this.editedItem.tipo,
             "idFlotilla":this.editedItem.id_flotilla,
             "estatus": 1,
             "usuarioModif":"1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/multa`
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