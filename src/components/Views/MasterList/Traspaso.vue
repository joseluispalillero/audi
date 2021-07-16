<template>
  <div id="masterlist-traspaso">
    <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="traspaso">
      <div class="load">
       <span class="title">Búsqueda</span>
        <v-row>
          <v-col xs="10" sm="10" md="12" cols="12">
           <v-row>
            <v-col xs="10" sm="8" md="10" cols="8">
              <v-text-field v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
            </v-col>
            <v-col xs="2" sm="2" md="2" cols="2">
              <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
                <v-icon>mdi-magnify</v-icon>
                <div class="d-none d-sm-flex">Buscar</div>
              </v-btn>
            </v-col>
           </v-row>
          </v-col>
          <v-col class="col-xs-12 col-sm-2 col-md-2" cols="12">
            <v-checkbox class="checkHistorial" v-model="historial" label="Historial" ></v-checkbox>
          </v-col>
        </v-row>
        <div class="filter">
          <v-radio-group  v-model="CampoFilter"  row >
            <v-radio label="Vin" value="vin"></v-radio>
            <v-radio label="Placa" value="placa" true></v-radio>
            <v-radio label="Numero de empleado" value="nc" true></v-radio>
            <v-radio label="Nombre" value="nombre" ></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div class="formulario">
        <v-data-table  :headers="headers" :items="desserts" :search="search" sort-by="vin"  class="elevation-1" >
          <template v-slot:item.fecha_avaluo="{ item }">
            {{ formatDate(item.fecha_avaluo) }}
          </template>
          <template v-slot:top>
            <v-toolbar flat >
              <v-text-field v-model="search"  append-icon="mdi-magnify"  label="Search"  single-line hide-details ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Estás seguro de eliminar?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon  small  class="mr-2" @click="editItem(item)" > mdi-pencil  </v-icon>
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
                  <v-text-field label="Vin" required  :rules="VinRules"   v-model="editedItem.vin"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Placa" required  :rules="PlacaRules"   v-model="editedItem.placa"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Contrato" required  :rules="ContratoRules"   v-model="editedItem.contrato_vwfs"  ></v-text-field>
                </v-col>
                <v-col  cols="12"  sm="6"  md="4" >
                  <v-text-field label="Inicio contrato" required :rules="IniContratoRules"    v-model="editedItem.ini_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog1 = true"  ></v-text-field>
                </v-col>
                <v-col cols="12"  sm="6"  md="4"  >
                  <v-text-field label="Fin contrato" required  :rules="FinContratoRules"   v-model="editedItem.fin_contrato"   prepend-icon="mdi-calendar"  readonly  @click="dialog2 = true"  ></v-text-field>
                </v-col>
                <v-col  cols="12"  sm="6"  md="4"  >
                  <v-autocomplete  label="Plazo" :items="itemPlazo"   item-text="valor" item-value="valor"  required :rules="PlazoRules" v-model="editedItem.plazo"  >  </v-autocomplete>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Renta" required  :rules="RentaRules"   v-model="editedItem.renta"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Precio" required  :rules="PrecioRules"   v-model="editedItem.precio"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Poliza" required  :rules="PolizaRules"   v-model="editedItem.poliza"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Inicio Seguro" required  :rules="IniSeguroRules"   v-model="editedItem.ini_seguro"   prepend-icon="mdi-calendar"  readonly  @click="dialogSeguro1 = true"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Fin Seguro" required  :rules="FinSeguroRules"   v-model="editedItem.fin_seguro"   prepend-icon="mdi-calendar"  readonly  @click="dialogSeguro = true"  ></v-text-field>
                </v-col>
                <v-col cols="12"  sm="6"  md="4"  >
                  <v-text-field label="Fecha entrega" required  :rules="dateEntregaRules"   v-model="editedItem.fecha_entrega"   prepend-icon="mdi-calendar"  readonly  @click="dialogEntrega = true"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Fecha devolucion" required  :rules="dateDevRules"   v-model="editedItem.fecha_devolucion"   prepend-icon="mdi-calendar"  readonly  @click="dialogDev = true"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Kilometraje Excedente " required  :rules="kmExRules"   v-model="editedItem.km_excedente"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Costo Kilometraje " required  :rules="CostoKmRules"   v-model="editedItem.costo_km"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Avalúo " required  :rules="AvaluoRules"   v-model="editedItem.avaluo"  ></v-text-field>
                </v-col>
                <v-col  cols="12" sm="6"  md="4" >
                  <v-text-field label="Fecha Avalúo" required  :rules="dateAvaluoRules"   v-model="editedItem.fecha_avaluo"   prepend-icon="mdi-calendar"  readonly  @click="dialogAvaluo = true"  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="#f50537"  text  @click="close" >
              Close
            </v-btn>
            <v-btn color="#f50537" text  @click="save"  >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog   ref="dialog1"   v-model="dialog1" :return-value.sync="editedItem.ini_contrato" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.ini_contrato"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialog1 = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialog1.save(editedItem.ini_contrato)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog   ref="dialog2"   v-model="dialog2" :return-value.sync="editedItem.fin_contrato" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.fin_contrato"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialog2 = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialog2.save(editedItem.fin_contrato)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog   ref="dialogSeguro1"   v-model="dialogSeguro1" :return-value.sync="editedItem.ini_seguro" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.ini_seguro"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogSeguro1 = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogSeguro1.save(editedItem.ini_seguro)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog   ref="dialogSeguro"   v-model="dialogSeguro" :return-value.sync="editedItem.fin_seguro" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.fin_seguro"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogSeguro = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogSeguro.save(editedItem.fin_seguro)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog   ref="dialogEntrega"   v-model="dialogEntrega" :return-value.sync="editedItem.fecha_entrega" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.fecha_entrega"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogEntrega = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogEntrega.save(editedItem.fecha_entrega)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog   ref="dialogDev"   v-model="dialogDev" :return-value.sync="editedItem.fecha_devolucion" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.fecha_devolucion"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogDev = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogDev.save(editedItem.fecha_devolucion)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-dialog   ref="dialogAvaluo"   v-model="dialogAvaluo" :return-value.sync="editedItem.fecha_avaluo" persistent  width="290px"  >
        <v-date-picker v-model="editedItem.fecha_avaluo"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text color="primary"  @click="dialogAvaluo = false"  > Cancel </v-btn>
          <v-btn text color="primary"  @click="$refs.dialogAvaluo.save(editedItem.fecha_avaluo)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
        text: 'MasterList',
        disabled: true,
      },
      {
        text: 'Traspaso',
        disabled: false
      },
    ],
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialogDev: false,
    dialogAvaluo: false,
    dialogEntrega: false,
    dialogSeguro1: false,
    dialogSeguro: false,
    historial: '',
    desserts: [],
    itemPlazo: [
      {text: 'valor' , value:'valor'},
    ],
    filter: '',
    CampoFilter: 'vin',
    status: 1,
    search: '',
    dialogDelete: false,
    VinRules: [ v => !!v || 'Vin es requerido' ],
    PlacaRules: [ v => !!v || 'Placa es requerido' ],
    ContratoRules: [ v => !!v || 'Contrato es requerido' ],
    IniContratoRules: [ v => !!v || 'Inicio Contrato es requerido' ],
    FinContratoRules: [ v => !!v || 'Fin Contrato es requerido' ],
    PlazoRules: [ v => !!v || 'Plazo es requerido' ],
    RentaRules: [ v => !!v || 'Renta es requerido' ],
    PrecioRules: [ v => !!v || 'Precio es requerido' ],
    PolizaRules: [ v => !!v || 'Poliza es requerido' ],
    IniSeguroRules: [ v => !!v || 'Inicio Seguro es requerido' ],
    FinSeguroRules: [ v => !!v || 'Fin Seguro es requerido' ],
    dateEntregaRules: [ v => !!v || 'Fecha Entrega es requerido' ],
    dateDevRules: [ v => !!v || 'Fecha Devolucion es requerido' ],
    dateAvaluoRules: [ v => !!v || 'Fecha Avalúo es requerido' ],
    AvaluoRules: [ v => !!v || 'Avalúo es requerido' ],
    CostoKmRules: [ v => !!v || 'Costo Kilometraje es requerido' ],
    kmExRules: [ v => !!v || 'Kilometraje Excedente es requerido' ],
    searchRules: [ v => !!v || 'Search  es requerido' ],
    headers: [
      {
        text: 'Vin',
        align: 'start',
        sortable: false,
        value: 'vin',
      },
      { text: 'Placa', value: 'placa' },
      { text: 'Kilometraje Excedente', value: 'km_excedente' },
      { text: 'Costo Kilometraje', value: 'costo_km' },
      { text: 'Avalúo', value: 'avaluo' },
      { text: 'Fecha avalúo', value: 'fecha_avaluo' },
      { text: 'Numero Empleado', value: 'nc' },
      { text: 'Nombre Empleado', value: 'nombre_usuario' },
      { text: 'Flotilla', value: 'flotilla' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      km_excedente: '',
      costo_km: '',
      avaluo: '',
      fecha_avaluo: '',
      vin: '',
      placa: '',
      contrato_vwfs: '',
      ini_contrato: '',
      fin_contrato: '',
      plazo: '',
      renta: '',
      precio: '',
      poliza: '',
      ini_seguro: '',
      fin_seguro: '',
      fecha_entrega: '',
      fecha_devolucion: '',
    },
    defaultItem: {
      km_excedente: '',
      costo_km: '',
      avaluo: '',
      fecha_avaluo: '',
      vin: '',
      placa: '',
      contrato_vwfs: '',
      ini_contrato: '',
      fin_contrato: '',
      plazo: '',
      renta: '',
      precio: '',
      poliza: '',
      ini_seguro: '',
      fin_seguro: '',
      fecha_entrega: '',
      fecha_devolucion: '',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Alta' : 'Actualiza'
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
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD")
    },
    async CatSistema () {
      const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/catsystem`
      try {
        const response = await axios.get(url);
        this.itemPlazo = response.data.result.catalogos.plazo

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

        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/masterlist${params}`
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
      this.validate= true
      this.editedItem.fecha_avaluo = this.formatDate(this.editedItem.fecha_avaluo)
      this.editedItem.ini_contrato = this.formatDate(this.editedItem.ini_contrato)
      this.editedItem.fin_contrato = this.formatDate(this.editedItem.fin_contrato)
      this.editedItem.ini_seguro = this.formatDate(this.editedItem.ini_seguro)
      this.editedItem.fin_seguro = this.formatDate(this.editedItem.fin_seguro)
      this.editedItem.fecha_entrega = this.formatDate(this.editedItem.fecha_entrega)
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
        var ini_contrato = this.editedItem.ini_contrato + ' ' + hora;
        var fin_contrato = this.editedItem.fin_contrato + ' ' + hora;
        var fin_seguro = this.editedItem.fin_seguro + ' ' + hora;
        var ini_seguro = this.editedItem.ini_seguro + ' ' + hora;
        var fecha_entrega = this.editedItem.fecha_entrega + ' ' + hora;
        var fecha_devolucion = this.editedItem.fecha_devolucion + ' ' + hora;
        var fecha_avaluo = this.editedItem.fecha_avaluo + ' ' + hora;

        let oUsuario= {
          "idMasterlist": this.editedItem.id_masterlist,
          "idFlotilla": this.editedItem.id_flotilla,
          "vin": this.editedItem.vin,
          "placa": this.editedItem.placa,
          "contratoVwfs": this.editedItem.contrato_vwfs,
          "iniContrato": ini_contrato,
          "finContrato": fin_contrato,
          "plazo": this.editedItem.plazo,
          "renta": this.editedItem.renta,
          "precio": this.editedItem.precio,
          "poliza": this.editedItem.poliza,
          "iniSeguro": ini_seguro,
          "finSeguro": fin_seguro,
          "fechaEntrega": fecha_entrega,
          "fechaDevolucion": fecha_devolucion,
          "kmExcedente": this.editedItem.km_excedente,
          "costoKm": this.editedItem.costo_km,
          "avaluo": this.editedItem.avaluo,
          "fechaAvaluo":fecha_avaluo,
          "idUsuarioModif": 1
        };
        const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/masterlist`
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

      }
      this.close()

    },
  },
}
</script>
