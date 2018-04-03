<template>


    <f7-page ptr @ptr:refresh="reload()" :hide-navbar-on-scroll="true">



        <f7-navbar >
            <f7-nav-left  v-if="temp > 2012">
              <f7-link icon-if-ios="f7:left" icon-if-md="material:chevron_left" @click="back()"></f7-link>
            </f7-nav-left>
            <f7-nav-title>{{temp + '/' + (temp+1)}}</f7-nav-title>
            <f7-nav-right v-if="temp < temp_current">
              <f7-link icon-if-ios="f7:right" icon-if-md="material:chevron_right" @click="next()"></f7-link>
            </f7-nav-right>
        </f7-navbar>


        <f7-list media-list>
          <f7-list-item v-for="(e, k) in data"
            :key="k"
            :link="'/member/' + e.id + '/'"
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
              <div slot="inner" style="pading-left: 30px;">
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
                data: [],
                temp: {},
                temp_current: {}
            }
        },

    methods: {
        onF7Ready(f7) {
            if ((new Date()).getMonth() < 8) {
                this.temp_current = (new Date()).getFullYear() - 1;
            } else {
                this.temp_current = (new Date()).getFullYear();
            }

            this.temp = this.temp_current;
            this.reload();
        },
        back() {
            this.temp--;
            this.reload();
        },
        next() {
            this.temp++;
            this.reload();
        },
        reload() {
            axios.get('https://intranet.atletismoelfaroalfas.es/api/ranking/' + this.temp)
            .then((response) => {
                this.data = response.data.data;
                this.$f7.ptr.done();
            }, this);
        }
    }
}
</script>
