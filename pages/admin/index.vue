<template>
      <div class="container" style="margin-top:50px;">
    
    <h1>Existing posts</h1>
    <b-button variant="primary" v-on:click="$router.push('/admin/new-post')">New Post</b-button>
    <b-button variant="secondary" v-on:click="onLogout">Logout</b-button>
      <table class="table table-hover">
    <thead>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Preview</th>
        <th>Operations</th>
      </tr>
    </thead>
    
      <transition-group name="slide" tag="tbody">
      <tr v-for ="post in posts" :key="post.title">
        <td>{{post.author}}</td>
        <td>{{post.title}}</td>
        <td>{{post.previewText}}</td>
        <td style="width:300px;"> 
            <b-button variant="success" v-on:click="$router.push('/posts/'+post.id)">See</b-button>
            <b-button variant="warning" v-on:click="$router.push('/admin/'+post.id)">Update</b-button>
            <b-button variant="danger" v-on:click="deletePost(post.id)">Delete</b-button>
            
        </td>
      </tr>
      </transition-group>
      
    
  </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  middleware:['check-auth','auth'],
computed:{
    posts(){
      return this.$store.getters.loadedPosts
    }
  },
  methods:{
    deletePost(id){
      /*axios.delete('https://appfirebase-77a25.firebaseio.com/posts/'+id+'.json')
      .then(result =>{
                
      this.$router.push('/admin');
                
      })
      .catch(e=>console.log(e))*/
      this.$store.dispatch('deletedPost',id)
            .then(()=>{
                 this.$router.push('/admin');
            });

    },
    onLogout(){
      this.$store.dispatch('logout');
      this.$router.push('/admin/auth');
    }
  }
}
</script>