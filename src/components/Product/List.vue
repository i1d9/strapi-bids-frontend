<template>
    <div> </div>
</template>

<script>
import axios from 'axios';
export default {

    name: "ProductList",
    data() {
        return {
            products: []
        }
    },
    methods: {

        async getproducts() {
            try {
                const response = await axios.get("http://localhost:1337/api/products?populate=image&&name");
                this.products = response.data.data;

            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {

        this.getproducts();
    }


}

</script>
