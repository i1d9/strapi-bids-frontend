<template>
<div>
    
</div>
</template>

<script>
import axios from 'axios';
export default {

    name: "ProductDetail",
    data() {
        return {
            product: {}
        }
    },
    methods: {

        async getproduct(id) {
            try {
                const response = await axios.get(`http://localhost:1337/api/articles/${id}?populate=*`);

                this.product = response.data.data;
            } catch (error) {
                                console.log(error);
            }
        }
    },
    created() {
        this.getproduct(this.$route.params.id);
    }


}

</script>
