<template>
  <div>
    <div class="v-text">
      <v-row>
        <v-col cols="3">
          <v-text-field label="Numero de Vin" v-model="txtbuscar" filled></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn style="color: #ffffff" color="#f50537" v-on:click="getseach(txtbuscar)">Buscar</v-btn>
          <v-checkbox v-model="checkbox" :label="`Historial`"></v-checkbox>
        </v-col>
        <v-col cols="1" style="font-size: 12px">
          <v-checkbox v-model="Flotilla" :label="`Flotilla`"></v-checkbox>
          <v-checkbox v-model="Company" :label="`Company`"></v-checkbox>
        </v-col>
        <v-col cols="1">
          <v-checkbox v-model="Inactivos" :label="`Inactivos`"></v-checkbox>
          <v-checkbox v-model="Leasing" :label="`Leasing`"></v-checkbox>
        </v-col>
        <v-col cols="1">
          <v-checkbox v-model="Estatus" :label="`Estatus`"></v-checkbox>
          <v-checkbox v-model="Activos" :label="`Activos`"></v-checkbox>
        </v-col>
        <v-col cols="2">
          <v-checkbox
            v-model="Autoservicio"
            :label="`Auto de servicio`"
          ></v-checkbox>
          <v-checkbox v-model="Poractivar" :label="`Por activar`"></v-checkbox>
        </v-col>
      </v-row>
      <v-divider class="divider-form"></v-divider>
    </div>
    <div>
      <v-form>
        <v-row style="margin: 20px 20px -40px 20px;">
          <v-col>
            <v-text-field value="test" label="Numero de Vin" filled readonly v-model="editedItem.nc"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Auto" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="MY" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Descripción modelo" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Color" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field  label="No motor" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Clave comercial" filled readonly></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px 20px -40px 20px;">
          <v-col>
            <v-text-field label="Placa" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Contrato" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Inicio contrato" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fin contrato" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Plazo" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Renta" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Precio" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Póliza" filled readonly></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Inicio seguro" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fin seguro" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha entrega" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha devolución" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Km excedente" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Costo Kilometraje" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Avalúo" filled readonly></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha avalúo" filled readonly></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Año pedido" required></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Mes pedido"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Inicio contrato"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fin contrato"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Plazo"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Concesionario"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="No motor"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Color"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Placa"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Póliza"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fin seguro"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Contrato"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="No activo"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Precio"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Renta"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Estatus VWFS"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Fecha entrega"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha devolución"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Tipo terminación"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Tipo cierre"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-text-field label="Km Excedente"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Costo kilometraje"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Avalúo"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="Fecha avalúo"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-form>
        <v-row style="margin: 20px;">
          <v-col>
            <v-btn style="color: #ffffff; left: 200px; top: 0px; left: 0px;" color="#f50537" v-on:click="msg('Cargar')">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
      editedItem: {
        nc: '',
        nombre_usuario: '',
        id_rol: '',
        username: '',
        cve_unidad_org: '',
        nombre_unidad_org: '',
        correo: '',
        clasif_fam : '',
      },

      async getseach (campoFilter,search) {
              if(search == ''){
                  console.log('No hay datos')
              }else{
                  console.log(campoFilter , search)
                  let busqueda={campoFilter : search}

                  let params = '';
                  if (typeof busqueda !== 'undefined' && busqueda !== null  )
                    params= params.concat(`?${campoFilter}=${busqueda.campoFilter}`);

                  const url = `https://y3a2p5cww7.execute-api.us-west-2.amazonaws.com/Prod/masterlist${params}`
                  try {
                      console.log(url)
                      const response = await axios.get(url);
                      this.desserts = response.data.result

                  } catch (error) {
                      console.error(error);
                  }

              }
            },
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
</style>>
  
