<template>
<div>
    <div class="row" style="margin-left: 150px;margin-right: auto;margin-top:50px;">
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