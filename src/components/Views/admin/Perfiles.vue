<template>
 <div id="container-perfiles">
   <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="perfiles">
   <!-- <div class="load">
        <span class="title"> Perfiles </span>
         <v-text-field  class="search" v-model="search"  label="Buscar"    outlined ></v-text-field>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="msg('search')" >
             <v-icon>mdi-magnify</v-icon>
         </v-btn>
           <div class="filter">
          <v-radio-group  v-model="CampoFilter"  row >
             <v-radio label="Clave" value="clave" true></v-radio>
             <v-radio   label="Descripcion" value="descripcion" ></v-radio>
          </v-radio-group>
          </div>
    </div>
   -->
    <div class="formulario">
      <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="clave"  class="elevation-1"  >
          <template v-slot:item.estatus="{ item }">
              {{item.estatus | strStatus}}
          </template>
         <template v-slot:top>
           <v-toolbar flat >
             <v-text-field v-model="search"  append-icon="mdi-magnify"  label="Buscar"  single-line hide-details ></v-text-field>
                   <v-spacer></v-spacer>
             <v-btn class="btn-add"  color="#f50537"  v-on:click="dialog=true,updateV=false "  >
                 <v-icon>mdi-plus</v-icon>
                 Agregar
              </v-btn>
             <v-dialog v-model="dialogDelete" max-width="500px">
               <v-card>
                 <v-card-title class="headline">Estás seguro de eliminar este Perfil ?</v-card-title>
                 <v-card-actions>
                   <v-spacer></v-spacer>
                   <v-btn color="#f50537" text @click="closeDelete">Cancel</v-btn>
                   <v-btn color="#f50537" text @click="deleteItemConfirm">Ok</v-btn>
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
                 <v-col  cols="12" sm="6"  md="6" >
                   <v-text-field label="Clave" required  :rules="ClaveRules"  v-model="editedItem.clave"  ></v-text-field>
                 </v-col>
                 <v-col  cols="12"  sm="6"  md="6" >
                    <v-autocomplete  label="Estatus" :items="itemEstatus"   item-text="valor" item-value="id"  required :rules="EstatusRules" v-model="editedItem.estatus"  >  </v-autocomplete>
                 </v-col>
                  <v-col  cols="12" sm="6"  md="12" >
                    <v-text-field label="Descripcion "  required  :rules="DescripcionRules"  v-model="editedItem.descripcion"  ></v-text-field>
                  </v-col>
                  <!-- <v-col  cols="12"  sm="6"  md="12"  v-if="alta" >
                    <v-combobox    :items="itemsPantallas"   item-text="nombre" item-value="id_pantalla"   label="Menu"   multiple chips v-model="editedItem.id_pantalla"  ></v-combobox>
                  </v-col> -->
                  <v-col  cols="12"  sm="6"  md="12"  v-if="updateV" >
                      <v-combobox    :items="itemsPantallasM"     label="Menu"   multiple chips v-model="selected"  ></v-combobox>
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
            text: 'Perfiles',
            disabled: false
          },
      ],
      dialog: false,
      search: '',
      CampoFilter: 'clave',
      selected: [],
      selectMenu: [],
      alta: false,
      updateV: false,
      itemEstatus: [
         {text: 'valor' , value:'id'},
      ],
      itemsPantallas: [
         {text: 'nombre' , value:'id_pantalla'},
      ],
      itemsPantallasM: [],
      itemsPantallaS: [],
      dialogDelete: false,
      ClaveRules: [ v => !!v || 'Clave es requerido' ],
      DescripcionRules: [ v => !!v || 'Descripción es requerido' ],
      EstatusRules: [  v => !!v || 'Estatus es requerido' ],
      headers: [
        {
          text: 'Clave',
          align: 'start',
          sortable: false,
          value: 'clave',
        },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Estatus', value: 'estatus' },
        { text: 'Acción', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        clave: '',
        descripcion: '',
        estatus: '',
        id_pantalla: [],
      },
      defaultItem: {
        clave: '',
        descripcion: '',
        estatus: '',
        id_pantalla: [],
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Alta Perfil' : 'Actualiza Perfil'
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
        this.getseach()
        this.CatSistema()
        this.Pantallas()

    },

    methods: {
    formatVisible(value) {
        switch(value) {
            case 0:
              return 'false'
            case 1:
              return 'true'
          }
    },
    async CatSistema () {
      const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
      try {
          const response = await axios.get(url);
          this.itemEstatus = response.data.result.catalogos.estatus

      } catch (error) {
          console.error(error);
      }
    },
    async Pantallas () {
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pantallas`
          try {
              const response = await axios.get(url);
              this.itemsPantallas = response.data.result
              console.log(response.data.result)

          } catch (error) {
              console.error(error);
          }
     },
     async PantallasModif (rol) {
         let params = '';
            params= params.concat(`?idRol=${rol}`);

            console.log(params)

           const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pantallasrol${params}`
           try {
               const response = await axios.get(url);
               response.data.result.forEach(item => {
               this.itemsPantallasM.push(item.nombre)})

               this.itemsPantallaS = response.data.result

               this.selected.length=0
               response.data.result.forEach(item => {
               console.log(item.visible)
                   if(item.visible === 1){
                   this.selected.push( item.nombre )
                   }
               })
               console.log("selected",this.selected)
           } catch (error) {
               console.error(error);
           }
      },
    async getseach () {
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/roles`
          try {
              const response = await axios.get(url);
              this.desserts = response.data.result
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
      this.PantallasModif(this.editedItem.id_rol)

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
               "idRol": this.editedItem.id_rol,
               "usuarioModif": 1
           }
        };
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/rol`
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
        "descripcion": this.editedItem.descripcion,
        "idRol": this.editedItem.id_rol,
        "clave": this.editedItem.clave,
        "estatus": this.editedItem.estatus,
        "usuarioModif": 1
        };
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/rol`
        const headers={
                "Content-Type":'application/json',
                "Access-Control-Allow-Credentials": false
        }

        try {

         const response = await axios.put(url,oUsuario,headers);
         console.log(response.data.result);

        let ids =[]
        this.selected.forEach( seleccionado => {
            ids.push(this.itemsPantallaS.filter(item=> item.nombre === seleccionado)[0].id_pantalla)
        })

        let oUsuario2= {
        "idRol": this.editedItem.id_rol,
        "idPantalla": ids,
        "visible": 1,
        "usuarioModif": 1
        };
        const url2 = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/pantallas`
        const headers2={
                "Content-Type":'application/json',
                "Access-Control-Allow-Credentials": false
        }

        const response2 = await axios.put(url2,oUsuario2,headers2);
        console.log(response2.data.result);

        } catch (error) {
          console.error(error);
        }

      } else {
        this.desserts.push(this.editedItem)

         let oUsuario= {
          "descripcion": this.editedItem.descripcion,
          "clave": this.editedItem.clave,
          "estatus": this.editedItem.estatus,
          "usuarioModif": 1
          };
          const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/rol`
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