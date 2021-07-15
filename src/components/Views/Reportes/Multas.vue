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
                    <v-col cols="12"  sm="2"  md="2">
                        <v-checkbox v-model="activosBusq" :label="`Activos`"></v-checkbox>
                        <v-checkbox v-model="inactivosBusq" :label="`Inactivos`"></v-checkbox>
                        <v-checkbox v-model="porAsignarBusq" :label="`Por asignar`"></v-checkbox>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-card-text>
                            Periodo infracción
                        </v-card-text>
                        <div class="load">
                            <v-text-field label="Fecha inicio"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-text-field label="VIN"></v-text-field>    
                         <v-select :items="['Pagado', 'Adeudo']" label="Estatus infracción"></v-select> 
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
                        <span class="solicitud" >Reporte multas</span>
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
                            Descargar Reporte de multas
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
                text: "Contrato",
                align: "left",
                sortable: false,
                value: "contrato"
                },
                { text: "Folio infraccion", value: "folioInf" },
                { text: "Fecha infraccion", value: "fechaInf" },
                { text: "Hora infraccion", value: "horaInf" },
                { text: "Importe", value: "importe" },
                { text: "Placa", value: "placa" },
                { text: "Nombre del empleado", value: "nombreEmp" },
                { text: "Flotilla", value: "flotilla" },
                { text: "Estatus infracción", value: "estInf" },
                { text: "Usuario de modificación", value: "usrMod" }
            ],
            tablaReporte: [
                {
                    id: 1,
                    flotilla: "Service Car",
                    usrMod: "Gerardo Robles Castillo",
                    contrato: "51856249",
                    folioInf: "12194097",
                    fechaInf: "24/06/2020",
                    horaInf: "17:47:53",
                    importe: "$456.00",
                    placa: "UBH4591",
                    nombreEmp: "José Pérez",
                    estInf: "Pagado"
                },
                 {
                    id: 2,
                    flotilla: "Company car",
                    usrMod: "Gerardo Robles Castillo",
                    contrato: "51856278",
                    folioInf: "12194098",
                    fechaInf: "12/08/2020",
                    horaInf: "11:47:50",
                    importe: "$456.00",
                    placa: "UBH4786",
                    nombreEmp: "Roberto Saldivar",
                    estInf: "Pagado"
                },
                 {
                    id: 3,
                    flotilla: "Company Car",
                    usrMod: "Gerardo Robles Castillo",
                     contrato: "23856278",
                    folioInf: "90194041",
                    fechaInf: "25/03/2021",
                    horaInf: "09:02:50",
                    importe: "$456.00",
                    placa: "E85RPA",
                    nombreEmp: "Carlos Pineda",
                    estInf: "Pagado"
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
                text: 'Multas',
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