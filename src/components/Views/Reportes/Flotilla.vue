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
            <div class="v-text">
                <v-row>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-checkbox v-model="companyBusq" :label="`Company car`"></v-checkbox>
                        <v-checkbox v-model="serviceBusq" :label="`Service car`"></v-checkbox>
                        <v-checkbox v-model="leasingBusq" :label="`Leasing`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-checkbox v-model="activosBusq" :label="`Activos`"></v-checkbox>
                        <v-checkbox v-model="inactivosBusq" :label="`Inactivos`"></v-checkbox>
                        <v-checkbox v-model="porAsignarBusq" :label="`Por asignar`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-text-field label="Fecha inicio"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        <v-select :items="['A1', 'A3', 'Q3', 'Q5']" label="Modelo"></v-select>
                        <div class="load">
                            <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach()" >
                                <v-icon>mdi-magnify</v-icon>
                            </v-btn>
                        </div>
                    </v-col>
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
                        <span class="solicitud" >Reporte flotilla</span>
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
                            Descargar Reporte de flotilla
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
                text: "VIN",
                align: "left",
                sortable: false,
                value: "chasis"
                },
                { text: "Auto", value: "auto" },
                { text: "Inicio contrato", value: "iniCont" },
                { text: "Fin contrato", value: "finCont" },
                { text: "Contrato", value: "contrato" },
                { text: "Nombre", value: "nombreEmp" },
                { text: "Flotilla", value: "flotilla" },
                { text: "Est. flotilla", value: "estFlotilla" },
                { text: "Usuario de modificación", value: "usrMod" }
            ],
            tablaReporte: [
                {
                    id: 1,
                    chasis: "WAUZZZFY0H2030210",
                    auto: "Q5 interno",
                    my: "2018",
                    descModelo: "Audi Q5 S tronic Quattro TFSI",
                    color: "Azul",
                    numMotor: "",
                    claveCom: "",
                    anioPed: "2017",
                    mesPed: "06",
                    vin: "WAUZZZFY0H2030210",
                    descExt: "Audi Q5 S tronic Quattro TFSI",
                    iniCont: "01/04/2017",
                    finCont: "31/12/9999",
                    plazo: "N/A",
                    dealer: "Audi México",
                    placa: "SM-028",
                    poliza: "N/A",
                    finSeguro: "N/A",
                    contrato: "N/A",
                    activo: "N/A",
                    precio: "N/A",
                    renta: "N/A",
                    estatusVwfs: "N/A",
                    fechEnt: "N/A",
                    fechDev: "N/A",
                    tipoTerm: "Terminacion normal",
                    tipoCierre: "Perdida total",
                    numEmp: "7452",
                    nombreEmp: "José Pérez Pérez",
                    centroCost: "6314200",
                    tipoEmp: "Normal",
                    flotilla: "Service Car",
                    estFlotilla: "Incativo",
                    usrMod: "Gerardo Robles Castillo"
                },
                 {
                    id: 2,
                    chasis: "WAUDFA8U3ER051005",
                    auto: "Q3",
                    my: "2014",
                    descModelo: "AUDI Q3 2.0T 170 HP TRENDY",
                    color: "N/D",
                    numMotor: "CCZ411341",
                    claveCom: "",
                    anioPed: "2014",
                    mesPed: "01",
                    vin: "WAUDFA8U3ER051005",
                    descExt: "AUDI Q3 2.0T 170 HP TRENDY",
                    iniCont: "2014/04/08",
                    finCont: "2015/04/08",
                    plazo: "12",
                    dealer: "ALDEN GERMANIA, S.A. DE C.V.",
                    placa: "N/D",
                    poliza: "N/D",
                    finSeguro: "N/D",
                    contrato: "50825888",
                    activo: "N/A",
                    precio: "423364.43",
                    renta: "14554.19",
                    estatusVwfs: "CERRADO",
                    fechEnt: "N/A",
                    fechDev: "N/A",
                    tipoTerm: "Terminacion normal",
                    tipoCierre: "Devolucion",
                    numEmp: "400164",
                    nombreEmp: "Roberto Palacios Rincon",
                    centroCost: "6314200",
                    tipoEmp: "Local",
                    flotilla: "Company car",
                    estFlotilla: "Activo",
                    usrMod: "Gerardo Robles Castillo"
                },
                 {
                    id: 3,
                    chasis: "WAUAFC8K4EN021113",
                    auto: "A4",
                    my: "2014",
                    descModelo: "AUDI A4 2.0T TRENDY PLUS MULTITRONIC",
                    color: "N/D",
                    numMotor: "CNC030938",
                    claveCom: "",
                    anioPed: "2014",
                    mesPed: "03",
                    vin: "WAUAFC8K4EN021113",
                    descExt: "AUDI A4 2.0T TRENDY PLUS MULTITRONIC",
                    iniCont: "2014/07/08",
                    finCont: "2015/06/22",
                    plazo: "12",
                    dealer: "INTERLOMAS MOTORS, S.A. DE C.V.",
                    placa: "PYK4786",
                    poliza: "N/D",
                    finSeguro: "N/A",
                    contrato: "50859581",
                    activo: "N/A",
                    precio: "456265.75",
                    renta: "15920.62",
                    estatusVwfs: "CERRADO",
                    fechEnt: "N/A",
                    fechDev: "N/A",
                    tipoTerm: "Terminacion anticipada",
                    tipoCierre: "Devolucion",
                    numEmp: "400828",
                    nombreEmp: "Julio Arebalo Rojas",
                    centroCost: "6390080",
                    tipoEmp: "Impat",
                    flotilla: "Company Car",
                    estFlotilla: "Activo",
                    usrMod: "Gerardo Robles Castillo"
                }
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
                text: 'Flotilla',
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