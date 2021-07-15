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
                    <v-col cols="12"  sm="2"  md="2">
                        <div class="load">
                            <v-select :items="['A1', 'A3', 'Q3', 'Q5']" label="Modelo"></v-select>
                            <v-text-field label="Fecha inicio (alta)"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin (baja)"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
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
            </div>
            <!--Tabla Reporte-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Reporte mix de autos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersReporte" :items="tablaReporte" item-key="chasis" :items-per-page="6" class="elevation-1">
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
                <v-row>
                    <v-col cols="12" sm="4"  md="4">
                        <span class="solicitud" >Total de autos</span>
                    </v-col>
                    <v-col cols="12" sm="4"  md="4">
                        <span class="solicitud" >1910</span>
                    </v-col>
                </v-row>
            </div>
            <!--Tabla detalle-->
            <div class="formulario" v-show="mostrarDetalle">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Detalle de autos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersDetalleReporte" :items="tablaDetalleReporte" item-key="chasis" :items-per-page="4" class="elevation-1">
                        <template v-slot:top>
                        </template>
                    </v-data-table>    
                </v-row>
                <v-row>
                    <v-col cols="12" sm="4"  md="4">
                        <span class="solicitud" >Total de autos</span>
                    </v-col>
                    <v-col cols="12" sm="4"  md="4">
                        <span class="solicitud" >450</span>
                    </v-col>
                </v-row>
            </div>
            <div class="formulario" v-show="mostrar">
                 <v-row>
                    <v-col  cols="12" sm="2"  md="2" ></v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-btn icon href="https://eqpro.es/wp-content/uploads/2018/11/Ejemplo.pdf" target="_blank">
                            Descargar Reporte mix de autos
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
            mostrarDetalle: false,
            headersReporte: [
                {
                    text: "Flotilla",
                    align: "left",
                    sortable: false,
                    value: "flotilla"
                    },
                    { text: "Estatus de flotilla", value: "estatusFlotilla" },
                    { text: "Total de autos", value: "totalFlotillaEstatus" },
                    { text: 'Ver detalle', value: 'actions', sortable: false }
            ],
            tablaReporte: [
                {
                    id: 1,
                    flotilla: "Company car",
                    estatusFlotilla: "Activo",
                    totalFlotillaEstatus: "450"
                },
                {
                    id: 2,
                    flotilla: "Company car",
                    estatusFlotilla: "Inactivo",
                    totalFlotillaEstatus: "20"
                },
                {
                    id: 3,
                    flotilla: "Leasing",
                    estatusFlotilla: "Activo",
                    totalFlotillaEstatus: "1020"
                },
                {
                    id: 4,
                    flotilla: "Leasing",
                    estatusFlotilla: "Inactivo",
                    totalFlotillaEstatus: "200"
                },
                {
                    id: 5,
                    flotilla: "Service car",
                    estatusFlotilla: "Activo",
                    totalFlotillaEstatus: "200"
                },
                {
                    id: 6,
                    flotilla: "Service car",
                    estatusFlotilla: "Inactivo",
                    totalFlotillaEstatus: "20"
                }
            ],
            headersDetalleReporte: [
                {
                    text: "Flotilla",
                    align: "left",
                    sortable: false,
                    value: "flotillaDet"
                    },
                    { text: "Estatus de flotilla", value: "estatusFlotilla" },
                    { text: "Modelo", value: "modeloDet" },
                    { text: "Total de autos", value: "totalDet" }
            ],
            tablaDetalleReporte: [
                {
                    id: 1,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "A3",
                    totalDet: "100"
                },
                {
                    id: 2,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "A4",
                    totalDet: "20"
                },
                {
                    id: 3,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "A5",
                    totalDet: "7"
                },
                {
                    id: 4,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "Q2",
                    totalDet: "21"
                },
                {
                    id: 5,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "Q3",
                    totalDet: "86"
                },
                {
                    id: 6,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "Q5",
                    totalDet: "47"
                },
                {
                    id: 7,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "A7",
                    totalDet: "114"
                },
                {
                    id: 8,
                    flotillaDet: "Company car",
                    estatusFlotilla: "Activo",
                    modeloDet: "A8",
                    totalDet: "55"
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
                text: 'Mix de Autos',
                disabled: false
                }
            ]
        }
    },
    methods: {
        getseach () {
            this.mostrar = true
        },
            editItem () {
                this.mostrarDetalle = true
            }
    }
}
</script>