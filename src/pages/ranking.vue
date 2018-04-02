<template>

    <f7-page :ptr="true" @ptr:refresh="reload()">
        <f7-list media-list>
          <f7-list-item v-for="(e, k) in data"
            link="/home/"
            :title="e.fullname"
            >
              <img :src="e.avatar" class="message-avatar" slot="media" style="width: 48px;height: 48px;">
              <div slot="root-start"></div>
              <div slot="root"></div>
              <div slot="content-start"></div>
              <div slot="content"></div>
              <div slot="media-start"></div>
              <div slot="media"></div>
              <span slot="after-start">
                  <f7-badge color="green" style="font-size: 16px;">{{e.points}} puntos</f7-badge>
              </span>
              <span slot="after"></span>
              <div slot="inner-start"></div>
              <div slot="inner" style="margin-left: 50px;">
                  <span v-if="e.podiums>0">
                      {{e.podiums}} Trofeos /
                  </span>
                  {{e.racers_count}} Carreras /
                  {{e.distance}}kms
              </div>
              <div slot="before-title">{{k+1}}.- </div>
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
            axios.get('https://intranet.atletismoelfaroalfas.es/api/ranking')
            .then((response) => {
                this.data = response.data.data;
                this.$f7.ptr.done();
            }, this);
        }
    }
}
</script>
