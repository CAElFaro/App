<template>
  <f7-page ptr @ptr:refresh="reload()" :hide-navbars-on-scroll="true" :no-navbar="true">
    <f7-navbar back-link="Volver">
        <f7-nav-title>
            {{data.fullname}}
        </f7-nav-title>
    </f7-navbar>








    <f7-toolbar tabbar scrollable bottom-md >
        <f7-link tab-link="#profile" icon="f7-person" class="fab-close">Perfil</f7-link>
        <f7-link tab-link="#racers" icon="f7-timer"  class="fab-close">Resultados</f7-link>
    </f7-toolbar>





    <f7-tabs swipeable>
      <f7-tab id="profile" tab-active>
          <f7-card>
              <f7-card-header>
                  <img :src="data.avatar" style="width: 100%;" class="lazy lazy-fade-in">
              </f7-card-header>
              <f7-card-content>
                  <ul v-if="data.stats.total">
                      <li><b>Nombre:</b> {{data.fullname}}</li>
                      <li><b>Miembro desde:</b> {{data.member_at}}</li>
                      <li><b>Puntos totales obtenidos:</b> {{data.stats.total.points}}</li>
                      <li v-if="data.stats.total.podiums > 0"><b>Podiums logrados:</b> {{data.stats.total.podiums}}</li>
                      <li><b>Carreras realizadas:</b> {{data.stats.total.racers_count}}</li>
                  </ul>
              </f7-card-content>
              <f7-card-footer>
              </f7-card-footer>
          </f7-card>
      </f7-tab>

      <f7-tab id="racers">

      </f7-tab>
    </f7-tabs>



  </f7-page>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            data: {
                id: 0,
                fullname: '',
                stats: {
                    tota: {},
                },
            }
        }
    },
    methods: {
        onF7Ready(f7) {
            this.data.id = this.$f7route.params.memberId;
            this.reload();
        },
        reload() {
            axios.get('https://intranet.atletismoelfaroalfas.es/api/member/' + this.data.id)
            .then((response) => {
                this.data = response.data.data;
                this.$f7.ptr.done();
            }, this);
        }
    }

}
</script>
