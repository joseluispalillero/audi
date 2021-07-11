<template>
 <div id="container-verificaciones">
   <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="verificaciones">

        <v-alert type="success" v-model="alert" dismissible  elevation="2"  >  Carga de archivo exitoso </v-alert>
        <v-alert type="error" v-model="alertError" dismissible  elevation="2"  > Validar archivo Cargado </v-alert>

    <div class="load">
        <span class="title"> Cargar archivo de Verificaciones </span>
         <v-file-input label="Cargar Archivo" outlined v-model="file" id="file"  accept=".xlsx"   dense ></v-file-input>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="onUpload" >   Cargar </v-btn>
         <v-btn class="btn-return" color="#f50537"  v-on:click="CargaDatosR" >   Regresar </v-btn>
    </div>

    <v-divider class="divider-form" ></v-divider>

     <div class="load-seach">
     <span class="title">Verificaciones </span>
     <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
     <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
         <v-icon>mdi-magnify</v-icon>
     </v-btn>
     <div class="filter">
     <v-radio-group  v-model="CampoFilter"  row >
        <v-radio label="Vin" value="vin" true></v-radio>
        <v-radio   label="Placa" value="placa" ></v-radio>
     </v-radio-group>
     </div>

     <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="vin"  class="elevation-1" >
         <template v-slot:item.fin_verificacion="{ item }">
              {{ formatDate(item.fin_verificacion) }}
         </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field  v-model="search"  append-icon="mdi-magnify" label="Buscar" single-line  hide-details  ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"   v-on:click="Flotilla" >
                 <v-icon>mdi-plus</v-icon>
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="650px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar la Verificacion?</v-card-title>
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
                <v-col cols="12"  sm="6"  md="8"  >
                  <v-text-field  label="Verificación"   required :rules="VerificacionRules"   v-model="editedItem.verificacion"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                 <v-text-field label="Fin Verificación" required  :rules="dateFechaRules"   v-model="editedItem.fin_verificacion"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="12" v-if="alta" >
                  <v-autocomplete  label="Vin" :items="itemFlotilla"   item-text="vin" item-value="id_flotilla"  required :rules="VINRules" v-model="editedItem.id_flotilla"  >  </v-autocomplete>
                </v-col>
                <v-col  cols="12"  sm="6"  md="6" v-if="updateV" >
                  <v-text-field label="Auto" :rules="AutoRules"  v-model="editedItem.auto" disabled ></v-text-field>
                </v-col>
                <v-col cols="12"  sm="6"  md="6" v-if="updateV" >
                  <v-text-field  label="MY" :rules="MYRules"   v-model="editedItem.my"  disabled ></v-text-field>
                </v-col>
                 <v-col  cols="12" sm="6"  md="12" v-if="updateV" >
                  <v-text-field label="Descripción extendida de modelo" disabled :rules="modeloRules"   v-model="editedItem.desc_modelo"  ></v-text-field>
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

       <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="editedItem.fin_verificacion" persistent  width="290px"  >
            <v-date-picker v-model="editedItem.fin_verificacion"  scrollable  >
              <v-spacer></v-spacer>
              <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancel </v-btn>
              <v-btn text color="primary"  @click="$refs.dialogFecha.save(editedItem.fin_verificacion)"  >
                OK
              </v-btn>
            </v-date-picker>
       </v-dialog>
       <v-dialog   ref="dialogContrato"   v-model="dialogContrato" :return-value.sync="editedItem.dateContrato" persistent  width="290px"  >
            <v-date-picker v-model="editedItem.dateContrato"  scrollable  >
              <v-spacer></v-spacer>
              <v-btn  text color="primary"  @click="dialogContrato = false"  > Cancel </v-btn>
              <v-btn text color="primary"  @click="$refs.dialogContrato.save(editedItem.dateContrato)"  >
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
          text: 'Administrador',
          disabled: true,
          },
          {
          text: 'Verificaciones',
          disabled: false
          },
      ],
      dialog: false,
      menu: false,
      alta: false,
      alert: false,
      alertError: false,
      file: null,
      updateV: false,
      desserts: [],
      itemPerfil: [
         {text: 'clave' , value:'id_rol'},
      ],
      itemFlotilla: [
         {text: 'vin' , value:'id_flotilla'},
      ],
      filter: '',
      CampoFilter: 'vin',
      search: '',
      dialogDelete: false,
      VINRules: [  v => !!v || 'VIN es requerido'  ],
      AutoRules: [ v => !!v || 'Auto es requerido'   ],
      MYRules: [  v => !!v || 'MY es requerido'  ],
      modeloRules: [  v => !!v || 'Descripción extendida de modelo es requerido' ],
      VerificacionRules: [ v => !!v || 'Verificacion es requerido'  ],
      dialogFecha: false,
      dateFechaRules: [ v => !!v || 'Fin Verificación es requerido'   ],
      dialogContrato: false,
      dateContratoRules: [ v => !!v || 'Fin contrato es requerido'  ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Vin',
          align: 'start',
          sortable: false,
          value: 'vin',
        },
        { text: 'Auto', value: 'auto' },
        { text: 'Año', value: 'my' },
        { text: 'Descripción', value: 'desc_modelo' },
        { text: 'Fin verificación', value: 'fin_verificacion' },
        { text: 'Verificación', value: 'verificacion' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        VIN: '',
        Auto: '',
        MY: '',
        Descripcion: '',
        dateContrato: '',
        Verificacion: '',
        dateFecha: '',

      },
      defaultItem: {
         VIN: '',
         Auto: '',
         MY: '',
         Descripcion: '',
         dateContrato: '',
         Verificacion: '',
         dateFecha: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta de Verificaciones' : 'Actualiza Verificaciones'
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
            "modulo":"Verificacion",
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/verificacion${params}`
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
      editItem (item) {
        //this.Perfiles();
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.alta = false
        this.updateV = true
        this.editedItem.fin_verificacion = this.formatDate(this.editedItem.fin_verificacion)
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
                 "idVerif": this.editedItem.id_verif,
                 "usuarioModif": "1"
            }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/verificacion`
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
          var finVerificacion = this.editedItem.fin_verificacion + ' ' + hora;

          let oUsuario= {
          "idVerif": this.editedItem.id_verif,
          "verificacion": this.editedItem.verificacion,
          "finVerificacion": finVerificacion,
          "idFlotilla": this.editedItem.id_flotilla,
          "estatus": 1,
          "usuarioModif": "1"
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/verificacion`
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
           finVerificacion = this.editedItem.fin_verificacion + ' ' + hora;

          let oUsuario= {
            "verificacion": this.editedItem.verificacion,
            "finVerificacion": finVerificacion,
            "idFlotilla": this.editedItem.id_flotilla,
            "estatus": 1,
            "usuarioModif": 1
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/verificacion`
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