<template>
    <div id="container-usuarios">
        <div class="usuarios">
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Búsqueda</span>
                    </v-col>
                </v-row>
            </div>
            <div class="load">
<!--                <span class="title">Pagos</span> -->
            </div>
            <div class="load">
                <v-text-field  class="search" v-model="filter"  label="Search"  outlined ></v-text-field>
                <v-btn class="btn-load"  color="#f50537" v-on:click="getseach()">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <div class="filter">
                    <v-radio-group  v-model="CampoFilter"  row >
                        <v-radio label="VIN" value="busqVin" true></v-radio>
                        <v-radio label="Placa" value="busqPlaca" true></v-radio>
                        <v-radio label="Número de contrato" value="busqNunContrato" true></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <!--Datos del auto-->
            <div class="formulario" id="seccionAuto" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Datos del auto</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="VIN" value="WAUAYJ8V5J1090385" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Descripción del modelo" value="A3Sedan 1.4 TFSI COD Select 150hp S tronic front" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="MY" value="2021" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Placas" value="Y75TLS" disabled></v-text-field>
                    </v-col>
                </v-row>
            </div>
            <!--Historico de contratos-->
            <div class="formulario" id="historicoContratos" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Histórico de contratos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersHistCont" :items="tablaHistContratos" 
                        item-key="histContrato" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template>
                        <template v-slot:item.actions="{  }">
                            <v-icon  small  class="mr-2" @click="editItem()" > mdi-pencil  </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <span>No se encontraron Datos</span>
                        </template>
                    </v-data-table>    
                </v-row>
            </div>
            <!--Area de mensajes-->
            <div class="formulario" id="mensajes" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="A1primera" >Favor de seleccionar un contrato para ver el histórico de pagos</span>
                    </v-col>
                </v-row>
            </div>
            <!--Historico de pagos-->
            <div class="formulario" id="historicoPagosByContratos" v-show="mostrarPagos">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Histórico de pagos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table  :headers="headersHistPagByCont" :items="histPagByCont" class="elevation-1" >
                        <template v-slot:top>
                        </template>
                        <template v-slot:no-data>
                        <span>No se encontraron Datos</span>
                        </template>
                    </v-data-table> 
                </v-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {  
        data () {
            return {
                mostrar: false,
                mostrarPagos: false,
                headersHistCont: [
                    {
                    text: "Contrato",
                    align: "left",
                    sortable: false,
                    value: "histContrato"
                    },
                    { text: "Inicio contrato", value: "histIniCont" },
                    { text: "Termino de contrato", value: "histTermCont" },
                    { text: "Plazo", value: "histPlazo" },
                    { text: "Valor de contrato", value: "histValCont" },
                    { text: "Saldo del contrato ", value: "histSaldoCont" },
                    { text: "Renta total", value: "histRentaTot" },
                    { text: 'Ver Pagos', value: 'actions', sortable: false }
                ],
                tablaHistContratos: [
                    {
                        id: 1,
                        histContrato: "52150851",
                        histIniCont: "2020/12/01",
                        histTermCont: "2021/12/01",
                        histPlazo: "24",
                        histValCont: "145,123",
                        histSaldoCont: "80,745",
                        histRentaTot: "150,781"
                    },
                    {
                        id: 2,
                        histContrato: "52150123",
                        histIniCont: "2020/02/01",
                        histTermCont: "2022/02/01",
                        histPlazo: "36",
                        histValCont: "112,124",
                        histSaldoCont: "70,125",
                        histRentaTot: "150,784"
                    },
                    {
                        id: 3,
                        histContrato: "52150436",
                        histIniCont: "2020/12/01",
                        histTermCont: "2021/12/01",
                        histPlazo: "12",
                        histValCont: "203,456",
                        histSaldoCont: "145.260",
                        histRentaTot: "210,781"
                    },
                    {
                        id: 4,
                        histContrato: "52150023",
                        histIniCont: "2012/12/01",
                        histTermCont: "2021/12/01",
                        histPlazo: "24",
                        histValCont: "145,123",
                        histSaldoCont: "80,745",
                        histRentaTot: "150,781"
                    },
                    {
                        id: 5,
                        histContrato: "52150008",
                        histIniCont: "2012/12/01",
                        histTermCont: "2021/12/01",
                        histPlazo: "24",
                        histValCont: "145,123",
                        histSaldoCont: "80,745",
                        histRentaTot: "150,781"
                    }
                ],
                headersHistPagByCont: [
                    {
                    text: 'Documento',
                    align: 'start',
                    sortable: false,
                    value: 'documento',
                    },
                    { text: 'Concepto', value: 'concepto' },
                    { text: 'Fecha', value: 'fecha' },
                    { text: 'Capital del servicio adicional', value: 'capAdi' },
                    { text: 'Interés del servicio adicional', value: 'intAdi' },
                    { text: 'Renta', value: 'renta' },
                    { text: 'Renta total', value: 'rentaTot' },
                    { text: 'Número de empleado', value: 'numEmp' },
                    { text: 'Nombre del empleado', value: 'nomEmp' },
                    { text: 'Centro de costos', value: 'centroCostos' },
                    { text: 'Usuario de modificación', value: 'usrMod' }
                ],
                histPagByCont: [
                    {
                        id: 1,
                        documento: "52150851",
                        concepto: "Abono",
                        fecha: "2021/05/01",
                        capAdi: "3502.00",
                        intAdi: "350.00",
                        renta: "3852.00",
                        rentaTot: "4000.00",
                        numEmp: "5412",
                        nomEmp: "Juan Contreras Linares",
                        centroCostos: "4563",
                        usrMod: "Pedro Archundia Gallardo"
                    },
                    {
                        id: 2,
                        documento: "52150412",
                        concepto: "Abono",
                        fecha: "2021/06/01",
                        capAdi: "3502.00",
                        intAdi: "350.00",
                        renta: "3852.00",
                        rentaTot: "4000.00",
                        numEmp: "5412",
                        nomEmp: "Juan Contreras Linares",
                        centroCostos: "4563",
                        usrMod: "Pedro Archundia Gallardo"
                    },
                    {
                        id: 3,
                        documento: "52154178",
                        concepto: "Abono",
                        fecha: "2021/07/01",
                        capAdi: "3502.00",
                        intAdi: "350.00",
                        renta: "3852.00",
                        rentaTot: "4000.00",
                        numEmp: "5412",
                        nomEmp: "Juan Contreras Linares",
                        centroCostos: "4563",
                        usrMod: "Pedro Archundia Gallardo"
                    }
                ],
            }
        },
        methods: {
            getseach () {
                this.mostrar = true
            },
            editItem () {
                this.mostrarPagos = true
            }
        }
    }
</script>
