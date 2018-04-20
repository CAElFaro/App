<template>
  <f7-page :hide-navbars-on-scroll="true" :no-navbar="true">
    <f7-navbar back-link="Volver">
        <f7-nav-title>
            {{data.fullname}}
        </f7-nav-title>
    </f7-navbar>


    <f7-toolbar tabbar scrollable bottom-md >
        <f7-link tab-link="#profile" icon="f7-person" class="fab-close">Perfil</f7-link>
        <f7-link tab-link="#racers" icon="f7-timer"  class="fab-close">Resultados</f7-link>
    </f7-toolbar>


    <f7-tabs >
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

      <f7-tab id="racers" >
          <f7-page :infinite="isInfinite" @infinite="loadRacers()">
          <f7-list media-list >
              <f7-list-item v-for="(e, k) in racers"
                  :key="k"
                  :link="'/racer/' + e.id + '/'"
                  :title="e.name"
                  :subtitle="' ' + e.date_humman"

                  >
                  <div slot="root-start"></div>
                  <div slot="root"></div>
                  <div slot="content-start"></div>
                  <div slot="content"></div>
                  <div slot="media-start">

                  </div>
                  <div slot="media">
                      <f7-icon f7="person">
                          <span class="badge color-green">{{e.participant.points}}</span>
                      </f7-icon>
                  </div>
                  <span slot="after-start">

                  </span>
                  <span slot="after"></span>
                  <div slot="inner-start"></div>
                  <div slot="inner" style="pading-left: 30px;">
                      {{e.city}} <br/>
                      <hr/>
                      <span style="font-weight: bold;" v-if="e.record!==undefined">{{e.record}}</span>
                      <span style="font-weight: bold;" v-else>{{e.type}}</span>
                      <br/>
                      <span style="font-weight: bold;">{{e.distance}}kms: {{e.participant.duration_humman}}</span>

                      <br/>
                      Ritmo: <span style="font-weight: bold;">{{e.participant.pace_humman}}</span>
                      <br/>
                      {{e.participant.category}}: <span style="font-weight: bold;">{{e.participant.clasification.category}}</span>
                      <br/>
                      General: <span style="font-weight: bold;">{{e.participant.clasification.general}}</span>

                      <hr/>
                  </div>
                  <div slot="before-title">

                  </div>
                  <div slot="after-title"></div>
              </f7-list-item>
          </f7-list>
          </f7-page>

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
                    total: {},
                },
            },
            racer_page: 0,
            racers: [],
            isInfinite: true,
        }
    },
    methods: {
        onF7Ready(f7) {
            this.data.id = this.$f7route.params.memberId;
            this.reload();
            this.loadRacers();
        },
        loadRacers() {
            this.racer_page++;
            if (this.isInfinite) {
                axios.get('https://intranet.atletismoelfaroalfas.es/api/member/' + this.data.id + '/racers?page=' + this.racer_page)
                .then((response) => {
                    this.isInfinite = response.data.links.next !== null;
                    response.data.data.forEach(function(e) {
                        this.racers.push(e);
                    }, this);
                    this.$f7.ptr.done();
                }, this);
            }
        },
        reload() {
            axios.get('https://intranet.atletismoelfaroalfas.es/api/member/' + this.data.id)
            .then((response) => {
                this.data = response.data.data;
                console.log(this.data);
            }, this);
        }
    }

}
</script>
