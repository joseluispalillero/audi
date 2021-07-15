<template>
    <div id="container-usuarios">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="usuarios">
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Búsqueda</span>
                    </v-col>
                </v-row>
            </div>
            <div class="load">
                <v-text-field  class="search" v-model="filter"  label="Search"  outlined ></v-text-field>
                <v-btn class="btn-load"  color="#f50537" v-on:click="getseach()">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <div class="filter">
                    <v-radio-group  v-model="CampoFilter"  row >
                        <v-radio label="Nombre de la tarjeta" value="busqNomTarjeta" true></v-radio>
                        <v-radio label="Número de tarjeta" value="busqNumTarjeta" true></v-radio>
                        <v-radio label="Número de empleado" value="busqNc" true></v-radio>
                        <v-radio   label="Nombre de empleado" value="busqNombre" ></v-radio>
                        <v-radio   label="IUT" value="busqIut" ></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <!--Tarjeta de gasolina-->
            <div class="formulario" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Consumo de gasolina</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headersTarjetas" :items="tablaTarjetas" 
                        item-key="iutTab" :items-per-page="3" class="elevation-1">
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
            <!--Tarjeta de gasolina-->
            <div class="formulario" id="tarGas" v-show="mostrarTarjeta">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Detalle de consumo de gasolina</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Número de tarjetahabiente" value="542369874521" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Nombre de tarjeta" value="Tarjeta de combustible" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Número tarjeta" value="4907649729592750" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Fecha" value="11/03/16" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Hora" value="16:32" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Movimiento" value="" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Abono" value="230" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Cargo" value="100" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="IUT" value="B0127J06IG2L" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Tipo tarjeta" value="TIT" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Fecha de activación" value="11/03/16 16:34" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Placas" value="T85GLH" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Identificación" value="XXXXXXXXXX" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="NIP" value="8124" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Precio unitario" value="89.00" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Importe" value="100.00" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Consumo" value="100.00" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="IEPS" value="12.00" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="IVA" value="16.00" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Litros" value="210" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Litros" value="210" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Folio operación" value="41253678852" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="RFC" value="QQER740518LN8" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Descripción" value="Carga de gasolina premiun" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Número de empleado" value="401840" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Nombre del empleado" value="José Pérez Pérez" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Usuario de modificación" value="Rafael Pedroza Mendez" disabled></v-text-field>
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
                mostrar: false,
                mostrarTarjeta: false,
                navigationInfo: [
                    {
                    text: 'Home',
                    disabled: true,
                    },
                    {
                    text: 'Fleet',
                    disabled: true,
                    },
                    {
                    text: 'Consumo de gasolina',
                    disabled: false
                    }
                ],
                headersTarjetas: [
                    {
                    text: "IUT",
                    align: "left",
                    sortable: false,
                    value: "iutTab"
                    },
                    { text: "Número de tarjeta", value: "numTarTab" },
                    { text: "Número de tarjetahabiente", value: "thabienTab" },
                    { text: "Tipo de tarjeta", value: "tipoTarTab" },
                    { text: "Fecha de activación", value: "fechaActiv" },
                    { text: "Folio de operacion", value: "folioAutTab" },
                    { text: "RFC", value: "rfcTab" },
                    { text: "Nombre del empleado", value: "nombreEmp" },
                    { text: 'Ver consumo', value: 'actions', sortable: false }
                ],
                tablaTarjetas: [
                    {
                        id: 1,
                        iutTab: "B0127J06IG2L",
                        numTarTab: "4981883269349580",
                        thabienTab: "Francisco Pinos",
                        tipoTarTab: "ADI",
                        fechaActiv: "11/03/2016",
                        folioAutTab: "74532",
                        rfcTab: "AADF900625AS7",
                        nombreEmp: "Francisco Pinos"
                    },
                    {
                        id: 2,
                        iutTab: "B0127J06I1E4",
                        numTarTab: "4981883269349780",
                        thabienTab: "Laura Casas",
                        tipoTarTab: "TIT",
                        fechaActiv: "11/03/2016",
                        folioAutTab: "74532",
                        rfcTab: "EEDF780220PT7",
                        nombreEmp: "Laura Casas"
                    },
                    {
                        id: 3,
                        iutTab: "B0127J06IQ4S",
                        numTarTab: "498188326934986Y",
                        thabienTab: "Javier Guerrero",
                        tipoTarTab: "TIT",
                        fechaActiv: "11/03/2016",
                        folioAutTab: "74532",
                        rfcTab: "QQER900512",
                        nombreEmp: "Javier Guerrero"
                    },
                    {
                        id: 4,
                        iutTab: "B0127J06IA8Y",
                        numTarTab: "4981883269349963",
                        thabienTab: "Paola Montes",
                        tipoTarTab: "TIT",
                        fechaActiv: "11/03/2016",
                        folioAutTab: "74532",
                        rfcTab: "QQER900512",
                        nombreEmp: "Paola Montes"
                    },
                    {
                        id: 5,
                        iutTab: "B0127J06IG4R",
                        numTarTab: "4981883269349362",
                        thabienTab: "Jorge Barrios",
                        tipoTarTab: "ADI",
                        fechaActiv: "25/08/2020",
                        folioAutTab: "74545",
                         rfcTab: "BBAR850809",
                        nombreEmp: "Jorge Barrios"
                    }
                ]
            }
        },
        methods: {
            getseach () {
                this.mostrar = true
            },
            editItem () {
                this.mostrarTarjeta = true
            }
        }
    }
</script>
