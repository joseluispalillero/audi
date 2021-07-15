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
                         <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach()" >
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <!--Tabla Reporte-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Reporte tarjeta de gasolina</span>
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
                            Descargar Reporte de tarjeta de gasolina
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
                    text: "IUT",
                    align: "left",
                    sortable: false,
                    value: "iutTab"
                    },
                    { text: "Número de tarjeta", value: "numTarTab" },
                    { text: "Número de tarjetahabiente", value: "thabienTab" },
                    { text: "Tipo de tarjeta", value: "tipoTarTab" },
                    { text: "Fecha asignacion", value: "fechaAsigTab" },
                    { text: "Flotilla", value: "clasificacionTab" },
                    { text: "Estatus", value: "estatusTab" },
                    { text: "Combustible", value: "combustibleTab" },
            ],
            tablaReporte: [
                {
                    id: 1,
                    iutTab: "B0127J06IG2L",
                    numTarTab: "4981883269349580",
                    thabienTab: "Francisco Pinos",
                    tipoTarTab: "ADI",
                    estatusTab: "Activa",
                    clasificacionTab: "Company Car",
                    combustibleTab: "Premium",
                    fechaAsigTab: "11/03/2020",
                },
                {
                    id: 2,
                    iutTab: "B0127J06I1E4",
                    numTarTab: "4981883269349780",
                    thabienTab: "Laura Casas",
                    tipoTarTab: "TIT",
                    estatusTab: "Activa",
                    fechaAsigTab: "08/08/2020",
                    clasificacionTab: "Company Car",
                    combustibleTab: "Premium"
                },
                {
                    id: 3,
                    iutTab: "B0127J06IQ4S",
                    numTarTab: "498188326934986Y",
                    thabienTab: "Javier Guerrero",
                    tipoTarTab: "TIT",
                    estatusTab: "Activa",
                    fechaAsigTab: "29/10/2020",
                    clasificacionTab: "Leasing",
                    combustibleTab: "Diesel"
                },
                {
                    id: 4,
                    iutTab: "B0127J06IA8Y",
                    numTarTab: "4981883269349963",
                    thabienTab: "Paola Montes",
                    tipoTarTab: "TIT",
                    estatusTab: "Activa",
                    fechaAsigTab: "18/07/2020",
                    clasificacionTab: "Leasing",
                    combustibleTab: "Premium"
                },
                {
                    id: 5,
                    iutTab: "B0127J06IG4R",
                    numTarTab: "4981883269349362",
                    thabienTab: "Jorge Barrios",
                    tipoTarTab: "ADI",
                    estatusTab: "Activa",
                    fechaAsigTab: "11/06/2021",
                    clasificacionTab: "Company",
                    combustibleTab: "Diesel"
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
                text: 'Tarjeta de gasolina',
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