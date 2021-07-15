<template>
    <div id="container-miAuto">
        <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
        <div class="miAuto">
            <div class="load">
                <v-text-field  class="search" v-model="filter"  label="Buscar"  :rules="searchRules"  outlined ></v-text-field>
                <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <div class="filter">
                <v-radio-group  v-model="CampoFilter"  row >
                    <v-radio label="Número de empleado" value="numeroEmpleado" true></v-radio>
                    <v-radio   label="Nombre de empleado" value="nombreEmpleado" ></v-radio>
                </v-radio-group>
                </div>
            </div>

            <div class="TablesCar">
              <span class="title"> Histórico de autos  </span>
              <v-data-table  :headers="headers" :items="desserts"  sort-by="vin"  class="elevation-1" >
                 <template v-slot:no-data>
                   <span>No se encontraron Datos</span>
                 </template>
               </v-data-table>
            </div> 
            <div class="descargaArchivos">
              <v-row>
                <v-col cols="2" >
                  <v-img  src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="50" max-width="40"></v-img>
                </v-col>
                <v-col cols="2" >
                   <v-img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="50" max-width="40"></v-img>
                </v-col>
                <v-col cols="2" >
                   <v-img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="50" max-width="40"></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2" >
                  <span class="title"> Contrato</span>
                </v-col>
                <v-col cols="2" >
                  <span class="title"> Solicitud</span>
                </v-col>
                <v-col cols="2" >
                  <span class="title"> Pagare</span>
                </v-col>
              </v-row>
            </div>
        </div>
   </div>
 </template>
 <script> 
 import NavigationInfo from "../NavigationInfo";

  export default {
    components: {NavigationInfo},
     data: () => ({
         navigationInfo: [
          {
            text: 'Home',
            disabled: true,
          },
          {
            text: 'Company Car',
            disabled: true,
          },
          {
            text: 'Mi auto empresa',
            disabled: false
          },
        ],
        headers: [
          { text: 'VIN', value: 'vin' },
          { text: 'Descripción del modelo', value: 'descModelo' },
          { text: 'MY', value: 'my' },
          { text: 'Placas', value: 'placas' },
          { text: 'Fecha inicio de contrato', value: 'inicioContrato' },
          { text: 'Fecha fin de contrato', value: 'finContrato' },
          { text: 'Póliza', value: 'poliza' },
          { text: 'Color', value: 'color' }
        ],
        desserts: [
          {
            vin: 'WAUZZZFY0H2030210',
            descModelo: 'Audi Q5 S tronic Quattro TFSI',
            my: '2018',
            placas: 'A52EDF',
            inicioContrato: '11/07/2020',
            finContrato: '31/12/9999',
            poliza: '52143623',
            color: 'Azul',
          },
          {
            vin: '3U5AFCFY1J2400773',
            descModelo: 'Audi Q5 2.0 TFSI  252 HP  Dynamic S tronic Quattro',
            my: '2018',
            placas: 'ALG789',
            inicioContrato: '10/07/2019',
            finContrato: '10/07/2020',
            poliza: '52143678',
            color: 'Plata',
          },
          {
            vin: 'WAUAGC4L0FD031964',
            descModelo: 'AUDI Q7 3.0L TFSI QUATTRO TIPTRONIC (Blindaje VR6)',
            my: '2015',
            placas: 'X42QWE',
            inicioContrato: '09/07/2018',
            finContrato: '09/07/2019',
            poliza: '52143623',
            color: 'Rojo',
          },
          {
            vin: '3U5AFCFY1J24030R5',
            descModelo: 'Audi Q5 2.0 TFSI  252 HP  Dynamic S tronic Quattro',
            my: '2019',
            placas: 'XPE234',
            inicioContrato: '10/07/2019',
            finContrato: '10/07/2020',
            poliza: '52143640',
            color: 'Negro',
          },
        ]
      })
  }
</script>
