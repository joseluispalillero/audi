<template>
    <div id="container-usuarios">
        <div class="usuarios">
            <div class="load">
                <span class="title">Tarjeta de gasolina</span>
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
            <div class="formulario" id="tarGas" v-show="mostrar">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Tarjeta de gasolina</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="IUT" value="B0127J06IG2L" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Número tarjeta" value="4907649729592750" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Nombre de tarjeta" value="Tarjeta de combustible" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="No. de tarjetahabiente" value="542369874521" disabled></v-text-field>
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
                        <v-text-field label="Número de empleado" value="401840" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Nombre del empleado" value="José Pérez Pérez" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Flotilla" value="Company car" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Estatus" value="Activa" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Combustible" value="Premium" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Fecha asignación" value="2021/01/25" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12"  sm="3"  md="3">
                        <v-text-field label="Fecha de vencimiento" value="2021/12/31" disabled></v-text-field>
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
    export default {  
        data () {
            return {
                mostrar: false,
            }
        },
        methods: {
            getseach () {
                this.mostrar = true
            }
        }
    }
</script>