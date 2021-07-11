<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <div class="load">
<!--                <span class="title">Verificaciones</span> -->
            </div>
            <!--Proximas a vencer-->
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Verificaciones proximas a vencer</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersProximasVencer" :items="tablaProximasVencer" item-key="vinPV" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template>
                    </v-data-table>    
                </v-row>
            </div>
            <br /><br /><br />
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Búsqueda</span>
                    </v-col>
                </v-row>
            </div>
            <div class="load">
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
            <!--Historico de verificaciones-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Histórico de verificaciones</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersHistVerificaciones" :items="tablaHistVerificaciones" item-key="vin" :items-per-page="3" class="elevation-1">
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
                    text: 'Multas',
                    disabled: true,
                    },
                    {
                    text: 'Verificaciones',
                    disabled: false
                    },
                ],
                mostrar: false,
                headersProximasVencer: [
                    {
                    text: "VIN",
                    align: "left",
                    sortable: false,
                    value: "vinPV"
                    },
                    { text: "Modelo", value: "modeloPV" },
                    { text: "Placas", value: "placasPV" },
                    { text: "Tipo de verificación", value: "tipoVerPV" },
                    { text: "Fin de validez", value: "finValPV" },
                    { text: "Estatus vigencia", value: "estVigPV" },
                    { text: "Tipo de flotilla", value: "tipoFlotillaPV" },
                    { text: "Nombre del empleado", value: "nombreEmpleadoPV" }
                ],
                tablaProximasVencer: [
                    {
                        id: 1,
                        vinPV: "2654SDFDFGFG2ER5ERRG",
                        modeloPV: "A3",
                        placasPV: "4523DSW",
                        tipoVerPV: "00",
                        finValPV: "2023/07",
                        estVigPV: "30",
                        tipoFlotillaPV: "Company car",
                        nombreEmpleadoPV: "José Pérez Pérez"
                    },
                    {
                        id: 2,
                        vinPV: "2654SDFDFGFG2ER54RFGT",
                        modeloPV: "A1",
                        placasPV: "Q12GHT",
                        tipoVerPV: "0",
                        finValPV: "2021/09",
                        estVigPV: "15",
                        tipoFlotillaPV: "Leasing",
                        nombreEmpleadoPV: "Julio Prieto Salinas"
                    },
                    {
                        id: 3,
                        vinPV: "R54TSDFDFGFG2ER5ET62",
                        modeloPV: "Q3",
                        placasPV: "Q12PWE",
                        tipoVerPV: "1",
                        finValPV: "2020/07",
                        estVigPV: "Vencida",
                        tipoFlotillaPV: "Company car",
                        nombreEmpleadoPV: "Francisco Games Reyes"
                    },
                    {
                        id: 4,
                        vinPV: "PO4RTSDFDFGFG2ER5542RL",
                        modeloPV: "Q5",
                        placasPV: "369CBM",
                        tipoVerPV: "00",
                        finValPV: "2023/02",
                        estVigPV: "18",
                        tipoFlotillaPV: "Company car",
                        nombreEmpleadoPV: "José Pérez Pérez"
                    },
                    {
                        id: 5,
                        vinPV: "2654SDFDFGFG2ER5ERRG",
                        modeloPV: "A3",
                        placasPV: "4523DSW",
                        tipoVerPV: "00",
                        finValPV: "2020/07",
                        estVigPV: "18",
                        tipoFlotillaPV: "Company car",
                        nombreEmpleadoPV: "José Pérez Pérez"
                    }
                ],
                headersHistVerificaciones: [
                    {
                    text: "VIN",
                    align: "left",
                    sortable: false,
                    value: "vin"
                    },
                    { text: "Modelo", value: "modelo" },
                    { text: "Placas", value: "placas" },
                    { text: "Fecha de verificación", value: "fechaVer" },
                    { text: "Tipo de verificación", value: "tipoVer" },
                    { text: "Fin de validez", value: "finVal" },
                    { text: "Realizado por", value: "realizadoPor" },
                    { text: "Número de empleado", value: "numeroEmpleado" },
                    { text: "Nombre del empleado", value: "nombreEmpleado" },
                    { text: "Usuario de modificación", value: "usuarioModificacion" }
                ],
                tablaHistVerificaciones: [
                    {
                        id: 1,
                        vin: "2654SDFDFGFG2ER5ERRG",
                        modelo: "A3",
                        placas: "4523DSW",
                        fechaVer: "2021/07",
                        tipoVer: "00",
                        finVal: "2023/07",
                        realizadoPor: "Gerardo Ponce",
                        numeroEmpleado: "41256",
                        nombreEmpleado: "José Pérez Pérez",
                        usuarioModificacion: "Rogelio Garza"
                    },
                    {
                        id: 2,
                        vin: "2654SDFDFGFG2ER5ERRG",
                        modelo: "A1",
                        placas: "Q90OJU",
                        fechaVer: "2021/08",
                        tipoVer: "0",
                        finVal: "2022/02",
                        realizadoPor: "Gerardo Ponce",
                        numeroEmpleado: "12369",
                        nombreEmpleado: "Julio Pérez Solano",
                        usuarioModificacion: "Rogelio Garza",
                    },
                    {
                        id: 3,
                        vin: "2654SDFDFG542ERT5GGG52W",
                        modelo: "A1",
                        placas: "R58DDO",
                        fechaVer: "2021/02",
                        tipoVer: "00",
                        finVal: "2023/02",
                        realizadoPor: "Gerardo Ponce",
                        numeroEmpleado: "78632",
                        nombreEmpleado: "Aldo Mendez Montes",
                        usuarioModificacion: "Rogelio Garza",
                    },
                    {
                        id: 4,
                        vin: "ASDSDF565FDGFG234",
                        modelo: "Q5",
                        placas: "Q69PLN",
                        fechaVer: "2021/05",
                        tipoVer: "1",
                        finVal: "2021/11",
                        realizadoPor: "Gerardo Ponce",
                        numeroEmpleado: "71225",
                        nombreEmpleado: "Arturo Estrada Luna",
                        usuarioModificacion: "Rogelio Garza",
                    },
                    {
                        id: 5,
                        vin: "2654SDFDFGFG2ER458PO",
                        modelo: "A3",
                        placas: "ERT369",
                        fechaVer: "2021/07",
                        tipoVer: "00",
                        finVal: "2023/07",
                        realizadoPor: "Gerardo Ponce",
                        numeroEmpleado: "41256",
                        nombreEmpleado: "José Pérez Pérez",
                        usuarioModificacion: "Rogelio Garza",
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
