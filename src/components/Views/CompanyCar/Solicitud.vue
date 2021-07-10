<template>
 <div id="container-usuarios">
    <div class="usuarios">
    <div class="load">
         <span class="title"> Solicitud  </span>
         <v-text-field  class="search" v-model="filter"  label="Search"  :rules="searchRules"  outlined ></v-text-field>
         <v-btn class="btn-load"  color="#f50537"  v-on:click="getseach(CampoFilter,filter)" >
             <v-icon>mdi-magnify</v-icon>
         </v-btn>
         <div class="filter">
         <v-radio-group  v-model="CampoFilter"  row >
            <v-radio label="Número de empleado" value="nc" true></v-radio>
            <v-radio   label="Nombre de empleado" value="nombreUsuario" ></v-radio>
         </v-radio-group>
         </div>
    </div>
    <div class="formularioLectura">
        <v-row >
          <v-col cols="4" >
            <v-text-field ref="Nempleado" v-model="Nempleado"  label="Número de empleado" disabled  outlined ></v-text-field>
          </v-col>
          <v-col cols="4" >
            <v-text-field ref="NomEmpleado" v-model="NomEmpleado"  label="Nombre del empleado" disabled outlined ></v-text-field>
          </v-col>
          <v-col cols="4" >
            <v-text-field ref="UO" v-model="UO"  label="Unidad Organizacional" disabled outlined ></v-text-field>
          </v-col>
          <v-col cols="12" >
            <v-text-field ref="GrupoPersona" v-model="GrupoPersona"  label="Grupo Persona" disabled outlined ></v-text-field>
          </v-col>
        </v-row>
    </div>

    <div class="formulario">
      <v-form v-model="valid" >
        <v-row >
         <v-col cols="4" >
             <v-text-field ref="Cfamiliar" v-model="Cfamiliar"  label="Clasificación familiar" disabled outlined></v-text-field>
          </v-col>
          <v-col cols="4" >
            <v-text-field ref="licencia" v-model="licencia" :rules="licenciaRules" label="Número de licencia de conducir*" required outlined ></v-text-field>
          </v-col>
          <v-col cols="3" >
            <v-text-field label="Fecha de vencimiento de licencia de conducir"  required :rules="dateFechaRules"   v-model="FechaVencimiento" outlined  prepend-icon="mdi-calendar"  readonly  @click="dialogFecha = true"  ></v-text-field>
          </v-col>
          <v-col cols="1" >
             <v-checkbox label="Permanente" v-model="Permanente" v-on:click="DateLicencia" ></v-checkbox>
          </v-col>
          <v-col cols="12" >
             <span class="solicitud" >Solicitud de modelo</span>
          </v-col>
           <v-col cols="4" >
             <span class="A1primera" >Primer auto*</span>
          </v-col>
          <v-col cols="4" >
             <v-select  label="Primera opción" :items="A1Primera"   required :rules="A1PrimeraRules" v-model="A1PrimeraOpcion" outlined  >
             </v-select>
          </v-col>
          <v-col cols="4" >
             <v-select  label="Segunda opción" :items="A1Segunda"   required :rules="A1SegundaRules" v-model="A1SegundaOpcion" outlined  >
             </v-select>
          </v-col>
          <v-col cols="4" v-show="tipoGrupoPersona" >
             <span class="A1primera" >Segundo auto</span>
          </v-col>
          <v-col cols="4" v-show="tipoGrupoPersona" >
             <v-select  label="Primera opción" :items="A2Primera"    v-model="A2PrimeraOpcion" outlined  >
             </v-select>
          </v-col>
          <v-col cols="4" v-show="tipoGrupoPersona" >
             <v-select  label="Segunda opción" :items="A2Segunda"    v-model="A2SegundaOpcion"  outlined >
             </v-select>
          </v-col>
          <v-col cols="12" >
            <a class="link" href="#" >
               <span class="text">Consulta Anexo 2 Matriz de autos de empresa </span>
            </a>
          </v-col>
          <v-col cols="12" >
             <span class="motivo" >Motivo*</span>
          </v-col>
          <v-col cols="12" >
          <v-radio-group  v-model="motivo" required :rules="motivoRules" row  >
             <v-radio label="Nuevo ingreso" value="1"  ></v-radio>
             <v-radio   label="Renovación" value="2" style="margin:0 0 0 15%;" ></v-radio>
             <v-radio   label="Promoción" value="3" style="margin:0 0 0 17%;"></v-radio>
             <v-radio   label="Otro" value="4" style="margin:0 0 0 17%;"></v-radio>
          </v-radio-group>
          </v-col>
          <v-col cols="12">
          <v-checkbox v-model="condiciones" required :rules="condicionesRules" >
            <template v-slot:label>
              <div>
                He leído la “Regulación de Audi México UAM_012: Vehículos de la Compañía” y estoy totalmente de
                acuerdo con los puntos establecidos en él, así como los anexos que le acompañan, comprometiéndome a
                cumplirlo en todas y cada una de sus partes; reconociendo que la empresa en cualquier momento podrá
                suspender el presente lineamiento o parte de él, así como hacerle modificaciones tanto al contenido como
                a sus anexos, según las necesidades de la misma.
              </div>
            </template>
          </v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-btn  class="btn-add" color="#f50537" @click="showAlert" :disabled="!valid" href="Archivo.pdf"  download >Guardar </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <div>
        <b-alert  :show="dismissCountDown"  dismissible  variant="success"  @dismissed="dismissCountDown=0"  @dismiss-count-down="countDownChanged">
          Proceso exitoso
        </b-alert>
     </div>
      <v-dialog   ref="dialogFecha"   v-model="dialogFecha" :return-value.sync="FechaVencimiento" persistent  width="290px"  >
        <v-date-picker v-model="FechaVencimiento"  scrollable  >
          <v-spacer></v-spacer>
          <v-btn  text   @click="dialogFecha = false"  > Cancel </v-btn>
          <v-btn text   @click="$refs.dialogFecha.save(FechaVencimiento)"  >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </div>
 </div>
</template>

<script>

  export default {
    data: () => ({
      valid: false,
      dismissSecs: 10,
      dismissCountDown: 0,
      tipoGrupoPersona: true,
      mensaje:'Solicitud Realizada con éxito',
      condiciones:'',
      filter: '',
      Permanente: false,
      CampoFilter: 'nc',
      search: '',
      Nempleado: '835579',
      NomEmpleado: 'Eduardo Alan Garrido',
      GrupoPersona: 'MK Gerente/At/T+ (Local/Impat Con familia 3+ hijos)',
      UO: 'Unidad organizacional',
      Cfamiliar: 'Clasificacion familiar',
      motivo: '',
      A1PrimeraOpcion:'',
      A1SegundaOpcion:'',
      A2PrimeraOpcion:'',
      A2SegundaOpcion:'',
      FechaVencimiento: '',
      dialogFecha: false,
      dateFechaRules: [ v => !!v || 'Fecha de vencimiento de licencia  es requerido'   ],
      A1Primera: [  'A1' , 'A3' ,  'A4' ,  'A6' ],
      A1Segunda: [  'A1' , 'A3' ,  'A4' ,  'A6' ],
      A2Primera: [  'R8' , 'TT' ,  'Q3' ,  'Q5' ],
      A2Segunda: [  'R8' , 'TT' ,  'Q3' ,  'Q5' ],
      licencia: '',
      lastname: '',
      lastnameM: '',
      licenciaRules: [  v => !!v || 'Número de licencia es requerido' ],
      motivoRules: [  v => !!v || 'Motivo es requerido' ],
      A1PrimeraRules: [  v => !!v || 'Primera opción es requerido' ],
      A1SegundaRules: [  v => !!v || 'Segunda opción es requerido'  ],
      condicionesRules: [  v => !!v || 'Aceptar terminos y condiciones'  ],
  }),
  methods: {
    registerUser () {
      console.log('envio de registro')
       alert(this.mensaje)
    },
    DateLicencia () {
        if(this.Permanente ){
            this.FechaVencimiento='9999-12-31'
        }else{
            this.FechaVencimiento=''
        }

    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
