<template>
    <div>
        <b-form >

          <b-form-group id="input-group-1" label="Author:" label-for="author">
        <b-form-input
          id="author"
          v-model="form.author"
          required
          placeholder="Author"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Title:" label-for="Title">
        <b-form-input
          id="Title"
          v-model="form.title"
          required
          placeholder="Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Thumbnail:" label-for="thumbnail">
        <b-form-input
          id="thumbnail"
          v-model="form.thumbnail"
          required
          placeholder="thumbnail"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Preview Text:" label-for="preview">
        <b-form-input
          id="preview"
          v-model="form.previewText"
          required
          placeholder="Preview Text"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Article" label-for="textarea">
        <b-form-textarea
      id="textarea"
      v-model="form.article"
      placeholder="Article"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
      </b-form-group>

        
        <div style="text-align:center;">
            <b-button  variant="danger" v-on:click.prevent="onCancel()">Cancel</b-button>
            <b-button type="submit" variant="primary" v-on:click.prevent="onSubmit()">Submit</b-button>
        </div>
    </b-form>
    </div>
</template>
<script>
export default {
    data(){return{
        form: this.post
        ?{...this.post}
        :
        {
            author:'',
            title:'',
            thumbnail:'',
            previewText:'',
            article:''

        }
    };},
    methods:{
        onCancel() {
        this.$router.push('/admin')
       
      },
      onSubmit(){
        this.$emit('submit',this.form);
      }
    },
    props:{
      post:{
        type:Object,
        required:false
      }
    }
}
</script>