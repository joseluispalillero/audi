<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <!--Criterios de búsqueda-->
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Búsqueda</span>
                    </v-col>
                </v-row>
            </div>
            <!--Criterios de búsqueda-->
            <div class="v-text">
                <v-row>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-checkbox v-model="companyBusq" :label="`Company car`"></v-checkbox>
                        <v-checkbox v-model="serviceBusq" :label="`Service car`"></v-checkbox>
                        <v-checkbox v-model="leasingBusq" :label="`Leasing`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-select :items="['Activo', 'Inactivo']" label="Estatus tarjeta"></v-select>    
                        <v-select :items="['Diesel', 'Premium']" label="Tipo de combustible"></v-select> 
                        <v-text-field label="Número de tarjeta"></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-card-text>
                            Fecha
                        </v-card-text>
                        <div class="load">
                            <v-text-field label="Fecha inicio"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <div class="load">
                        <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach()">
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </v-row>
                <v-divider class="divider-form"></v-divider>
                <v-dialog   ref="dialogFecha"   v-model="dialogFecha"  persistent  width="290px"  >
                    <v-date-picker  scrollable  >
                    <v-spacer></v-spacer>
                    <v-btn  text color="primary"  @click="dialogFecha = false"  > Cancelar </v-btn>
                    <v-btn text color="primary"  @click="dialogFecha = false"  >
                        Guardar
                    </v-btn>
                    </v-date-picker>
                </v-dialog>
            </div>
            <!--Tabla Reporte-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Reporte consumo de gasolina</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersReporte" :items="tablaReporte" item-key="chasis" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template>
                    </v-data-table>    
                </v-row>
            </div>
            <div class="formulario" v-show="mostrar">
                 <v-row>
                    <v-col  cols="12" sm="2"  md="2" ></v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-btn icon href="https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf" target="_blank">
                            Descargar Reporte de consumo de gasolina
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<script>
    import NavigationInfo from '../NavigationInfo.vue'
    export default {
        components: {NavigationInfo}, 
        data () {
            return {
            dialogFecha: false,
            mostrar: false,
            headersReporte: [
                {
                    text: "Número de tarjeta",
                    align: "left",
                    sortable: false,
                    value: "numTarTab"
                    },
                    { text: "Número de tarjetahabiente", value: "thabienTab" },
                    { text: "Movimiento", value: "movTab" },
                    { text: "Abono", value: "abonoTab" },
                    { text: "Cargo", value: "cargoTab" },
                    { text: "Importe", value: "importeTab" },
                    { text: "Nombre del empleado", value: "nombreEmp" },
                    { text: "VIN", value: "vin" },
                    { text: "Flotilla", value: "flotilla" },
                    { text: "Placas", value: "placas"}
            ],
            tablaReporte: [
                {
                    id: 1,
                    numTarTab: "872332954652",
                    thabienTab: "4981883269349580",
                    flotilla: "Leasing",
                    movTab: "Abono",
                    abonoTab: "$423.00",
                    cargoTab: "",
                    importeTab: "$423.00",
                    nombreEmp: "Rocio Salinas",
                    vin: "234DJGDFGVKNRI923",
                    placas: "A87WET"
                },
                {
                    id: 2,
                    numTarTab: "526232954396",
                    thabienTab: "4981883269349580",
                    flotilla: "Company Car",
                    movTab: "Cargo",
                    abonoTab: "",
                    cargoTab: "$950.00",
                    importeTab: "$950.00",
                    nombreEmp: "Mariana Pineda",
                    vin: "234DJGDFGVKNRI923",
                    placas: "A87WET"
                },
                {
                    id: 3,
                    numTarTab: "125632954154",
                    thabienTab: "741883269349679",
                    flotilla: "Company Car",
                    movTab: "Cargo",
                    abonoTab: "",
                    cargoTab: "$745.00",
                    importeTab: "$745.00",
                    nombreEmp: "Eduardo Luna",
                    vin: "234DJGDFGVKNRI923",
                    placas: "A87WET"
                },
                {
                    id: 4,
                    numTarTab: "875632954789",
                    thabienTab: "9631883269347426",
                    flotilla: "Leasing",
                    movTab: "Abono",
                    abonoTab: "$4587.00",
                    cargoTab: "",
                    importeTab: "$4587.00",
                    nombreEmp: "Laura España",
                    vin: "234DJGDFGVKNRI7852",
                    placas: "T36KJL"
                },
            ],
            navigationInfo: [
                {
                text: 'Home',
                disabled: true,
                },
                {
                text: 'Reporte',
                disabled: true,
                },
                {
                text: 'Consumo de gasolina',
                disabled: false
                }
            ]
        }
    },
    methods: {
        getseach () {
            this.mostrar = true
        }
    }
}
</script>