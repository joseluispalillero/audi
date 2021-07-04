<template>
    <div id="container-usuarios">
        <div class="usuarios">
            <div class="load">
                <span class="title"> Mi Auto de Empresa</span>
                <v-text-field  class="search" v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
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

            <div class="historico">
                <v-row>
                    <v-col cols="12" >
                        <span class="historico" >Histórico de autos</span>
                    </v-col>
                </v-row>
                <v-data-table :headers="headers" :items="desserts" :items-per-page="3" class="elevation-1">
                    <template slot="headerCell" slot-scope="props">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                        <span v-on="on">
                            {{ props.header.text }}
                        </span>
                        </template>
                        <span>
                        {{ props.header.text }}
                        </span>
                    </v-tooltip>
                    </template>
                </v-data-table>
            </div> 
            <div id="descargaArchivos">
              <v-row>
                <v-col cols="2" >
                  <v-img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="30" max-width="30"></v-img>
                </v-col>
                <v-col cols="2" >
                   <v-img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="30" max-width="30"></v-img>
                </v-col>
                <v-col cols="2" >
                   <v-img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" max-height="30" max-width="30"></v-img>
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
  export default {  
    data () {
      return {
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
      }
    }
  }
</script>