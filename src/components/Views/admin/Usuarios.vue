<template>
 <div id="container-usuarios">
    <div class="usuarios">
    <div class="load">
         <span class="title"> Usuarios </span>
         <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
             <v-icon>mdi-magnify</v-icon>
         </v-btn>
         <div class="filter">
         <v-radio-group  v-model="CampoFilter"  row >
            <v-radio label="Número de empleado" value="nc" true></v-radio>
            <v-radio   label="Nombre" value="nombreUsuario" ></v-radio>
         </v-radio-group>
         </div>
    </div>
    <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="empleado"  class="elevation-1" >
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
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="500px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar este usuario?</v-card-title>
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
                   <v-text-field label="Número de empleado" required  :rules="empleadoRules" :disabled="validate"  v-model="editedItem.nc"  ></v-text-field>
                 </v-col>
                 <v-col  cols="12" sm="6"  md="6" >
                   <v-text-field label="Usuario "  required  :rules="UsuarioRules"  :disabled="validate"  v-model="editedItem.username"  ></v-text-field>
                 </v-col>
                 <v-col  cols="12"  sm="6"  md="6" >
                   <v-text-field label="Nombre" required  :rules="NombreRules" :disabled="validate"  v-model="editedItem.nombre_usuario"  ></v-text-field>
                 </v-col>
                 <v-col cols="12"  sm="6"  md="6"  >
                   <v-text-field  label="Clave Unidad Organizativa" required  :rules="ClaveRules" :disabled="validate"    v-model="editedItem.cve_unidad_org"  ></v-text-field>
                 </v-col>
                 <v-col cols="12"  sm="6"  md="6"  >
                   <v-text-field  label="Nombre de Unidad Organizativa " required  :rules="Nombre_unidadRules" :disabled="validate"   v-model="editedItem.nombre_unidad_org"  ></v-text-field>
                 </v-col>
                 <v-col cols="12"  sm="6"  md="6"  >
                   <v-text-field  label="Correo "    required  :rules="CorreoRules"  v-model="editedItem.correo" :disabled="validate"  ></v-text-field>
                 </v-col>
                 <v-col cols="12"  sm="6"  md="6"  >
                   <v-select  label="Perfil" :items="itemPerfil"   item-text="clave" item-value="id_rol"  required :rules="PerfilRules" v-model="editedItem.id_rol"  >
                   </v-select>
                 </v-col>
                 <v-col cols="12"  sm="6"  md="6"  >
                    <v-autocomplete  label="Clasificación" :items="itemClasificacionFamiliar"   item-text="valor" item-value="valor"  required :rules="ClasificacionRules" v-model="editedItem.clasif_fam"  >  </v-autocomplete>

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
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      dialog: false,
      validate : false,
      desserts: [],
      itemPerfil: [
         {text: 'clave' , value:'id_rol'},
      ],
      itemClasificacionFamiliar: [
         {text: 'valor' , value:'valor'},
      ],
      filter: '',
      CampoFilter: 'nc',
      search: '',
      dialogDelete: false,
      empleadoRules: [ v => !!v || 'Número de empleado es requerido' ],
      UsuarioRules: [ v => !!v || 'Usuario es requerido' ],
      NombreRules: [  v => !!v || 'Nombre es requerido' ],
      ClaveRules: [  v => !!v || 'Clave Unidad Organizativa es requerido' ],
      Nombre_unidadRules: [ v => !!v || 'Nombre de Unidad Organizativa es requerido' ],
      CorreoRules: [ v => !!v || 'E-mail es requerido',
                     v => (/.+@.+/.test(v) ) || 'E-mail debe ser válido' ],
      PerfilRules: [ v => !!v || 'Perfil es requerido' ],
      ClasificacionRules: [ v => !!v || 'Clasificación familiar es requerido' ],
      searchRules: [ v => !!v || 'Search  es requerido' ],
      headers: [
        {
          text: 'Número de empleado',
          align: 'start',
          sortable: false,
          value: 'nc',
        },
        { text: 'Usuario', value: 'username' },
        { text: 'Nombre', value: 'nombre_usuario' },
        { text: 'Perfil', value: 'clave' },
        { text: 'Clasificación', value: 'clasif_fam' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        nc: '',
        nombre_usuario: '',
        id_rol: '',
        username: '',
        cve_unidad_org: '',
        nombre_unidad_org: '',
        correo: '',
        clasif_fam : '',
      },
      defaultItem: {
        nc: '',
        nombre_usuario: '',
        id_rol: '',
        username: '',
        cve_unidad_org: '',
        nombre_unidad_org: '',
        correo: '',
        clasif_fam : '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Usuario' : 'Actualiza Usuario'
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
      async CatSistema () {

          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
          try {
              const response = await axios.get(url);
              this.itemClasificacionFamiliar = response.data.result.catalogos.clasificacionFamiliar
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

            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario${params}`
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
            this.validate= false
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/roles`
            try {
                const response = await axios.get(url);
                this.itemPerfil = response.data.result
                console.log(response.data.result)

            } catch (error) {
                console.error(error);
            }
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
                 "idUsuario": this.editedItem.id_usuario,
                 "usuarioModif": 1
             }
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario`
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
          "clasifFam": this.editedItem.clasif_fam,
          "idRol": this.editedItem.id_rol,
          "idUsuario": this.editedItem.id_usuario,
          "usuarioModif": 1
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario`
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
            "nc": this.editedItem.nc,
            "nombreUsuario": this.editedItem.nombre_usuario,
            "username": this.editedItem.username,
            "cveUnidadOrg": this.editedItem.cve_unidad_org,
            "nombreUnidadOrg": this.editedItem.nombre_unidad_org,
            "correo": this.editedItem.correo,
            "clasifFam": this.editedItem.clasif_fam,
            "estatus": 1,
            "idRol": this.editedItem.id_rol,
            "usuarioModif": 1
            };
            const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/usuario`
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