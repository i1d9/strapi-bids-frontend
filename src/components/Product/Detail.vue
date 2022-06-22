<template>
    <div class="container mt-4 m-md-3 m-lg-3 ">
        <div class="row">
            <div class="col-md-7 col-lg-7">

                <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">



                        <div v-for="image in this.product.image" :key="image.id">


                            <img :src="'http://localhost:1337' + (image.formats.medium.url)" class="card-img-top"
                                alt={{content.name}} />

                        </div>




                        <div class="carousel-item">
                            <img src="" class="d-block w-100" alt="">
                        </div>
                        <div class="carousel-item">
                            <img src="" class="d-block w-100" alt="">
                        </div>
                    </div>
                </div>

                <p>
                    {{ this.product.description }}
                </p>
            </div>

            <div class="col-md-5 col-lg-5">
                Time left: {{ countDown(this.serverTime) }}
                <div class="card m-2 p-3">
                    <p>Current Price: KES {{ this.product.bid_price }} </p>
                    <div class="overflow-auto" style="height: 10rem;">
                        <div v-if="this.bids.length > 0">
                            <div v-for="bid in bids" :key="bid.id">
                                <div class="border p-3 m-2">

                                    <p>{{ bid.account.user.username }}</p>
                                    <p>KES {{ bid.value }}</p>
                                </div>
                            </div>
                        </div>


                        <div class="card text-center m-2 p-3" v-else>
                            <span>No Bids available</span>
                        </div>
                    </div>
                </div>

                <div class="m-2 d-flex flex-column">
                    <input type="number" v-model="bidValue" placeholder="Bid Value" class="form-control" min="1" />
                    <button type="button" @click="makeBid" class="btn btn-outline-warning">Bid</button>
                </div>

            </div>
        </div>

    </div>


</template>


<script>
import axios from 'axios';

import socketIOClient from "socket.io-client";


export default {

    name: "ProductDetail",
    data() {
        return {
            bidValue: 1,
            product: {
            },
            bids: [],
            socket: socketIOClient("http://localhost:1337", {
                query: {
                    token: this.$store.getters.getUser.token
                }
            }),
            serverTime: new Date(),
            countDownInterval: null,
            countDownValue: ''
        }
    },
    methods: {
        countDown(now) {
            // Get today's date and time


            // Find the distance between now and the count down date
            var distance = new Date(this.product.auction_end) - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return `${days} Days ${hours} hrs ${minutes} minutes ${seconds} seconds`
        },
        getAccount(account) {
            console.log(account);
        },
        async getproduct(id) {
            try {
                const response = await axios.get(`http://localhost:1337/api/products/${id}?populate=*`);

                this.product = response.data.data.attributes;


            } catch (error) {
                console.log(error);
            }
        },
        makeBid() {


            if (this.bidValue > 0) {

                this.socket.emit("makeBid", { bidValue: this.bidValue, user: this.$store.getters.getUser.id, product: this.product.id });
                console.log(this.bidValue);
            }

        }
    },
    created() {

        this.socket.emit("loadBids", { id: this.$route.params.id });
        this.socket.on("loadBids", (data) => {
            this.product = data;
            this.bids = data.bids;
            console.log(this.product);

        });




    },
    mounted() {
        this.socket.on("serverTime", (data) => {

            this.serverTime = data.time
        });

    }


}


</script>

