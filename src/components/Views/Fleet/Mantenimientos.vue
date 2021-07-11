<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud">Búsqueda</span>
                    </v-col>
                </v-row>
            </div>
            <div class="load">
<!--                <span class="title">Mantenimientos</span> -->
                <v-text-field  class="search" v-model="filter"  label="Search"  outlined ></v-text-field>
                <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach()" >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <div class="filter">
                    <v-radio-group  v-model="CampoFilter"  row >
                        <v-radio label="VIN" value="busqVin" true></v-radio>
                        <v-radio label="Placa" value="busqPlaca" true></v-radio>
                        <v-radio label="Número de empleado" value="busqNc" true></v-radio>
                        <v-radio   label="Nombre de empleado" value="busqNombre" ></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <!--Historico de mantenimientos-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Histórico de mantenimientos</span>
                    </v-col>
                </v-row>
                <v-data-table :headers="headersHistMultas" :items="tablaHistMultas" item-key="vin" :items-per-page="3" class="elevation-1">
                    <template v-slot:top>
                    </template>
                </v-data-table>
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
                    text: 'Multas',
                    disabled: true,
                    },
                    {
                    text: 'Mantenimientos',
                    disabled: false
                    },
                ],
                mostrar: false,
                expanded: [],
                singleExpand: false,
            headersHistMultas: [
                {
                text: "VIN",
                align: "left",
                sortable: false,
                value: "vin"
                },
                { text: "Modelo", value: "modelo" },
                { text: "Placas", value: "placas" },
                { text: "Tipo de flotilla", value: "tipoFlotilla" },
                { text: "Nombre del empleado", value: "nombreEmpleado" },
                { text: "Folio de autorización", value: "folioAut" },
                { text: "Kilometraje", value: "kilometraje" },
                { text: "Orden de servicio", value: "ordenServ" }
            ],
            tablaHistMultas: [
                {
                    id: 1,
                    vin: "WAUAYJ8V5J1090385",
                    modelo: "A3Sedan 1.4 TFSI COD Select 150hp S tronic front",
                    placas: "UBL4965",
                    tipoFlotilla: "Service Car",
                    nombreEmpleado: "José Pérez Pérez",
                    folioAut: "2020A1039",
                    kilometraje: "28,533",
                    ordenServ: "OSSJ00013246",
                    fecha: "15/01/2020",
                    proveedor: "SJC",
                    concepto: "MECANICA",
                    tipoConcepto: "HYP-Mecanica",
                    cantidad: "2.5",
                    importUnit: "1,625",
                    importMat: "162.5",
                    importIva: "2073.5",
                    descMant: "Radiador cambio",
                    tipMant: "Mechanical Repair",
                    usrMod: "Ricardo Galvan"
                },
                {
                    id: 2,
                    vin: "3U5AFCFY9J2400763",
                    modelo: "Audi Q5 2.0 TFSI  252 HP  Dynamic S tronic Quattro",
                    placas: "UBD1021",
                    tipoFlotilla: "Company Car",
                    nombreEmpleado: "José Pérez Pérez",
                    folioAut: "2020A1042",
                    kilometraje: "47,962",
                    ordenServ: "OSSJ00013356",
                    fecha: "15/01/2020",
                    proveedor: "SJC",
                    concepto: "MECANICA",
                    tipoConcepto: "HYP-Mecanica",
                    cantidad: "2.5",
                    importUnit: "1,625",
                    importMat: "162.5",
                    importIva: "2073.5",
                    descMant: "Radiador cambio",
                    tipMant: "Mechanical Repair",
                    usrMod: "Ricardo Galvan"
                },
                {
                    id: 3,
                    vin: "QASAYJ8V5J1090374",
                    modelo: "A1 Sedan 1.4 ",
                    placas: "UBL8635",
                    tipoFlotilla: "Service Car",
                    nombreEmpleado: "José Pérez Pérez",
                    folioAut: "2020A1074",
                    kilometraje: "28,142",
                    ordenServ: "OSSJ00013247",
                    fecha: "15/01/2020",
                    proveedor: "SJC",
                    concepto: "MECANICA",
                    tipoConcepto: "HYP-Mecanica",
                    cantidad: "2.5",
                    importUnit: "1,625",
                    importMat: "162.5",
                    importIva: "2073.5",
                    descMant: "Radiador cambio",
                    tipMant: "Mechanical Repair",
                    usrMod: "Ricardo Galvan"
                },
                {
                    id: 4,
                    vin: "WAUAYJ8V5J1090023",
                    modelo: "Q5",
                    placas: "PLJ4967",
                    tipoFlotilla: "Service Car",
                    nombreEmpleado: "José Pérez Pérez",
                    folioAut: "2020A1078",
                    kilometraje: "28,574",
                    ordenServ: "OSSJ00013321",
                    fecha: "15/01/2020",
                    proveedor: "SJC",
                    concepto: "MECANICA",
                    tipoConcepto: "HYP-Mecanica",
                    cantidad: "2.5",
                    importUnit: "1,625",
                    importMat: "162.5",
                    importIva: "2073.5",
                    descMant: "Radiador cambio",
                    tipMant: "Mechanical Repair",
                    usrMod: "Ricardo Galvan"
                },
                {
                    id: 5,
                    vin: "WAUAYJ8V5J1090785",
                    modelo: "A3Sedan 1.4 TFSI COD Select 150hp S tronic front",
                    placas: "UBL4965",
                    tipoFlotilla: "Company Car",
                    nombreEmpleado: "José Pérez Pérez",
                    folioAut: "2020A1012",
                    kilometraje: "24,533",
                    ordenServ: "OSSJ00013246",
                    fecha: "15/01/2020",
                    proveedor: "SJC",
                    concepto: "MECANICA",
                    tipoConcepto: "HYP-Mecanica",
                    cantidad: "2.5",
                    importUnit: "1,625",
                    importMat: "162.5",
                    importIva: "2073.5",
                    descMant: "Radiador cambio",
                    tipMant: "Mechanical Repair",
                    usrMod: "Ricardo Galvan"
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
