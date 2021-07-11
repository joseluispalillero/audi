<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <!--Criterios de búsqueda-->
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
            <!--Historico de mantenimientos-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Flotilla</span>
                    </v-col>
                </v-row>
                <v-data-table
                    :headers="headersReportePrueba"
                    :items="tablaReporte"
                    :single-expand="singleExpand"
                    :expanded.sync="expanded"
                    :items-per-page="3" 
                    item-key="chasis"
                    show-expand
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            <v-switch
                            v-model="singleExpand"
                            class="mt-2"
                            ></v-switch>
                        </v-toolbar>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-row>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Color
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.color}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        No. Motor
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.numMotor}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Descripción extendida de modelo
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.descExt}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Inicio contrato
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.iniCont}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Fin contrato
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.finCont}}
                                    </v-card-text>
                                </v-col>
                                 <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Plazo
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.plazo}}
                                    </v-card-text>
                                </v-col>
                                 <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Dealer
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.dealer}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Placa
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.placa}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                       Póliza
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.poliza}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Fin seguro
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.finSeguro}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Contrato
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.contrato}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        N. Activo
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.activo}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Precio
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.precio}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Renta
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.renta}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Estatus VWFS
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.estatusVwfs}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Fecha entrega
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.fechEnt}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Fecha dev
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.fechDev}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Tipo Terminación
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.tipoTerm}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Tipo cierre
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.tipoCierre}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Numero de empleado
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.numEmp}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Nombre
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.nombreEmp}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Centro de costos
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.centroCost}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Tipo de empleado
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.tipoEmp}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Flotilla
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.flotilla}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Est. flotilla
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.estFlotilla}}
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        Usuario de modificación
                                    </v-card-text>
                                </v-col>
                                <v-col  cols="16" sm="2"  md="2" >
                                    <v-card-text>
                                        {{item.usrMod}}
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </td>
                    </template>
                </v-data-table>
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
            navigationInfo: [
                {
                text: 'Home',
                disabled: true,
                },
                {
                text: 'Reportes',
                disabled: true,
                },
                {
                text: 'Flotilla',
                disabled: false
                },
            ],
            dialogFecha: false,
            mostrar: false,
            headersReporte: [
                {
                text: "Número de chasis",
                align: "left",
                sortable: false,
                value: "chasis"
                },
                { text: "Auto", value: "auto" },
                { text: "MY", value: "my" },
                { text: "Descripción modelo", value: "descModelo" },
                { text: "Color", value: "color" },
                { text: "No. motor", value: "numMotor" },
                { text: "Clave comercial", value: "claveCom" },
                { text: "Año pedido", value: "anioPed" },
                { text: "Mes pedido", value: "mesPed" },
                { text: "VIN", value: "vin" },
                { text: "Descripción extendida de modelo", value: "descExt"},
                { text: "Inicio contrato", value: "iniCont" },
                { text: "Fin contrato", value: "finCont" },
                { text: "Plazo", value: "plazo" },
                { text: "Dealer", value: "dealer"},
                { text: "Placa", value: "placa" },
                { text: "Póliza", value: "poliza" },
                { text: "Fin seguro", value: "finSeguro" },
                { text: "Contrato", value: "contrato" },
                { text: "N. Activo", value: "activo" },
                { text: "Precio", value: "precio" },
                { text: "Renta", value: "renta" },
                { text: "Estatus VWFS", value: "estatusVwfs" },
                { text: "Fecha entrega", value: "fechEnt" },
                { text: "Fecha dev.", value: "fechDev" },
                { text: "Tipo Terminación", value: "tipoTerm" },
                { text: "Tipo cierre", value: "tipoCierre" },
                { text: "Numero de empleado", value: "numEmp" },
                { text: "Nombre", value: "nombreEmp" },
                { text: "Centro de costos", value: "centroCost" },
                { text: "Tipo empleado", value: "tipoEmp" },
                { text: "Flotilla", value: "flotilla" },
                { text: "Est. flotilla", value: "estFlotilla" },
                { text: "Usuario de modificación", value: "usrMod" }
            ],
            headersReportePrueba: [
                {
                text: "Número de chasis",
                align: "left",
                sortable: false,
                value: "chasis"
                },
                { text: "Auto", value: "auto" },
                { text: "MY", value: "my" },
                { text: "Descripción modelo", value: "descModelo" },
                { text: "Clave comercial", value: "claveCom" },
                { text: "Año pedido", value: "anioPed" },
                { text: "Mes pedido", value: "mesPed" },
                { text: "VIN", value: "vin" }
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