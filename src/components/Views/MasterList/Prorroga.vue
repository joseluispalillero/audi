<template>
  <div>
    <div class="v-text">
      <v-row>
        <v-col cols="3">
          <v-text-field label="Numero de Vin" filled></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn style="color: #ffffff" color="#f50537" v-on:click="msg('Cargar')">Buscar</v-btn>
        </v-col>
      </v-row>
      <v-divider class="divider-form"></v-divider>
    </div>
    <div>
      <v-form>
          <v-row style="margin: 20px;">
            <v-col>
              <v-text-field label="Numero de Vin" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Auto" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="MY" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Descripción modelo" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Color" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field  label="No motor" filled dense></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Clave comercial" filled dense></v-text-field>
            </v-col>
          </v-row>
      </v-form>
    </div>
    <div>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Fecha inicio"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha fin"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Plazo"></v-text-field>
          </v-col>
          <v-col>
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
</template>

<script>

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
</style>>
  
