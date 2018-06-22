### Description
A Category Hero molecule contains an eyebrow (optional, mobile only), an article title, an image, and metadata (mobile only) that includes data and read/playtime. 

[EWL-5267](https://issues.ama-assn.org/browse/EWL-5267)

### Use Case
UI: A user can further explore content by clicking on Article Title or Article Image.

As a user I can preview a piece of content and then click on it to learn more.

 
~~~
categoryHero {
  link {
    href:
      type: string / required
    text:
      type: string / required
    class:
      type: string / optional
    target:
      type: string / optional
    title:
      type: string / optional
  }
  image {
    alt:
      type: string / required
    src:
      type: string (url) / required
    height:
      type: string / required
    width:
      type: string / required
  }
  "metadata": (see article stub metadata atom),
  "subheading": 
    type: string / optional
}
~~~
