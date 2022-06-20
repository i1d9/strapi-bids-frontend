<template>
<div>

</div>
</template>


<script>
import axios from "axios";

export default {
    name: "AuctionDetail",
    data(){

        return {
            auction: {}
        }
    },
    methods: {
        async getAuctionDetail(id){

            try {
                const {data} = axios.get(`${id}`);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    },

    created(){
        this.getAuctionDetail(this.$route.params.id);
    }
}
</script>