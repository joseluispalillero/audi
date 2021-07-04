<template>
 <div id="container-AppSettings">
    <div class="AppSettings">
        <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
        <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>
    <div class="load">
        <span class="title"> Cargar archivo de APP Settings </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
        <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
         <span class="title">APP Settings </span>
         <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
             <v-icon>mdi-magnify</v-icon>
         </v-btn>
         <div class="filter">
             <v-radio-group  v-model="CampoFilter"  row >
                <v-radio label="Nombre" value="nombre_valor" true></v-radio>
                <v-radio   label="Valor" value="valor" ></v-radio>
             </v-radio-group>
     </div>

     <div class="formulario">
          <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="nombre_valor"  class="elevation-1" >
             <template v-slot:item.fecha_ini="{ item }">
                  {{ formatDate(item.fecha_ini) }}
             </template>
             <template v-slot:item.fecha_fin="{ item }">
                   {{ formatDate(item.fecha_fin) }}
              </template>
             <template v-slot:top>
               <v-toolbar flat >
                 <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Buscar" single-line  hide-details  ></v-text-field>
                 <v-spacer></v-spacer>
                 <v-btn class="btn-add"  color="#f50537"   v-on:click="Perfiles" >
                     <v-icon>mdi-plus</v-icon>
                  </v-btn>
                 <v-dialog v-model="dialogDelete" max-width="650px">
                   <v-card>
                     <v-card-title class="headline">Estás seguro de eliminar el APP Settings?</v-card-title>
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
             <v-col  cols="12" sm="6"  md="6" >
               <v-text-field label="description" :rules="descriptionRules"  v-model="editedItem.descripcion" required ></v-text-field>
             </v-col>
             <v-col  cols="12"  sm="6"  md="6" >
               <v-text-field label="valueName" :rules="valueNameRules"  v-model="editedItem.nombre_valor" required ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="3"  >
               <v-text-field  label="value" :rules="valueRules"   v-model="editedItem.valor"  required ></v-text-field>
             </v-col>
             <v-col  cols="12" sm="6"  md="3" >
               <v-text-field label="valueType" required :rules="valueTypeRules"   v-model="editedItem.tipo_valor"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="3"  >
               <v-text-field label="begda" required  :rules="begdaRules"   v-model="editedItem.fecha_ini"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
             </v-col>
             <v-col cols="12"  sm="6"  md="3"  >
               <v-text-field label="endda" required  :rules="enddaRules"   v-model="editedItem.fecha_fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogContrato = true"  ></v-text-field>
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

  export default {
    data: () => ({
      dialog: false,
      menu: false,
      validate : false,
      alert: false,
      alertError: false,
      desserts: [],
      itemPerfil: [
         {text: 'clave' , value:'id_rol'},
      ],
      filter: '',
      file: null,
      CampoFilter: 'nombre_valor',
      search: '',
      dialogDelete: false,
      descriptionRules: [  v => !!v || 'description es requerido'  ],
      valueNameRules: [  v => !!v || 'valueName es requerido' ],
      valueRules: [  v => !!v || 'value es requerido' ],
      valueTypeRules: [   v => !!v || 'valueType es requerido' ],
      begdaRules: [  v => !!v || 'begda es requerido' ],
      dialogFecha: false,
      dialogContrato: false,
      enddaRules: [  v => !!v || 'endda es requerido'  ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Descripcion',
          align: 'start',
          sortable: false,
          value: 'descripcion',
        },
        { text: 'Nombre valor', value: 'nombre_valor' },
        { text: 'Valor', value: 'valor' },
        { text: 'Tipo valor', value: 'tipo_valor' },
        { text: 'Begda', value: 'fecha_ini' },
        { text: 'Endda', value: 'fecha_fin' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        descripcion: '',
        nombre_valor: '',
        valor: '',
        tipo_valor: '',
        fecha_ini: '',
        fecha_fin: '',

      },
      defaultItem: {
         descripcion: '',
         nombre_valor: '',
         valor: '',
         tipo_valor: '',
         fecha_ini: '',
         fecha_fin: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta de APP Settings' : 'Actualiza APP Settings'
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
            "modulo":"Setting",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/setting${params}`
            try {
                console.log(url)
                const response = await axios.get(url);
                this.desserts = response.data.result

            } catch (error) {
                console.error(error);
            }

        }
      },
      async Perfiles () {
       this.dialog = true
      },
      editItem (item) {
        this.Perfiles();
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        //this.dialog = true
        this.validate= true
        this.editedItem.fecha_ini = this.formatDate(this.editedItem.fecha_ini)
        this.editedItem.fecha_fin = this.formatDate(this.editedItem.fecha_fin)
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
                 "idSetting": this.editedItem.id_setting,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/setting`
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
           "descripcion": this.editedItem.descripcion ,
           "nombreValor": this.editedItem.nombre_valor,
           "valor":this.editedItem.valor,
           "tipoValor":this.editedItem.tipo_valor,
           "fechaIni":fechaIn,
           "fechaFin":fechaFn,
           "estatus": 1,
           "idSetting": this.editedItem.id_setting,
           "usuarioModif": "1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/setting`
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
           fechaIn = this.editedItem.fecha_ini + ' ' + hora;
           fechaFn = this.editedItem.fecha_fin + ' ' + hora;
          console.log(fechaIn);

          let oUsuario= {
            "descripcion": this.editedItem.descripcion ,
            "nombreValor": this.editedItem.nombre_valor,
            "valor":this.editedItem.valor,
            "tipoValor":this.editedItem.tipo_valor,
            "fechaIni": fechaIn  ,
            "fechaFin": fechaFn ,
            "estatus": 1,
            "usuarioModif": "1"
            };

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/setting`
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