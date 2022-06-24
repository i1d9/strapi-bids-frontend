<template>
    <div class="container p-2">
        <div class="row">
            <div class="col-lg-3 col-md-4" v-for="product in products" :key="product.id">
                <Card :product="product.attributes" :serverTime="serverTime" :id="product.id" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import socketIOClient from "socket.io-client";
import Card from './Card.vue';
export default {
    name: "ProductList",
    data() {
        return {
            products: [],
            socket: socketIOClient("http://localhost:1337", {
                query: {
                    token: this.$store.getters.getUser.token
                }
            }),
            serverTime: null,
        };
    },
    methods: {
        async getproducts() {
            try {
                const response = await axios.get("http://localhost:1337/api/products?populate=image&&name", {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.getUser.token}`
                    }
                });
                this.products = response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getproducts();
        this.socket.on("serverTime", (data) => {
            this.serverTime = data.time
        });
    },
    components: { Card }
}

</script>
