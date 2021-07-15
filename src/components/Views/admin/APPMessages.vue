<template>
 <div id="container-AppMessages">
 <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="AppMessages">
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
     <span class="title">Carga individual </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Codigo" value="codigo" true></v-radio>
        <v-radio   label="Pais" value="pais" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="codigo"  class="elevation-1" >
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
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Perfiles" >
                 <v-icon>mdi-plus</v-icon>
                 Agregar
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar el APP Messages?</v-card-title>
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
                 <v-text-field label="code" :rules="codeRules"  v-model="editedItem.codigo" required ></v-text-field>
               </v-col>
               <v-col  cols="12"  sm="6"  md="8" >
                 <v-text-field label="message" :rules="messageRules"  v-model="editedItem.mensaje" required ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="3"  >
                 <v-text-field  label="locale" :rules="localeRules"   v-model="editedItem.locale"  required ></v-text-field>
               </v-col>
               <v-col  cols="12" sm="6"  md="3" >
                 <v-text-field label="refscreen" required :rules="refscreenRules"   v-model="editedItem.pantalla_referencia"  ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="3"  >
                 <v-text-field  label="msgType"   required :rules="msgTypeRules"   v-model="editedItem.tipo_msg"  ></v-text-field>
               </v-col>
               <v-col cols="12"  sm="6"  md="3"  >
                 <v-text-field  label="country"   required :rules="countryRules"   v-model="editedItem.pais"  ></v-text-field>
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

    </div>
    </div>
 </div>
</template>

<script>
  import axios from 'axios'
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
            text: 'App messages',
            disabled: false
          },
      ],
      dialog: false,
      menu: false,
      alert: false,
      alertError: false,
      validate : false,
      file: null,
      desserts: [],
      itemPerfil: [
         {text: 'clave' , value:'id_rol'},
      ],
      filter: '',
      CampoFilter: 'codigo',
      search: '',
      dialogDelete: false,
      codeRules: [  v => !!v || 'code es requerido' ],
      messageRules: [ v => !!v || 'message es requerido'  ],
      localeRules: [  v => !!v || 'locale es requerido'  ],
      refscreenRules: [  v => !!v || 'refscreen es requerido' ],
      msgTypeRules: [ v => !!v || 'msgType es requerido' ],
      countryRules: [  v => !!v || 'country es requerido' ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Codigo',
          align: 'start',
          sortable: false,
          value: 'codigo',
        },
        { text: 'Mensaje', value: 'mensaje' },
        { text: 'Locale', value: 'locale' },
        { text: 'Pantalla_referencia', value: 'pantalla_referencia' },
        { text: 'Tipo Msg', value: 'tipo_msg' },
        { text: 'País', value: 'pais' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        mensaje: '',
        locale: '',
        pantalla_referencia: '',
        tipo_msg: '',
        pais: '',

      },
      defaultItem: {
         codigo: '',
         mensaje: '',
         locale: '',
         pantalla_referencia: '',
         tipo_msg: '',
         pais: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta de APP Messages' : 'Actualiza APP Messages'
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
            "modulo":"Message",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/message${params}`
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
                 "idMessage": this.editedItem.id_message,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/message`
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

          let oUsuario= {
           "codigo": this.editedItem.codigo ,
           "mensaje": this.editedItem.mensaje,
           "locale":this.editedItem.locale,
           "pantallaRef":this.editedItem.pantalla_referencia,
           "tipoMsg":this.editedItem.tipo_msg,
           "pais":this.editedItem.pais,
           "estatus": 1,
           "usuarioModif": "1",
           "idMessage": this.editedItem.id_message
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/message`
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

          let oUsuario= {
            "codigo": this.editedItem.codigo ,
            "mensaje": this.editedItem.mensaje,
            "locale":this.editedItem.locale,
            "pantallaRef":this.editedItem.pantalla_referencia,
            "tipoMsg":this.editedItem.tipo_msg,
            "pais":this.editedItem.pais,
            "estatus": 1,
            "usuarioModif": "1"
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/message`
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