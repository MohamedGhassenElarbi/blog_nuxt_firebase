<template>
    <div class="container" style="width:500px;margin-top:50px;">
        <div class="mt-3" style="text-align:center;margin-bottom:20px;">
        <b-button-group >
         <b-button variant="success" v-on:click="etat='Login'">Login</b-button>
         <b-button variant="info" v-on:click="etat='Sign up'">Sign up</b-button>
        </b-button-group>
        </div>
        <form>
        <div style="margin-bottom:20px;">
        <b-form-input  type="email" placeholder="Email" v-model="email"></b-form-input>
        </div>
        <div style="margin-bottom:20px;">
        <b-form-input  type="password" placeholder="Password" v-model="password"></b-form-input>
        </div>
        <div style="text-align:center;"><b-button variant="primary" v-on:click="onSubmit">{{etat}}</b-button></div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){return{
        etat:"Login",
        email:"",
        password:""
    }},
    layout:'adminAuth',
    methods:{
        onSubmit(){
            this.$store.dispatch('authenticateUser',{
                etat:this.etat,
                email:this.email,
                password:this.password
            }).then(()=>{
                this.$router.push('/admin');
            })
        }
    }
}
</script>