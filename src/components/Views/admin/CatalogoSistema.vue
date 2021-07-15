<template>
 <div id="container-CatalogoSistema">
   <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="CatalogoSistema">

    <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
    <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Carga masiva</span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload"  >   Cargar </v-btn>
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
           <v-radio label="Code" value="code" true></v-radio>
           <v-radio label="Id" value="id" ></v-radio>
        </v-radio-group>
        </div>

    <div class="formulario">
        <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="empleado"  class="elevation-1"  >
            <template v-slot:item.fecha_ini="{ item }">
                  {{ formatDate(item.fecha_ini) }}
             </template>
             <template v-slot:item.fecha_fin="{ item }">
                   {{ formatDate(item.fecha_fin) }}
              </template>
             <template v-slot:top>
               <v-toolbar flat >
                 <v-text-field v-model="search"  append-icon="mdi-magnify"  label="Buscar"  single-line hide-details ></v-text-field>
                       <v-spacer></v-spacer>
                 <v-btn class="btn-add"  color="#f50537"   v-on:click="dialog = true" >
                     <v-icon>mdi-plus</v-icon>
                     Agregar
                  </v-btn>
                 <v-dialog v-model="dialogDelete" max-width="500px">
                   <v-card>
                     <v-card-title class="headline">Estás seguro de eliminar el Catálogo del sistema?</v-card-title>
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
         <v-dialog v-model="dialog" persistent max-width="600px" >
          <v-card>
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                   <v-col  cols="12" sm="6"  md="4" >
                     <v-text-field label="Code" :rules="codeRules"  v-model="editedItem.codigo" required ></v-text-field>
                   </v-col>
                   <v-col  cols="12"  sm="6"  md="4" >
                     <v-text-field label="Id" :rules="idRules"  v-model="editedItem.id" required ></v-text-field>
                   </v-col>
                   <v-col cols="12"  sm="6"  md="4"  >
                     <v-text-field  label="Value" :rules="valueRules"   v-model="editedItem.valor"  required ></v-text-field>
                   </v-col>
                    <v-col cols="12"  sm="6"  md="4"  >
                      <v-text-field label="Begda" required  :rules="begdaRules"   v-model="editedItem.fecha_ini"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="6"  md="4"  >
                      <v-text-field label="Endda" required  :rules="enddaRules"   v-model="editedItem.fecha_fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogContrato = true"  ></v-text-field>
                    </v-col>
                   <v-col cols="12"  sm="6"  md="4"  >
                     <v-text-field  label="Locale"   required :rules="LocaleRules"   v-model="editedItem.locale"  ></v-text-field>
                   </v-col>
                   <v-col cols="12"  sm="6"  md="12"  >
                     <v-text-field  label="Refscreen"   required :rules="RefscreenRules"   v-model="editedItem.pantalla_referencia"  ></v-text-field>
                   </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn  color="#f50537"  text  @click="close" >  Cerrar  </v-btn>
              <v-btn color="#f50537" text  @click="save"  >  Guardar  </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

         <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="editedItem.fecha_ini" persistent  width="290px"  >
            <v-date-picker v-model="editedItem.fecha_ini"  scrollable  >
              <v-spacer></v-spacer>
              <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancel </v-btn>
              <v-btn text color="primary"  @click="$refs.dialogFecha.save(editedItem.fecha_ini)"  >
                OK
              </v-btn>
            </v-date-picker>
        </v-dialog>
        <v-dialog   ref="dialogContrato"   v-model="dialogContrato" :return-value.sync="editedItem.fecha_fin" persistent  width="290px"  >
            <v-date-picker v-model="editedItem.fecha_fin"  scrollable  >
              <v-spacer></v-spacer>
              <v-btn  text color="primary"  @click="dialogContrato = false"  > Cancel </v-btn>
              <v-btn text color="primary"  @click="$refs.dialogContrato.save(editedItem.fecha_fin)"  >
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
            text: 'Catálogo sistemas',
            disabled: false
          },
      ],
      dialog: false,
      file: null,
      filter: '',
      alert: false,
      alertError: false,
      CampoFilter: 'id',
      search: '',
      selected: [],
      dialogDelete: false,
      codeRules: [  v => !!v || 'code es requerido' ],
      idRules: [ v => !!v || 'id es requerido'  ],
      valueRules: [  v => !!v || 'value es requerido'  ],
      begdaRules: [  v => !!v || 'begda es requerido' ],
      dialogFecha: false,
      dialogContrato: false,
      enddaRules: [  v => !!v || 'endda es requerido'  ],
      LocaleRules: [ v => !!v || 'Locale es requerido' ],
      RefscreenRules: [  v => !!v || 'Refscreen es requerido' ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Code',
          align: 'start',
          sortable: false,
          value: 'codigo',
        },
        { text: 'Id', value: 'id' },
        { text: 'Value', value: 'valor' },
        { text: 'Begda', value: 'fecha_ini' },
        { text: 'Endda', value: 'fecha_fin' },
        { text: 'Locale', value: 'locale' },
        { text: 'Refscreen', value: 'pantalla_referencia' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        id: '',
        valor: '',
        fecha_ini: '',
        fecha_fin: '',
        locale: '',
        pantalla_referencia: '',
      },
      defaultItem: {
        codigo: '',
        id: '',
        valor: '',
        fecha_ini: '',
        fecha_fin: '',
        locale: '',
        pantalla_referencia: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Catálogo del sistema' : 'Actualiza Catálogo del sistema'
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
    },

    methods: {
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
            "modulo":"Catálogo",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catalogo${params}`
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
        this.editedItem.fecha_ini = this.formatDate(this.editedItem.fecha_ini)
        this.editedItem.fecha_fin = this.formatDate(this.editedItem.fecha_fin)
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        let oUsuario= {
            data:{
                 "idCatalogo": this.editedItem.id_catalogo,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catalogo`
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
          var fechaIn = this.editedItem.fecha_ini + ' ' + hora;
          var fechaFn = this.editedItem.fecha_fin + ' ' + hora;

          let oUsuario= {
           "codigo": this.editedItem.codigo ,
           "id": this.editedItem.id,
           "valor":this.editedItem.valor,
           "locale":this.editedItem.locale,
           "pantallaRef":this.editedItem.pantalla_referencia,
           "fechaIni": fechaIn  ,
           "fechaFin": fechaFn ,
           "estatus": 1,
           "idCatalogo": this.editedItem.id_catalogo,
           "usuarioModif": 1
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catalogo`
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

          var fe2 = new Date();
          var hora2  = fe2.getHours() + ':' + fe2.getMinutes() + ':' + fe2.getSeconds();
          var fechaIn2 = this.editedItem.fecha_ini + ' ' + hora2;
          var fechaFn2 = this.editedItem.fecha_fin + ' ' + hora2;
          console.log(fechaIn2);

          let oUsuario= {
            "codigo": this.editedItem.codigo ,
            "id": this.editedItem.id,
            "valor":this.editedItem.valor,
            "locale":this.editedItem.locale,
            "pantallaRef":this.editedItem.pantalla_referencia,
            "fechaIni": fechaIn2  ,
            "fechaFin": fechaFn2 ,
            "estatus": "1",
            "usuarioModif": "1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catalogo`
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