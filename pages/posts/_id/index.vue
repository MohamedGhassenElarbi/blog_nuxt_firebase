<template>
    <div class="container" style="margin-top:50px">
    <h2>{{loadedPost.title}}</h2>
    <h6>Written by :{{loadedPost.author}}</h6>
    <b-card-group deck>
      <b-card :img-src="loadedPost.thumbnail" img-alt="Card image" img-top>
        <p>{{loadedPost.previewText}}</p>
        <b-card-text>
          {{loadedPost.article}}
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  asyncData(context){
    return axios.get('https://appfirebase-77a25.firebaseio.com/posts/'+context.params.id+'.json')
    .then(res =>{
      return{
        loadedPost:res.data
      }
    })
    .catch(e=>context.error(e))
  }
}
</script>