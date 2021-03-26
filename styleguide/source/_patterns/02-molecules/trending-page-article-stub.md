### Description
Links the user to another piece of content. 

Elements:
– Subcategory Article belongs in (Bold Body Style Purple)
– Article Title 
– Teaser text or summary

### Use Case
UI: A user can further explore content by clicking on Article Title or Article Image
User StoryL As a user I can preview a piece of content and then click on it to learn more.


### Variables
~~~
  trendingArticleStub: {
    subcategory: 
      type: string / optional
    image: {
      alt: 
        type: string / required
      src: 
        type: string / required (url)
      height: 
        type: string / "100%"
      width: 
        type: string / "100%"
      class:
        type: string / empty
    },
    link: {
      href: 
        type: string / required (url)
      text: 
        type: string / required
    },
    paragraph: 
      type: string / required
  }
~~~
