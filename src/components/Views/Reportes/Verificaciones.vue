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
                            Fin Verificación
                        </v-card-text>
                        <div class="load">
                            <v-text-field label="Fecha inicio"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                            <v-text-field label="Fecha fin"   prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="12"  sm="2"  md="2">
                        <v-text-field label="VIN"></v-text-field>    
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
                        <span class="solicitud" >Reporte verificaciones</span>
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
                            Descargar Reporte de verificaciones
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
                value: "vin"
                },
                { text: "Auto", value: "auto" },
                { text: "Flotilla", value: "flotilla" },
                { text: "Fin contrato", value: "finCont" },
                { text: "Tipo de verificación", value: "tipoVerif" },
                { text: "Fin verifiación", value: "finVerif" },
                { text: "Estatus vigencía", value: "estVig" },
                { text: "Usuario de modificación", value: "usrMod" }
            ],
            tablaReporte: [
                {
                    id: 1,
                    auto: "A3",
                    vin: "WAUZZZFY0H2030210",
                    finCont: "31/12/9999",
                    flotilla: "Service Car",
                    usrMod: "Gerardo Robles Castillo",
                    tipoVerif: "00",
                    finVerif: "08/2021",
                    estVig: "30 días"
                },
                 {
                    id: 2,
                    auto: "Q3",
                    vin: "WAUDFA8U3ER051005",
                    finCont: "2015/04/08",
                    flotilla: "Company car",
                    usrMod: "Gerardo Robles Castillo",
                    tipoVerif: "00",
                    finVerif: "12/2021",
                    estVig: "Vigente"
                },
                 {
                    id: 3,
                    auto: "A4",
                    vin: "WAUAFC8K4EN021113",
                    finCont: "2015/06/22",
                    flotilla: "Company Car",
                    usrMod: "Gerardo Robles Castillo",
                    tipoVerif: "0",
                    finVerif: "011/2021",
                    estVig: "Vigente"
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
                text: 'Verificaciones',
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