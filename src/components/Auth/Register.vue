<template>
    <div>

        <form @submit.prevent="submit">
            <input type="text" placeholder="Username" name="username" v-model="form.username" />
            <input type="email" placeholder="Email Address" name="email" v-model="form.email" />
            <input type="password" name="password" v-model="form.password" placeholder="Password" />

            <button type="submit">
                Login
            </button>
        </form>


      <p v-if="showError" id="error">Could not create an account with the details provided</p>
    </div>
</template>

<script>



import { mapActions } from "vuex";

export default {
    name: " RegisterPage",
    data() {
        return {
            form: {
                username: "",
                email: "",
                password: "",
            },
      showError: false
        }
    },
    methods: {
        ...mapActions(["Register"]),
        async submit() {



            try {
                await this.Register({
                    username: this.form.username,
                    password: this.form.password,
                    email: this.form.email,
                });

                this.showError = false
            } catch (error) {
                this.showError = true
            }

        }

    }
}

</script>