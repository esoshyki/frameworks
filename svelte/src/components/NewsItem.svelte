<script>

  const { 
    author, 
    description, 
    title, 
    url, 
    urlToImage = "url(/favicon.png)",
    // publishedAt, 
    // source, 
    // content, 
   } = $$props;

   console.log(urlToImage);

   const onImageError = e => {
    console.log('error')
    console.log(e)
   }

</script>

<div class="news-item">
  <a class="news-item__link full-width" href={url} target="_blank"/>
  <img src={urlToImage || `/favicon.png`} alt="image" class="__image" on:error={onImageError} />
  <h5>{title}</h5>
  <p>{description}</p>
  <h6>{author}</h6>
</div>

<style>
  .news-item {
    padding: 15px;
    height: -webkit-fill-available;
    max-width: 320px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .news-item h6 {
    color: aquamarine;
  }

  .news-item p {
    text-align: left;
  }

  .news-item__link {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0;
    z-index: 5;
    cursor: pointer;
  }

  .news-item .__image {
    width: 100%;
    height: auto;
    max-height: 162px;
  }
</style>