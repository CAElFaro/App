<template>

    <f7-page ptr @ptr:refresh="reload()" :hide-bars-on-scroll="true">

        <f7-navbar color-theme="green">
          <f7-nav-left>
            <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
          </f7-nav-left>
          <f7-nav-title>Socios</f7-nav-title>
          <f7-nav-right>
            <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>



        <f7-list media-list>
          <f7-list-item v-for="(e, k) in data"
            :key="k"
            :link="'/member/' + e.id + '/'"
            :title="e.fullname"
            :subtitle="'Miembro desde ' + e.member_at "
            >
              <img :src="e.avatar" class="message-avatar" slot="media" style="width: 48px;height: 48px;">
              <div slot="root-start"></div>
              <div slot="root"></div>
              <div slot="content-start"></div>
              <div slot="content"></div>
              <div slot="media-start"></div>
              <div slot="media"></div>
              <span slot="after-start">
                  <f7-badge color="green" style="font-size: 16px;">{{e.stats.total.points}} puntos</f7-badge>
              </span>
              <span slot="after"></span>
              <div slot="inner-start"></div>
              <div slot="inner" style="pading-left: 30px;">
                  <span v-if="e.stats.total.podiums > 0">
                      {{e.stats.total.podiums}} Trofeos /
                  </span>
                  {{e.stats.total.racers_count}} Carreras /
                  {{e.stats.total.distance}}kms
              </div>
              <div slot="before-title"></div>
              <div slot="after-title"></div>
          </f7-list-item>
        </f7-list>


    </f7-page>

</template>

<script>
import axios from 'axios'

export default {
    data() {
            return {
                data: []
            }
        },

    methods: {
        onF7Ready(f7) {
            this.reload();
        },
        reload() {
            axios.get('https://intranet.atletismoelfaroalfas.es/api/members')
            .then((response) => {
                this.data = response.data.data;
                this.$f7.ptr.done();
            }, this);
        }
    }
}
</script>
