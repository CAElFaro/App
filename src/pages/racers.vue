<template>

    <f7-page :infinite="isInfinite" @infinite="reload()" :hide-bars-on-scroll="true">

        <f7-navbar color-theme="green">
          <f7-nav-left>
            <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
          </f7-nav-left>
          <f7-nav-title>Resultados</f7-nav-title>
          <f7-nav-right>
            <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>



            <f7-list media-list>
                <f7-list-item v-for="(e, k) in data"
                    :key="k"
                    :link="'/racer/' + e.id + '/'"
                    :title="e.name"
                    :subtitle="' ' + e.date"
                    >
                    <div slot="root-start"></div>
                    <div slot="root"></div>
                    <div slot="content-start"></div>
                    <div slot="content"></div>
                    <div slot="media-start">

                    </div>
                    <div slot="media">
                        <f7-icon f7="person">
                            <span class="badge color-green">{{e.participants_count}}</span>
                        </f7-icon>
                    </div>
                    <span slot="after-start">

                    </span>
                    <span slot="after"></span>
                    <div slot="inner-start"></div>
                    <div slot="inner" style="pading-left: 30px;">
                        {{e.city}} <br/>
                        <span style="font-weight: bold;">{{e.distance}}kms</span>
                        <br/>
                        <span style="color: #ccc;">{{e.slogan}}</span>
                    </div>
                    <div slot="before-title">

                    </div>
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
                page: '',
                isInfinite: true,
            }
        },
    methods: {
        reload() {
            this.page++;
            if (this.isInfinite) {
                axios.get('https://caelfaro.dev/api/racers?page=' + this.page)
                .then((response) => {
                    this.isInfinite = response.data.links.next !== null;
                    response.data.data.forEach(function(e) {
                        this.data.push(e);
                    }, this);

                    this.$f7.ptr.done();
                }, this);
            }
        },
        onF7Ready(f7) {
            this.reload();
        },
    }
}
</script>
