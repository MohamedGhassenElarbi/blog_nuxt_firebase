<template>
    <div class="container" style="margin-top:20px;">
    <AdminPostForm v-on:submit="onSubmit"/>
  </div>
</template>
<script>
import AdminPostForm from '@/components/admin/AdminPostForm'
import axios from 'axios'
export default {
    components:{
        AdminPostForm
    },
    middleware:['check-auth','auth'],
    methods:{
        onSubmit(post){
           /* axios.post('https://appfirebase-77a25.firebaseio.com/posts.json',post)
            .then(result =>{
                
                this.$router.push('/admin');
                
            })
            .catch(e=>console.log(e))*/
            this.$store.dispatch('addPost',post)
            .then(()=>{
                 this.$router.push('/admin');
            });

        }
    }
}
</script>