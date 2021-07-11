<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <!--Criterios de búsqueda-->
            <div class="v-text">
                <v-row>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-checkbox v-model="companyBusq" :label="`Company car`"></v-checkbox>
                        <v-checkbox v-model="serviceBusq" :label="`Service car`"></v-checkbox>
                        <v-checkbox v-model="leasingBusq" :label="`Leasing`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-checkbox v-model="activosBusq" :label="`Activos`"></v-checkbox>
                        <v-checkbox v-model="inactivosBusq" :label="`Inactivos`"></v-checkbox>
                        <v-checkbox v-model="porAsignarBusq" :label="`Por asignar`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-text-field label="VIN"></v-text-field>
                        <v-text-field label="Contrato"></v-text-field>
                        <v-text-field label="Concepto"></v-text-field>       
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <div class="load">
                            <v-text-field label="Fecha inicio (alta)"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin (baja)"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-card-text>
                            Fecha factura
                        </v-card-text>
                        <div class="load">
                            <v-text-field label="Fecha inicio"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-checkbox v-model="historicoBusq" :label="`Histórico`"></v-checkbox>
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
                        <span class="solicitud" >Reporte Pagos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersReporte" :items="tablaReporte" item-key="chasis" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template>
                    </v-data-table>    
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
                text: 'Pagos',
                disabled: false
                },
            ],
            dialogFecha: false,
            mostrar: false,
            headersReporte: [
                {
                text: "Contrato",
                align: "left",
                sortable: false,
                value: "contrato"
                },
                { text: "Inicio contrato", value: "iniCont" },
                { text: "Término del contrato", value: "finCont" },
                { text: "Plazo", value: "plazo" },
                { text: "Documento", value: "documento" },
                { text: "Concepto", value: "concepto" },
                { text: "Fecha", value: "fecha" },
                { text: "Capital del Servicio Adicional", value: "capAdi" },
                { text: "Interés del Servicio Adicional", value: "intAdi" },
                { text: "Renta", value: "renta" },
                { text: "Renta total", value: "rentaTol"},
                { text: "Modelo", value: "modelo" },
                { text: "VIN", value: "vin" },
                { text: "Tipo Terminación", value: "tipoTerm" },
                { text: "Tipo cierre", value: "tipoCierre" },
                { text: "Numero de empleado", value: "numEmp" },
                { text: "Nombre del empleado", value: "nombreEmp" },
                { text: "Centro de costos", value: "centroCost" },
                { text: "Tipo empleado", value: "tipoEmp" },
                { text: "Flotilla", value: "flotilla" },
                { text: "Est. flotilla", value: "estFlotilla" },
                { text: "Fecha dev.", value: "fechDev" },
                { text: "Estatus asignado", value: "estAsig" },
                { text: "Usuario de modificación", value: "usrMod" }
            ],
            tablaReporte: [
                {
                    id: 1,
                    modelo: "Q5 interno",
                    documento: "74589632",
                    concepto: "Pago mensualidad",
                    vin: "WAUZZZFY0H2030210",
                    iniCont: "01/04/2017",
                    finCont: "31/12/9999",
                    fecha: "05/08/2016",
                    capAdi: "5,412.00",
                    intAdi: "365.00",
                    estAsig: "N/A",
                    fechDev: "N/A",
                    contrato: "N/A",
                    plazo: "12",
                    renta: "N/A",
                    rentaTol: "N/A",
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
                    modelo: "Q3",
                    documento: "74589641",
                    concepto: "Pago mensualidad",
                    vin: "WAUDFA8U3ER051005",
                    iniCont: "2014/04/08",
                    finCont: "2015/04/08",
                    fecha: "05/08/2016",
                    capAdi: "5,412.00",
                    intAdi: "365.00",
                    estAsig: "N/A",
                    plazo: "12",
                    contrato: "50825888",
                    activo: "N/A",
                    precio: "423364.43",
                    renta: "14554.19",
                    rentaTol: "14554.19",
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
                    modelo: "A4",
                    documento: "74589012",
                    concepto: "Pago mensualidad",
                    vin: "WAUAFC8K4EN021113",
                    iniCont: "2014/07/08",
                    finCont: "2015/06/22",
                    fecha: "05/08/2016",
                    capAdi: "5,412.00",
                    intAdi: "365.00",
                    estAsig: "N/A",
                    plazo: "12",
                    contrato: "50859581",
                    activo: "N/A",
                    renta: "15920.62",
                    rentaTol: "15920.62",
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