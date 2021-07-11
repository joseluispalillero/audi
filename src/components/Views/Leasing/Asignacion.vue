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
 <!--               <span class="title">Asignación</span> -->
                <!--v-text-field  class="search" v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
                <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn-->
                <v-row>
                    <v-col  cols="9" sm="9"  md="9" >
                        <v-text-field  class="search" v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
                    </v-col>
                    <v-col  cols="2" sm="2" md="2" >
                        <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
                        <v-icon>mdi-magnify</v-icon>
                        <div class="d-none d-sm-flex d-lg-none">Buscar</div>
                        </v-btn>
                    </v-col>
                </v-row>
                <div class="filter">
                    <v-radio-group  v-model="CampoFilter"  row >
                        <v-radio label="Número de empleado" value="nc" true></v-radio>
                        <v-radio   label="Nombre de empleado" value="nombreUsuario" ></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <div class="formulario">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Solicitudes pendientes por atender</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :headers="headers" :items="desserts" item-key="folSol" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template><template v-slot:item.actions="{  }">
                            <v-icon  small  class="mr-2" @click="editItem()" > mdi-pencil  </v-icon>
                        </template>
                    </v-data-table>  
                </v-row>        
            </div>
            <!--Datos de la solicitud-->
            <div class="formulario" v-show="mostrarSolicitud">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Solicitud</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Folio de la solicitud" value="000058" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Estatus de la solicitud" value="Solicitud aprobada" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Número de empleado" value="4532" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Nombre del empleado" value="José Perez Perez" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Modelo" value="A3" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Tipo de solicitud" value="Nuevo" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fecha estimada de entrega" value="2021/06/20" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fecha solicitud" value="2021/06/21" disabled></v-text-field>
                    </v-col>
                </v-row>
            </div>
            <!--Modelos disponibles-->
            <div class="formulario" v-show="mostrarSolicitud">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Módelos disponibles</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table :single-select="singleSelect" show-select  v-model="selectedModelos" :headers="headersModelos" :items="tabModelos" item-key="modVin" :items-per-page="3" class="elevation-1">
                        <template v-slot:top>
                        </template>
                    </v-data-table>    
                </v-row>
            </div>
            <!--Asociación usuario modelo-->
            <div class="formulario" v-show="mostrarSolicitud">
                <v-row>
                    <v-col cols="12" >
                        <span class="solicitud" >Captura de datos</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Número de empleado" value="4536" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Nombre del empleado" value="José Pérez Pérez" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Número de contrato" value="A000478" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fecha de contrato" value="2021/06/28" disabled></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Tarifa de renta" value="$ 4000.00"></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Plazo de contrato" value="12"></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Kilometraje de contrato" value="40,000"></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fecha de inicio de contrato" prepend-icon="mdi-calendar"  readonly  @click="dialogFechaIniC = true" ></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fecha fin de contrato" prepend-icon="mdi-calendar"  readonly  @click="dialogFechaFinC = true" ></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Fianza" value="2,500"></v-text-field>
                    </v-col>
                    <v-col  cols="12" sm="3"  md="3" >
                        <v-text-field label="Penalización por terminación anticipada" value="50,000"></v-text-field>
                    </v-col>
                </v-row>

               <v-dialog   ref="dialogFechaIniC" v-model="dialogFechaIniC" persistent  width="290px"  >
                    <v-date-picker color="#f50537">
                        <v-date-picker v-model="picker"></v-date-picker>
                        <v-spacer></v-spacer>
                        <v-btn  text color="#f50537"  @click="dialogFechaIniC = false"  >Cancel</v-btn>
                        <v-btn text color="#f50537"  @click="dialogFechaIniC = false" >OK</v-btn>
                    </v-date-picker>
                </v-dialog>
                <v-dialog   ref="dialogFechaFinC" v-model="dialogFechaFinC" persistent  width="290px"  >
                    <v-date-picker color="#f50537">
                        <v-date-picker v-model="picker"></v-date-picker>
                        <v-spacer></v-spacer>
                        <v-btn  text color="#f50537"  @click="dialogFechaFinC = false"  >Cancel</v-btn>
                        <v-btn text color="#f50537"  @click="dialogFechaFinC = false" >OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </div>
            <br /> 
            <div>
                <v-row>
                    <v-col  cols="6" sm="2"  md="2" >
                        <v-btn  color="#f50537" dark>Cancelar</v-btn>
                    </v-col>
                    <v-col  cols="6" sm="2"  md="2" >
                        <v-btn  color="#f50537" dark>Guardar</v-btn>
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
            navigationInfo: [
                {
                text: 'Home',
                disabled: true,
                },
                {
                text: 'Leasing',
                disabled: true,
                },
                {
                text: 'Asignación',
                disabled: false
                },
            ],
            selected: [{}],
            selectedModelos: [{}],
            mostrarSolicitud: false,
            headers: [
                {
                text: "Folio de la solicitud",
                align: "left",
                sortable: false,
                value: "folSol"
                },
                { text: "Estatus de la solicitud", value: "estSol" },
                { text: "Número de empleado", value: "numEmp" },
                { text: "Nombre del empleado", value: "nomEmp" },
                { text: "Modelo", value: "modelo" },
                { text: "Tipo de solicitud", value: "tipoSol" },
                { text: "Fecha estimada de entrega", value: "fechaEntrega" },
                { text: "Fecha solicitud", value: "fechaSol" },
                { text: 'Ver Solicitud', value: 'actions', sortable: false }
            ],
            headersModelos: [
                {
                text: "VIN",
                align: "left",
                sortable: false,
                value: "modVin"
                },
                { text: "Auto", value: "modAuto" },
                { text: "MY", value: "modMy" },
                { text: "Descripción modelos", value: "modDescripcion" },
                { text: "Color", value: "modColor" },
                { text: "Mes Pedido", value: "modMesPed" },
                { text: "Fecha inicio contrato", value: "modFechaIniC" },
                { text: "Fecha fin contrato", value: "modFechaFinC" },
                { text: "Plazo del contrato", value: "modPlazoC" }
            ],
            desserts: [
                {
                    id: 1,
                    folSol: "000058",
                    estSol: "Solicitud aprobada",
                    numEmp: "4532",
                    nomEmp: "José Perez Perez",
                    modeloT: "A3",
                    tipoSol: "Nuevo",
                    fechaEntrega: "2021/06/20",
                    fechaSol: "2021/06/01"
                },
                {
                    id: 2,
                    folSol: "000059",
                    estSol: "Solicitud aprobada",
                    numEmp: "4533",
                    nomEmp: "Juan Guerrero Perez",
                    modeloT: "A1",
                    tipoSol: "Renovación",
                    fechaEntrega: "2021/06/20",
                    fechaSol: "2021/06/01"
                },
                {
                    id: 3,
                    folSol: "000100",
                    estSol: "Solicitud aprobada",
                    numEmp: "4501",
                    nomEmp: "Emilio Sanchez Gutierrez",
                    modeloT: "Q3",
                    tipoSol: "Nuevo",
                    fechaEntrega: "2021/06/20",
                    fechaSol: "2021/06/01"
                },
                {
                    id: 4,
                    folSol: "041236",
                    estSol: "Solicitud aprobada",
                    numEmp: "7896",
                    nomEmp: "Jorge Peña Ortega",
                    modeloT: "Q5",
                    tipoSol: "Renovación",
                    fechaEntrega: "2021/06/20",
                    fechaSol: "2021/06/01"
                },
                {
                    id: 5,
                    folSol: "874523",
                    estSol: "Solicitud aprobada",
                    numEmp: "7563",
                    nomEmp: "Javier Guerrero Saldivar",
                    modeloT: "A3",
                    tipoSol: "Nuevo",
                    fechaEntrega: "2021/06/20",
                    fechaSol: "2021/06/01"
                }
            ],
            usrAut: [
                { nombreAut:'José Sanchez', parentAut: 'Hermano', icon: 'mdi-delete' },
                { nombreAut:'Lucrecia Martinez', parentAut: 'Pareja', icon: 'mdi-delete' },
                { nombreAut:'Juan Sanchez', parentAut: 'Hijo', icon:  'mdi-delete' },
            ],
            tabModelos: [
                {
                    id: 1,
                    modVin: "QA55665256HJJL7H",
                    modAuto: "A3",
                    modMy: "2019",
                    modDescripcion: "A3 estandar equipado",
                    modColor: "Plata",
                    modMesPed: "Marzo",
                    modFechaIniC: "2020/10/20",
                    modFechaFinC: "2021/10/20",
                    modPlazoC: "12"
                },
                {
                    id: 2,
                    modVin: "QA556652445355F7H",
                    modAuto: "A3",
                    modMy: "2020",
                    modDescripcion: "A3 estandar",
                    modColor: "Rojo",
                    modMesPed: "Febrero",
                    modFechaIniC: "2020/10/20",
                    modFechaFinC: "2022/10/20",
                    modPlazoC: "24"
                },
                {
                    id: 3,
                    modVin: "QA55665QWE23L7H",
                    modAuto: "A3",
                    modMy: "2021",
                    modDescripcion: "A3 automatico",
                    modColor: "Nego",
                    modMesPed: "Junio",
                    modFechaIniC: "2020/11/14",
                    modFechaFinC: "2021/11/14",
                    modPlazoC: "12"
                },
                {
                    id: 4,
                    modVin: "QA55665WEE45112345H",
                    modAuto: "A3",
                    modMy: "2019",
                    modDescripcion: "A3 estandar equipado",
                    modColor: "Arena",
                    modMesPed: "Enero",
                    modFechaIniC: "2019/08/28",
                    modFechaFinC: "2022/08/28",
                    modPlazoC: "36"
                },
                {
                    id: 5,
                    modVin: "QA55665256HJJL7H",
                    modAuto: "A3",
                    modMy: "2019",
                    modDescripcion: "A3 estandar equipado",
                    modColor: "Plata",
                    modMesPed: "Marzo",
                    modFechaIniC: "2020/10/20",
                    modFechaFinC: "2021/10/20",
                    modPlazoC: "12"
                }
                
            ]
        }
    },
    methods: {
        toggle(isSelected,select) {
            select(!isSelected)
        },
        toggleModelos(isSelected,select) {
            select(!isSelected)
        },
        closeGuia () {
            this.dialogGuia = false
        },
        editItem () {
            this.mostrarSolicitud = true
        }
    }
}
</script>
