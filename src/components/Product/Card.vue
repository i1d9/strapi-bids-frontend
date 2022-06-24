<template>
    <div class="card m-3 p-3 position-relative">
        <img :src="'http://localhost:1337' + this.product.image.data[0].attributes.formats.medium.url"
            class="card-img-top" alt={{content.name}} />
        <div class="card-body">
            <router-link :to="'/' + this.id">{{ content.name }}</router-link>
            <p>KES {{ content.price }}</p>
            <h6 class="card-subtitle mb-2 text-muted">{{ countDownValue }} </h6>
        </div>
        <div class="position-absolute top-0 end-0 p-1 m-2 btn-outline-danger">
            Live
        </div>
    </div>
</template>
<script>
export default {
    name: "CardComponent",
    props: ['product', 'serverTime', 'id'],
    data() {
        return {
            content: this.product,
            countDownInterval: null,
            countDownValue: ''
        }
    },
    methods: {

        countDown() {
            // Get today's date and time
            var now = this.serverTime;
            // Find the distance between now and the count down date
            var distance = new Date(this.product.auction_end) - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.countDownValue = `${days} Days ${hours} hrs ${minutes} minutes ${seconds} seconds`
        }
    },
    created() {
        this.countDownInterval = setInterval(() => { this.countDown() }, 1000);
    }
}
</script>
