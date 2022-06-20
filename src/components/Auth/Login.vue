<template>
    <div>

        <form @submit.prevent="submit">

            <input type="email" placeholder="Email Address" name="email" v-model="form.email" />
            <input type="password" name="password" v-model="form.password" placeholder="Password" />

            <button type="submit">
                Login
            </button>
        </form>


      <p v-if="showError" id="error">Invalid Email/Password</p>
    </div>
</template>

<script>



import { mapActions } from "vuex";

export default {
    name: " LoginPage",
    data() {
        return {
            form: {
                email: "test@test.com",
                password: " Password",
            },
      showError: false
        }
    },
    methods: {
        ...mapActions(["LogIn"]),
        async submit() {


            try {
                await this.LogIn({
                    identifier: this.form.email,
                    password: this.form.password
                });

                console.log("Success");
   this.showError = false
      } catch (error) {
        this.showError = true
      }

        }



    }
}

</script>