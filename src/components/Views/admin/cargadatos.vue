<template>
 <div id="Carga">
  <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="selection-carga">
        <span class="title">Seleccione el catálogo al subir al sistema.</span>
         <v-radio-group class="radio"  v-model="radios" >
           <v-radio  label="Flotilla"   color="#f50437" value="Flotilla" v-on:click="changeRout(radios)"> </v-radio>
           <v-radio label="Foto multas" color="#f50437" value="FotoMultas" v-on:click="changeRout(radios)"></v-radio>
           <v-radio label="Pagos VW FS" color="#f50437" value="PagosVWFS" v-on:click="changeRout(radios)"></v-radio>
           <v-radio label="Tarjetas de gasolina" color="#f50437"  value="TarjetasDeGasolina" v-on:click="changeRout(radios)" ></v-radio>
           <v-radio label="Servicios de mantenimiento"   color="#f50437" value="Mantenimiento" v-on:click="changeRout(radios)" ></v-radio>
           <v-radio label="APP Settings" color="#f50437" value="APPSettings" v-on:click="changeRout(radios)" ></v-radio>
           <v-radio label="APP Messages" color="#f50437" value="APPMessages"  v-on:click="changeRout(radios)" ></v-radio>
           <v-radio label="Verificaciones" color="#f50437" value="Verificaciones"  v-on:click="changeRout(radios)" ></v-radio>
           <v-radio label="Consumo de gasolina " color="#f50437" value="ConsumoGasolina"  v-on:click="changeRout(radios)" ></v-radio>
         </v-radio-group>
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
            text: 'Admin',
            disabled: true,
          },
          {
            text: 'Carga datos',
            disabled: false
          },
       ],
       dialog: false
     }),
       methods: {
         msg: function (mensaje) {
            alert(mensaje)
         },
         changeRout : function (select) {
             this.$router.push({ path: '/admin/'+ select })
          }
       }
  }
</script>