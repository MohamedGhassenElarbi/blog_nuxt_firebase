<template>
    <div class="container" style="margin-top:20px;">
    <AdminPostForm v-bind:post="mypost" @submit="onSubmit"/>
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
    asyncData(context){
    return axios.get('https://appfirebase-77a25.firebaseio.com/posts/'+context.params.postId+'.json')
    .then( res =>{
      
      return{
        mypost : {...res.data,id:context.params.postId}

        
      };
    })
    .catch(e=>context.error(e))
    
  },
  methods:{
      onSubmit(EditedPost){
        /*axios.put('https://appfirebase-77a25.firebaseio.com/posts/'+this.$route.params.postId+'.json',EditedPost)
        .then(result =>{
          
          this.$router.push('/admin');
          
        })
        .catch(e => console.log(e))*/
        this.$store.dispatch('editedPost',EditedPost)
            .then(()=>{
                 this.$router.push('/admin');
            });
      }
  }
}
</script>