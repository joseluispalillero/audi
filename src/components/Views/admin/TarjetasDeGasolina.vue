<template>
 <div id="container-Gasolina">
    <div class="Gasolina">

        <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
        <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Cargar archivo de Tarjeta de gasolina </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
       <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Tarjeta de gasolina </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Iut" value="iut" true></v-radio>
        <v-radio label="Número Tarjeta" value="num_tarjeta" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="num_tarjeta"  class="elevation-1" >
         <template v-slot:item.fecha="{ item }">
            {{ formatDate(item.fecha) }}
         </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field   v-model="search" append-icon="mdi-magnify"  label="Buscar" single-line  hide-details ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Flotilla" >
                 <v-icon>mdi-plus</v-icon>
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar Tarjeta de gasolina?</v-card-title>
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
               <v-text-field label="IUT" :rules="IUTRules"  v-model="editedItem.iut" required ></v-text-field>
             </v-col>
             <v-col  cols="12"  sm="6"  md="4" >
               <v-text-field label="Número Tarjeta" :rules="TarjetaRules"  v-model="editedItem.num_tarjeta" required ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-text-field  label="Nombre" :rules="NombreRules"   v-model="editedItem.nombre_tarjetahabiente"  required ></v-text-field>
             </v-col>
             <v-col  cols="12" sm="6"  md="4" >
               <v-text-field label="Número identificador" required :rules="NoRules"   v-model="editedItem.num"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Tipo tarjeta" :items="itemTipoTarjeta"   item-text="valor" item-value="valor"  required :rules="TTarjetaRules" v-model="editedItem.tipo_tarjeta"  >  </v-autocomplete>
             </v-col>
             <v-col  cols="12" sm="6"  md="4" >
              <v-text-field label="Fecha asignación" required  :rules="dateFechaRules"   v-model="editedItem.fecha"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="alta"  >
               <v-autocomplete  label="Placa" :items="itemFlotilla"   item-text="placa" item-value="id_flotilla"  required :rules="PlacasRules" v-model="editedItem.id_flotilla"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-text-field  label="Identificación"   required  :rules="IdentificacionRules"   v-model="editedItem.identificacion" ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-text-field  label="NIP"   required  :rules="NIPRules"   v-model="editedItem.nip" ></v-text-field>
             </v-col>
              <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
             <v-text-field  label="Número de empleado"   disabled   v-model="editedItem.nc" ></v-text-field>

              </v-col>
             <v-col cols="12"  sm="6"  md="4"  v-if="updateV" >
               <v-text-field  label="Responsable"   disabled  v-model="editedItem.nombre_usuario" ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
              <v-text-field  label="flotilla"   disabled   v-model="editedItem.flotilla" ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
                <v-autocomplete  label="Estatus" :items="itemEstatus"   item-text="valor" item-value="id"  required :rules="StatusRules" v-model="editedItem.estatus"  >  </v-autocomplete>
             </v-col>
           <v-col cols="12"  sm="6"  md="4" v-if="alta" >
                <v-autocomplete  label="NC" :items="itemUser"   item-text="nc" item-value="id_usuario"  required :rules="NCRules" v-model="editedItem.id_usuario"  >  </v-autocomplete>
             </v-col>

             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Combustible" :items="itemCombustible"   item-text="valor" item-value="valor"  required :rules="CombustibleRules" v-model="editedItem.combustible"  >  </v-autocomplete>
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
      alta: false,
      alert: false,
      alertError: false,
      updateV: false,
      file: null,
      validate : false,
      desserts: [],
      itemTipoTarjeta: [
         {text: 'valor' , value:'valor'},
      ],
      itemClasificacion: [
         {text: 'valor' , value:'valor'},
      ],
      itemEstatus: [
         {text: 'valor' , value:'id'},
      ],
      itemCombustible: [
         {text: 'valor' , value:'valor'},
      ],
      itemFlotilla: [
         {text: 'placa' , value:'id_flotilla'},
      ],
      itemUser: [
         {text: 'nc' , value:'id_usuario'},
      ],
      filter: '',
      CampoFilter: 'num_tarjeta',
      search: '',
      dialogDelete: false,
      IUTRules: [  v => !!v || 'IUT es requerido'   ],
      TarjetaRules: [  v => !!v || 'Número Tarjeta es requerido'   ],
      NombreRules: [  v => !!v || 'Nombre es requerido'   ],
      NoRules: [  v => !!v || 'No. es requerido'   ],
      dialogFecha: false,
      dateFechaRules: [   v => !!v || 'Fecha es requerido'   ],
      TTarjetaRules: [  v => !!v || 'Tipo Tarjeta es requerido'   ],
      PlacasRules: [  v => !!v || 'Placas es requerido'  ],
      IdentificacionRules: [  v => !!v || 'Identificacion es requerido'   ],
      NIPRules: [  v => !!v || 'NIP es requerido'   ],
      NCRules: [   v => !!v || 'NC es requerido'   ],
      ClasificacionRules: [   v => !!v || 'Clasificacion es requerido'   ],
      ResponsableRules: [  v => !!v || 'Responsable es requerido'  ],
      StatusRules: [  v => !!v || 'Status es requerido'   ],
      CombustibleRules: [  v => !!v || 'Combustible es requerido'  ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Iut',
          align: 'start',
          sortable: false,
          value: 'iut',
        },
        { text: 'Número tarjeta', value: 'num_tarjeta' },
        { text: 'Nombre tarjeta', value: 'nombre_tarjetahabiente' },
        { text: 'Número identificador', value: 'num' },
        { text: 'Tipo tarjeta', value: 'tipo_tarjeta' },
        { text: 'Fecha asignación', value: 'fecha' },
        { text: 'Combustible', value: 'combustible' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        iut: '',
        num_tarjeta: '',
        nombre_tarjetahabiente: '',
        num: '',
        tipo_tarjeta: '',
        fecha: '',
        identificacion: '',
        nip: '',
        estatus: '',
        tipo: '',
        Placas: '',
        NC: '',
        Responsable: '',
        combustible: '',


      },
      defaultItem: {
        iut: '',
        num_tarjeta: '',
        nombre_tarjetahabiente: '',
        num: '',
        tipo_tarjeta: '',
        fecha: '',
        identificacion: '',
        nip: '',
        estatus: '',
        tipo: '',
        Placas: '',
        NC: '',
        Responsable: '',
        combustible: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Tarjeta de gasolina' : 'Actualiza Tarjeta de gasolina'
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
      this.Usuarios()
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
            "modulo":"Tarjeta de Gasolina",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/tarjetagasolina${params}`
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
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/flotilla`
        try {
            const response = await axios.get(url);
            this.itemFlotilla = response.data.result
            console.log(response.data.result)

        } catch (error) {
            console.error(error);
        }
      },
      async Usuarios () {
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario`
          try {
              const response = await axios.get(url);
              this.itemUser = response.data.result
              console.log(response.data.result)

          } catch (error) {
              console.error(error);
          }
      },
      async CatSistema () {

          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
          try {
              const response = await axios.get(url);
              this.itemTipoTarjeta = response.data.result.catalogos.tipoTarjeta
              this.itemClasificacion = response.data.result.catalogos.clasificacion
              this.itemEstatus = response.data.result.catalogos.estatus
              this.itemCombustible = response.data.result.catalogos.combustible
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
                 "idFuel": this.editedItem.id_fuel,
                 "usuarioModif":"1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/tarjetagasolina`
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
           "idFuel": this.editedItem.id_fuel ,
           "iut": this.editedItem.iut,
           "numTarjeta":this.editedItem.num_tarjeta,
           "nombreTarjetahabiente":this.editedItem.nombre_tarjetahabiente,
           "num":this.editedItem.num,
           "tipoTarjeta":this.editedItem.tipo_tarjeta,
           "fechaAsignacion":fecha,
           "identificacion":this.editedItem.identificacion,
           "nip":this.editedItem.nip,
           "combustible":this.editedItem.combustible,
           "idFlotilla":this.editedItem.id_flotilla,
           "estatus": 1,
           "idUsuario": this.editedItem.id_usuario,
           "usuarioModif":"1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/tarjetagasolina`
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

           console.log('id usuario' , this.editedItem.id_usuario)

          let oUsuario= {
           "iut": this.editedItem.iut,
           "numTarjeta":this.editedItem.num_tarjeta,
           "nombreTarjetahabiente":this.editedItem.nombre_tarjetahabiente,
           "num":this.editedItem.num,
           "tipoTarjeta":this.editedItem.tipo_tarjeta,
           "fechaAsignacion":fecha,
           "identificacion":this.editedItem.identificacion,
           "nip":this.editedItem.nip,
           "combustible":this.editedItem.combustible,
           "idFlotilla":this.editedItem.id_flotilla,
           "estatus": 1,
           "idUsuario": this.editedItem.id_usuario,
           "usuarioModif":"1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/tarjetagasolina`
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