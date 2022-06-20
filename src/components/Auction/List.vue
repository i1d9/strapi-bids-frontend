<template>
    <div>


    </div>
</template>

<script>
import axios from "axios";


export default {
    name: "AuctionList",
    data() {
        return {
            auctions: []
        }
    },
    methods: {

        async getAutions() {
            try {
                const { data } = axios.get("");
                this.auctions = [];
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {

    }
}
</script>