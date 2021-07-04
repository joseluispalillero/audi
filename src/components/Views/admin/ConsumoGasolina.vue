<template>
 <div id="container-ConsumoGasolina">
    <div class="ConsumoGasolina">
        <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
        <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>
    <div class="load">
        <span class="title"> Cargar archivo de Consumo de gasolina </span>
          <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
         <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title"> Consumo de gasolina </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Folio" value="folioOperacion" true></v-radio>
        <v-radio   label="Rfc" value="rfc" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
          <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="folioOperacion"  class="elevation-1" >
             <template v-slot:item.fecha="{ item }">
                  {{ formatDate(item.fecha) }}
             </template>
             <template v-slot:top>
               <v-toolbar flat >
                 <v-text-field    v-model="search" append-icon="mdi-magnify"  label="Buscar"  single-line  hide-details  ></v-text-field>
                       <v-spacer></v-spacer>
                 <v-btn class="btn-add"  color="#f50537"   v-on:click="TarjetaGasolina" >
                     <v-icon>mdi-plus</v-icon>
                  </v-btn>
                 <v-dialog v-model="dialogDelete" max-width="650px">
                   <v-card>
                     <v-card-title class="headline">Estás seguro de eliminar este Consumo de gasolina?</v-card-title>
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

        <v-dialog v-model="dialog" persistent max-width="700px" >
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                     <v-row>
                      <v-col  cols="12" sm="6"  md="4" >
                         <v-autocomplete  label="Número Tarjeta" :items="itemTarjeta"   item-text="num_tarjeta" item-value="id_fuel"  required :rules="TarjetaRules" v-model="editedItem.id_fuel"  >  </v-autocomplete>
                       </v-col>
                       <v-col  cols="12" sm="6"  md="4" >
                        <v-text-field label="Fecha" required  :rules="dateFechaRules"   v-model="editedItem.fecha"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Movimiento" :rules="MovimientoRules"   v-model="editedItem.movimiento"  required ></v-text-field>
                       </v-col>
                       <v-col  cols="12" sm="6"  md="4" >
                         <v-text-field label="Abono" required :rules="AbonoRules"   v-model="editedItem.abono"  ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Cargo"   required :rules="CargoRules"   v-model="editedItem.cargo"  ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Precio Unitario"   required :rules="Precio_UnitarioRules"   v-model="editedItem.precio_unit"  ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Importe"   required  :rules="ImporteRules"   v-model="editedItem.importe" ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Consumo"   required  :rules="ConsumoRules"   v-model="editedItem.consumo" ></v-text-field>
                       </v-col>
                        <v-col cols="12"  sm="6"  md="4"  >
                          <v-text-field  label="IEPS"   required  :rules="IEPSRules"   v-model="editedItem.ieps" ></v-text-field>
                        </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="IVA"   required  :rules="IVARules"   v-model="editedItem.iva" ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Litros"   required  :rules="LitrosRules"   v-model="editedItem.litros" ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="Folio Operación"   required  :rules="FolioRules"   v-model="editedItem.folio_operacion" ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="4"  >
                         <v-text-field  label="RFC"   required  :rules="RFCRules"   v-model="editedItem.rfc" ></v-text-field>
                       </v-col>
                       <v-col cols="12"  sm="6"  md="8"  >
                         <v-text-field  label="Descripción"   required  :rules="DescripcionRules"   v-model="editedItem.descripcion" ></v-text-field>
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

          <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="editedItem.fecha" persistent  width="290px"  >
               <v-date-picker v-model="editedItem.fecha"  scrollable  >
                 <v-spacer></v-spacer>
                 <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancel </v-btn>
                 <v-btn text color="primary"  @click="$refs.dialogFecha.save(editedItem.fecha)"  >
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
      alert: false,
      alertError: false,
      validate : false,
      file: null,
      desserts: [],
      itemTarjeta: [
         {text: 'num_tarjeta' , value:'id_fuel'},
      ],
      filter: '',
      CampoFilter: 'folioOperacion',
      search: '',
      dialogDelete: false,
      TarjetaRules: [  v => !!v || 'Tarjeta es requerido'  ],
      HoraRules: [ v => !!v || 'Hora es requerido' ],
      MovimientoRules: [  v => !!v || 'Movimiento es requerido' ],
      AbonoRules: [  v => !!v || 'Abono es requerido' ],
      dialogFecha: false,
      dateFechaRules: [  v => !!v || 'Fecha es requerido' ],
      CargoRules: [  v => !!v || 'Cargo es requerido' ],
      Precio_UnitarioRules: [ v => !!v || 'Precio Unitario es requerido' ],
      ImporteRules: [  v => !!v || 'Importe es requerido'  ],
      ConsumoRules: [ v => !!v || 'Consumo es requerido'  ],
      IEPSRules: [ v => !!v || 'IEPS es requerido'   ],
      IVARules: [  v => !!v || 'IVA es requerido'  ],
      LitrosRules: [  v => !!v || 'Litros es requerido'  ],
      FolioRules: [   v => !!v || 'Folio es requerido'  ],
      RFCRules: [ v => !!v || 'RFC es requerido'  ],
      DescripcionRules: [  v => !!v || 'Descripcion es requerido'  ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Folio',
          align: 'start',
          sortable: false,
          value: 'folio_operacion',
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Movimiento', value: 'movimiento' },
        { text: 'Rfc', value: 'rfc' },
        { text: 'Importe', value: 'importe' },
        { text: 'Litros', value: 'litros' },
        { text: 'Ieps', value: 'ieps' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        fecha: '',
        movimiento: '',
        abono: '',
        cargo: '',
        precio_unit: '',
        importe: '',
        consumo: '',
        ieps : '',
        iva : '',
        litros : '',
        folio_operacion : '',
        rfc : '',
        descripcion : '',
        id_fuel: '',
        dateFecha: '',
        hora: '',
      },
      defaultItem: {
         fecha: '',
         movimiento: '',
         abono: '',
         cargo: '',
         precio_unit: '',
         importe: '',
         consumo: '',
         ieps : '',
         iva : '',
         litros : '',
         folio_operacion : '',
         rfc : '',
         descripcion : '',
         id_fuel: '',
         dateFecha: '',
         hora: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Consumo de gasolina' : 'Actualiza Consumo de gasolina'
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
    //  this.initialize()
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
            "modulo":"Consumo de Gasolina",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/consumogasolina${params}`
            try {
                console.log(url)
                const response = await axios.get(url);
                this.desserts = response.data.result

            } catch (error) {
                console.error(error);
            }

        }
      },
      async TarjetaGasolina () {
            this.dialog = true

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/tarjetagasolina`
            try {
                const response = await axios.get(url);
                this.itemTarjeta = response.data.result
                console.log(response.data.result)

            } catch (error) {
                console.error(error);
            }
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.TarjetaGasolina()
        this.editedItem.fecha = this.formatDate(this.editedItem.fecha)
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
                 "idFuelConsum": this.editedItem.id_fuel_consum,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/consumogasolina`
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
          "fecha": fecha,
          "movimiento": this.editedItem.movimiento,
          "abono": this.editedItem.abono,
          "cargo": this.editedItem.cargo,
          "precioUnit": this.editedItem.precio_unit,
          "importe": this.editedItem.importe,
          "consumo": this.editedItem.consumo,
          "ieps": this.editedItem.ieps,
          "iva": this.editedItem.iva,
          "litros": this.editedItem.litros,
          "folioOperacion": this.editedItem.folio_operacion,
          "rfc": this.editedItem.rfc,
          "descripcion": this.editedItem.descripcion,
          "estatus": "1",
          "idFuel": this.editedItem.id_fuel,
          "idFuelConsum": this.editedItem.id_fuel_consum,
          "usuarioModif": "1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/consumogasolina`
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
             "fecha": fecha,
             "movimiento": this.editedItem.movimiento,
             "abono": this.editedItem.abono,
             "cargo": this.editedItem.cargo,
             "precioUnit": this.editedItem.precio_unit,
             "importe": this.editedItem.importe,
             "consumo": this.editedItem.consumo,
             "ieps": this.editedItem.ieps,
             "iva": this.editedItem.iva,
             "litros": this.editedItem.litros,
             "folioOperacion": this.editedItem.folio_operacion,
             "rfc": this.editedItem.rfc,
             "descripcion": this.editedItem.descripcion,
             "estatus": "1",
             "idFuel": this.editedItem.id_fuel,
             "usuarioModif": "1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/consumogasolina`
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