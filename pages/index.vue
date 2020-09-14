<template>
  <div class="container" style="margin-top:50px">
    <div>
  <b-card
    overlay
    img-src="https://picsum.photos/900/250/?image=3"
    img-alt="Card Image"
    text-variant="white"
    title="Welcome to our blog"
    sub-title=""
  >
    <b-card-text>
      Share your ideas with a simple click!
    </b-card-text>
  </b-card>
</div>


<div class="row" style="margin-left: auto;margin-right: auto;">
   <PostPreview v-for ="post in loadedPosts" :key="post.id"
   :id="post.id"
   :author="post.author"
   :title="post.title"
   :previewText="post.previewText"
   :thumbnail="post.thumbnail"/>
</div>
  </div>
  
</template>

<script>
import PostPreview from '@/components/posts/PostPreview'
export default {
  components:{
    PostPreview
  },
  computed:{
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  }
}
</script>


