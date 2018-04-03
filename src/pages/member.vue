<template>
  <f7-page ptr @ptr:refresh="reload()" :hide-navbar-on-scroll="true">
    <f7-navbar back-link="Back">
        <f7-nav-title>
            <img :src="data.avatar" class="message-avatar" style="width: 48px;height: 48px;">
            {{data.fullname}}
        </f7-nav-title>
    </f7-navbar>

    <f7-block strong>
        <img :src="data.avatar" class="message-avatar" style="width: 48px;height: 48px;">
      <ul>
        <li><b>Nombre:</b> {{data.fullname}}</li>
        <li><b>Miembro desde:</b> {{data.member_at}}</li>
        <li><b>Hash:</b> {{$f7route.hash}}</li>
      </ul>
    </f7-block>
  </f7-page>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            data: {
                id: 0,
                fullname: ''
            }
        }
    },
    methods: {
        onF7Ready(f7) {
            console.log(this.$f7route.params.memberId);
            this.data.id = this.$f7route.params.memberId;

            this.reload();
        },
        reload() {
            console.log('reload');
            axios.get('https://intranet.atletismoelfaroalfas.es/api/member/' + this.data.id)
            .then((response) => {
                this.data = response.data.data;
                this.$f7.ptr.done();
            }, this);
        }
    }

}
</script>
