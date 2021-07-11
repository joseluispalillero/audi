<template>
 <div id="masterlist-prorroga">
   <NavigationInfo :navigationInfo="navigationInfo"></NavigationInfo>
    <div class="prorroga">
      <div class="load">
          <v-row>
            <v-col class="col-xs-12 col-sm-10 col-md-10" cols="12">
              <v-row>
                <v-col class="col-8" cols="8">
                  <v-text-field label="Numero de Vin" filled></v-text-field>
                </v-col>
                <v-col class="col-4" cols="4">
                <v-btn style="color: #ffffff" class="btn-load" color="#f50537" v-on:click="msg('Cargar')">Buscar</v-btn>            
                </v-col>
              </v-row>
            </v-col>
            <v-divider class="divider-form"></v-divider>
          </v-row>
        </div>
      <div>
        <v-form>
          <v-row>
             <v-col class="col-md-4" cols="12">
              <v-text-field label="Numero de Vin" filled dense></v-text-field>
            </v-col>
            <v-col class="col-md-4" cols="12">
              <v-text-field label="Auto" filled dense></v-text-field>
            </v-col>
            <v-col class="col-md-4" cols="12">
              <v-text-field label="MY" filled dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Descripción modelo" filled dense></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Color" filled dense></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field  label="No motor" filled dense></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Clave comercial" filled dense></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <div>
        <v-form>
          <v-row>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Fecha inicio"></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Fecha fin"></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Plazo"></v-text-field>
            </v-col>
            <v-col class="col-md-3" cols="12">
              <v-text-field label="Poliza"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-form>
          <v-row style="margin: 20px;">
            <v-col>
              <v-btn style="color: #ffffff;" color="#f50537" v-on:click="msg('Cargar')">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationInfo from '../NavigationInfo.vue'
export default {
  components: {NavigationInfo},
  data: () => ({
    navigationInfo: [
      {
        text: 'Home',
        disabled: true,
      },
      {
        text: 'MasterList',
        disabled: true,
      },
      {
        text: 'Prorroga',
        disabled: false
      },
    ],
    


  })
}
</script>


<style scoped>
.v-text {
  margin: 20px 30px;
}
.divider-form {
  background-color: #f50537;
}
.vform{
    margin: 2px 2px 2px 2px;
    width: 1200px;
}
</style>

  
