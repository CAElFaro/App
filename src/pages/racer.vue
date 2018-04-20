<template>
  <f7-page ptr @ptr:refresh="reload()" :hide-navbars-on-scroll="true" :no-navbar="true">
    <f7-navbar back-link="Volver">
        <f7-nav-title>
            {{data.name}}
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
                  {{data.name}}
              </f7-card-header>
              <f7-card-content>
{{data}}
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
                name: '',
                stats: {
                    tota: {},
                },
            }
        }
    },
    methods: {
        onF7Ready(f7) {
            this.data.id = this.$f7route.params.racerId;
            this.reload();
        },
        reload() {
            axios.get('https://intranet.atletismoelfaroalfas.es/api/racer/' + this.data.id)
            .then((response) => {
                this.data = response.data.data;
                console.log(this.data);
                this.$f7.ptr.done();
            }, this);
        }
    }

}
</script>
