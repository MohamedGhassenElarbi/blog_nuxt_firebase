<template>
    <b-card
      :img-src="thumbnail"
      header-tag="header"
      :footer=" 'Author :'+author"
      footer-tag="footer"
      :title="title"
      style="margin-right:40px;margin-top:20px;width:330px;"
    >
      <b-card-text>{{previewText}}</b-card-text>
      <nuxt-link :to="'/posts/'+id"> <b-button variant="primary">See the Article</b-button></nuxt-link>
      
    </b-card>
</template>
<script>
export default {
    props:{
        id:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        previewText:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        }
    }
}
</script>