import vue from 'vue'
import Router from 'vue-router'

vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName "home" */ './components/Views/Home.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName "About" */ './components/Views/About.vue')
        },
        /* ====== MasterList ====== */
        {
            path: '/MasterList/Modificar',
            name: 'Modificar',
            component: () => import(/* webpackChunkName "modificar" */ './components/Views/MasterList/Modificar.vue')
        },
        {
            path: '/MasterList/Traspaso',
            name: 'Traspaso',
            component: () => import(/* webpackChunkName "traspaso" */ './components/Views/MasterList/Traspaso.vue')
        },
        {
            path: '/MasterList/Prorroga',
            name: 'Prorroga',
            component: () => import(/* webpackChunkName "prorroga" */ './components/Views/MasterList/Prorroga.vue')
        },
        {
            path: '/MasterList/Baja',
            name: 'Baja',
            component: () => import(/* webpackChunkName "baja" */ './components/Views/MasterList/Baja.vue')
        },
        {
            path: '/MasterList/Detalle',
            name: 'Detalle',
            component: () => import(/* webpackChunkName "detalle" */ './components/Views/MasterList/Detalle.vue')
        },
        /* ====== admin ====== */
        {
            path: '/admin/cargadatos',
            name: 'cargadatos',
            component: () => import(/* webpackChunkName "cargadatos" */ './components/Views/admin/cargadatos')
        },
        {
            path: '/admin/Flotilla',
            name: 'Flotilla',
            component: () => import(/* webpackChunkName "Flotilla" */ './components/Views/admin/Flotilla')
        },
        {
            path: '/admin/FotoMultas',
            name: 'FotoMultas',
            component: () => import(/* webpackChunkName "FotoMultas" */ './components/Views/admin/FotoMultas')
        },
        {
            path: '/admin/PagosVWFS',
            name: 'PagosVWFS',
            component: () => import(/* webpackChunkName "PagosVWFS" */ './components/Views/admin/PagosVWFS')
        },
        {
            path: '/admin/TarjetasDeGasolina',
            name: 'TarjetasDeGasolina',
            component: () => import(/* webpackChunkName "TarjetasDeGasolina" */ './components/Views/admin/TarjetasDeGasolina')
        },
        {
            path: '/admin/Mantenimiento',
            name: 'Mantenimiento',
            component: () => import(/* webpackChunkName "Mantenimiento" */ './components/Views/admin/Mantenimiento')
        },
        {
            path: '/admin/APPSettings',
            name: 'APPSettings',
            component: () => import(/* webpackChunkName "APPSettings" */ './components/Views/admin/APPSettings')
        },
        {
            path: '/admin/APPMessages',
            name: 'APPMessages',
            component: () => import(/* webpackChunkName "APPMessages" */ './components/Views/admin/APPMessages')
        },
        {
            path: '/admin/Verificaciones',
            name: 'Verificaciones',
            component: () => import(/* webpackChunkName "Verificaciones" */ './components/Views/admin/Verificaciones')
        },
        {
            path: '/admin/ConsumoGasolina',
            name: 'ConsumoGasolina',
            component: () => import(/* webpackChunkName "ConsumoGasolina" */ './components/Views/admin/ConsumoGasolina')
        },
        {
            path: '/admin/CatalogoSistema',
            name: 'CatalogoSistema',
            component: () => import(/* webpackChunkName "CatalogoSistema" */ './components/Views/admin/CatalogoSistema')
        },
        {
            path: '/admin/Usuarios',
            name: 'Usuarios',
            component: () => import(/* webpackChunkName "Usuarios" */ './components/Views/admin/Usuarios')
        },
        {
            path: '/admin/Perfiles',
            name: 'Perfiles',
            component: () => import(/* webpackChunkName "Perfiles" */ './components/Views/admin/Perfiles')
        },
              /* ====== Company Car ====== */
        {
            path: '/CompanyCar/Solicitud',
            name: 'Solicitud',
            component: () => import(/* webpackChunkName "Solicitud" */ './components/Views/CompanyCar/Solicitud')
        },
        {
            path: '/CompanyCar/Asignacion',
            name: 'Asignacion',
            component: () => import(/* webpackChunkName "Asignacion" */ './components/Views/CompanyCar/Asignacion')
        },
        {
            path: '/CompanyCar/MiAutoEmpresa',
            name: 'MiAutoEmpresa',
            component: () => import(/* webpackChunkName "MiAutoEmpresa" */ './components/Views/CompanyCar/MiAutoEmpresa')
        },
         /* ====== Leasing ====== */
         {
            path: '/Leasing/Solicitud',
            name: 'Solicitud',
            component: () => import(/* webpackChunkName "Solicitud" */ './components/Views/Leasing/Solicitud')
        },
        {
            path: '/Leasing/Asignacion',
            name: 'Asignacion',
            component: () => import(/* webpackChunkName "Asignacion" */ './components/Views/Leasing/Asignacion')
        }
        ,
        {
            path: '/Leasing/MiLeasing',
            name: 'MiLeasing',
            component: () => import(/* webpackChunkName "MiLeasing" */ './components/Views/Leasing/MiLeasing')
        },
        /* ====== Fleet ====== */
        {
           path: '/Fleet/Multas',
           name: 'Multas',
           component: () => import(/* webpackChunkName "Multas" */ './components/Views/Fleet/Multas')
        },
        {
            path: '/Fleet/Verificaciones',
            name: 'Verificaciones',
            component: () => import(/* webpackChunkName "Verificaciones" */ './components/Views/Fleet/Verificaciones')
        },
        {
             path: '/Fleet/Mantenimientos',
             name: 'Mantenimientos',
             component: () => import(/* webpackChunkName "Mantenimientos" */ './components/Views/Fleet/Mantenimientos')
        },
        {
             path: '/Fleet/TarjetaGasolina',
             name: 'TarjetaGasolina',
             component: () => import(/* webpackChunkName "TarjetaGasolina" */ './components/Views/Fleet/TarjetaGasolina')
        },
        {
            path: '/Fleet/ConsumoGasolina',
            name: 'ConsumoGasolina',
            component: () => import(/* webpackChunkName "ConsumoGasolina" */ './components/Views/Fleet/ConsumoGasolina')
        },
        {
            path: '/Fleet/Pagos',
            name: 'Pagos',
            component: () => import(/* webpackChunkName "Pagos" */ './components/Views/Fleet/Pagos')
        },
        /* ====== Reportes ====== */
        {
           path: '/Reportes/Flotilla',
           name: 'Flotilla',
           component: () => import(/* webpackChunkName "Flotilla" */ './components/Views/Reportes/Flotilla')
        },
        {
            path: '/Reportes/Pagos',
            name: 'Pagos',
            component: () => import(/* webpackChunkName "Pagos" */ './components/Views/Reportes/Pagos')
         }

    ]
})
