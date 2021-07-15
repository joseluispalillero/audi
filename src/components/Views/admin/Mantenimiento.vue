<template>
 <div id="container-Mantenimiento">
    <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="Mantenimiento">

    <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
    <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Carga masiva</span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
        <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Carga individual</span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Vin" value="vin"></v-radio>
        <v-radio   label="Folio" value="folio" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="folio"  class="elevation-1" >
         <template v-slot:item.fecha="{ item }">
            {{ formatDate(item.fecha) }}
         </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field   v-model="search"  append-icon="mdi-magnify"   label="Buscar"  single-line  hide-details  ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Flotilla" >
                 <v-icon>mdi-plus</v-icon>
                 Agregar
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar el Servicio de mantenimiento?</v-card-title>
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

    <v-dialog v-model="dialog" persistent max-width="800px" >
          <v-card>
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
           <v-row>
             <v-col  cols="12" sm="6"  md="4" >
               <v-text-field label="Folio" :rules="FolioRules"  v-model="editedItem.folio" required ></v-text-field>
             </v-col>
             <v-col  cols="12"  sm="6"  md="4" v-if="alta"  >
                <v-autocomplete  label="Vin" :items="itemFlotilla"   item-text="vin" item-value="id_flotilla"  required :rules="VINRules" v-model="editedItem.id_flotilla"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
               <v-text-field  label="Modelo"   v-model="editedItem.desc_modelo"  disabled ></v-text-field>
             </v-col>
             <v-col  cols="12" sm="6"  md="4" v-if="updateV" >
               <v-text-field label="Nombre"  v-model="editedItem.nombre_usuario" disabled ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
               <v-text-field  label="Flotilla"   disabled   v-model="editedItem.flotilla"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4" v-if="updateV" >
               <v-text-field  label="Placas"   disabled   v-model="editedItem.placa"  ></v-text-field>
             </v-col>
    <!--    <v-col  cols="12" sm="6"  md="4" >
               <v-autocomplete  label="Vigencia" :items="itemVigencia"   item-text="valor" item-value="valor"  required :rules="VigenciaRules" v-model="editedItem.vigencia"  >  </v-autocomplete>
             </v-col>  -->
             <v-col cols="12"  sm="6"  md="4"  >
               <v-text-field  label="Kilometraje"   required  :rules="KmRules"   v-model="editedItem.km" ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-text-field  label="N. Orden"   required  :rules="OrdenRules"   v-model="editedItem.orden" ></v-text-field>
             </v-col>
             <v-col  cols="12" sm="6"  md="4" >
              <v-text-field label="Fecha" required  :rules="dateFechaRules"   v-model="editedItem.fecha"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="4"  >
               <v-autocomplete  label="Proveedor" :items="itemProveedor"   item-text="valor" item-value="valor"  required :rules="ProveedorRules" v-model="editedItem.proveedor"  >  </v-autocomplete>
             </v-col>
             <v-col cols="12"  sm="6"  md="12"  >
               <v-text-field  label="Descripción"   required  :rules="DescripcionRules"   v-model="editedItem.descripcion" ></v-text-field>
             </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                <v-autocomplete  label="Tipo Clasificación" :items="itemTipoC"   item-text="valor" item-value="valor"  required :rules="TipoRules" v-model="editedItem.clasificacion"  >  </v-autocomplete>
              </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                <v-text-field  label="Cantidad"   required  :rules="CantidadRules"   v-model="editedItem.cantidad" ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                <v-text-field  label="Importe"   required  :rules="ImporteRules"   v-model="editedItem.importe" ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                <v-text-field  label="Materiales"   required  :rules="MaterialesRules"   v-model="editedItem.materiales" ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                <v-text-field  label="Total"   required  :rules="ImporteIvaRules"   v-model="editedItem.importe_iva" ></v-text-field>
              </v-col>
              <v-col cols="12"  sm="6"  md="4"  >
                  <v-autocomplete  label="Tipo Servicio" :items="itemTipoServicio"   item-text="valor" item-value="valor"  required :rules="TServicioRules" v-model="editedItem.tipo_serv"  >  </v-autocomplete>
              </v-col>
              <v-col cols="12"  sm="6"  md="12"  >
                <v-text-field  label="Resumen Servicio"   required  :rules="Resumen_ServicioRules"   v-model="editedItem.resumen_serv" ></v-text-field>
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

       <v-dialog   ref="dialogVigencia"   v-model="dialogVigencia" :return-value.sync="editedItem.vigencia" persistent  width="290px"  >
              <v-date-picker v-model="editedItem.vigencia"  scrollable  >
                <v-spacer></v-spacer>
                <v-btn  text color="primary"  @click="dialogVigencia = false"  > Cancel </v-btn>
                <v-btn text color="primary"  @click="$refs.dialogVigencia.save(editedItem.vigencia)"  >
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
            text: 'Servicios de mantenimiento ',
            disabled: false
          },
      ],
      dialog: false,
      menu: false,
      validate : false,
      alert: false,
      alertError: false,
      file: null,
      desserts: [],
      alta: false,
      updateV: false,
      itemVigencia: [
         {text: 'valor' , value:'valor'},
      ],
      itemProveedor: [
         {text: 'valor' , value:'valor'},
      ],
      itemTipoC: [
         {text: 'valor' , value:'valor'},
      ],
      itemTipoServicio: [
         {text: 'valor' , value:'valor'},
      ],
       itemFlotilla: [
         {text: 'vin' , value:'id_flotilla'},
      ],
      filter: '',
      CampoFilter: 'vin',
      search: '',
      dialogDelete: false,
      FolioRules: [  v => !!v || 'Folio es requerido'  ],
      VINRules: [  v => !!v || 'VIN es requerido' ],
      ModeloRules: [  v => !!v || 'Modelo es requerido' ],
      UsuarioRules: [   v => !!v || 'Usuario es requerido'  ],
      dialogVigencia: false,
      VigenciaRules: [  v => !!v || 'Vigencia es requerido' ],
      dialogFecha: false,
      dateFechaRules: [  v => !!v || 'Fecha es requerido'  ],
      FlotillaRules: [  v => !!v || 'Flotilla es requerido'  ],
      PlacasRules: [  v => !!v || 'Placas es requerido'  ],
      KmRules: [  v => !!v || 'Km es requerido'  ],
      OrdenRules: [  v => !!v || 'Orden es requerido'  ],
      ProveedorRules: [ v => !!v || 'Proveedor es requerido'  ],
      DescripcionRules: [  v => !!v || 'Descripcion es requerido'  ],
      TipoRules: [  v => !!v || 'Tipo C es requerido'  ],
      CantidadRules: [  v => !!v || 'Cantidad es requerido' ],
      ImporteRules: [   v => !!v || 'Importe es requerido'  ],
      MaterialesRules: [  v => !!v || 'Materiales es requerido' ],
      ImporteIvaRules: [ v => !!v || 'Importe + IVA es requerido' ],
      Resumen_ServicioRules: [  v => !!v || 'Resumen Servicio es requerido'   ],
      TServicioRules: [ v => !!v || 'Tipo Servicio es requerido'  ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Folio',
          align: 'start',
          sortable: false,
          value: 'folio',
        },
        { text: 'Vin', value: 'vin' },
        { text: 'Proveedor', value: 'proveedor' },
        { text: 'Resumen Servicio', value: 'resumen_serv' },
        { text: 'Importe', value: 'importe' },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        folio: '',
        vigencia: '',
        orden: '',
        fecha: '',
        proveedor: '',
        descripcion: '',
        clasificacion: '',
        cantidad: '',
        importe: '',
        materiales: '',
        importeIva: '',
        resumenServ: '',
        tipoServ: '',
        Placas: '',
        Km: '',
        idFlotilla: '',
        Usuario: '',
        Modelo: '',
        VIN: '',

      },
      defaultItem: {
         folio: '',
         vigencia: '',
         orden: '',
         fecha: '',
         proveedor: '',
         descripcion: '',
         clasificacion: '',
         cantidad: '',
         importe: '',
         materiales: '',
         importeIva: '',
         resumenServ: '',
         tipoServ: '',
         Placas: '',
         Km: '',
         idFlotilla: '',
         Usuario: '',
         Modelo: '',
         VIN: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta de Servicio de mantenimiento' : 'Actualiza Servicio de mantenimiento'
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
            "modulo":"Mantenimiento",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/mtto${params}`
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
          //this.CatSistema();
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
            this.itemVigencia = response.data.result.catalogos.vigencia
            this.itemProveedor = response.data.result.catalogos.proveedor
            this.itemTipoC = response.data.result.catalogos.tipoClasificacion
            this.itemTipoServicio = response.data.result.catalogos.tipoServicio
            //console.log(response.data.result.catalogos.vigencia)

        } catch (error) {
            console.error(error);
        }
      },
      editItem (item) {
        //this.CatSistema();
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
                 "idMtto": this.editedItem.id_mtto,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/mtto`
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
           "idMtto": this.editedItem.id_mtto ,
           "folio": this.editedItem.folio,
           //"vigencia":this.editedItem.vigencia,
           "orden":this.editedItem.orden,
           "fecha":fecha,
           "km": this.editedItem.km,
           "proveedor":this.editedItem.proveedor,
           "descripcion":this.editedItem.descripcion,
           "clasificacion":this.editedItem.clasificacion,
           "cantidad":this.editedItem.cantidad,
           "importe":this.editedItem.importe,
           "materiales":this.editedItem.materiales,
           "importeIva":this.editedItem.importe_iva,
           "resumenServ":this.editedItem.resumen_serv,
           "tipoServ":this.editedItem.tipo_serv,
           "idFlotilla":this.editedItem.id_flotilla,
           "estatus": 1,
           "usuarioModif": "1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/mtto`
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
           "folio": this.editedItem.folio,
           //"vigencia":this.editedItem.vigencia,
           "orden":this.editedItem.orden,
           "fecha":fecha,
           "km": this.editedItem.km,
           "proveedor":this.editedItem.proveedor,
           "descripcion":this.editedItem.descripcion,
           "clasificacion":this.editedItem.clasificacion,
           "cantidad":this.editedItem.cantidad,
           "importe":this.editedItem.importe,
           "materiales":this.editedItem.materiales,
           "importeIva":this.editedItem.importe_iva,
           "resumenServ":this.editedItem.resumen_serv,
           "tipoServ":this.editedItem.tipo_serv,
           "idFlotilla":this.editedItem.id_flotilla,
           "estatus": 1,
           "usuarioModif": "1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/mtto`
            const headers={
                    "Content-Type":'application/json',
                    "Access-Control-Allow-Credentials": false
            }

            try {
             console.log(oUsuario);
             const response = await axios.post(url,oUsuario,headers);
             console.log(response.data.result);

             this.getseach("vin",this.editedItem.vin)

            } catch (error) {
              console.error(error);
            }
        }
        this.close()

      },
    },
  }
</script>