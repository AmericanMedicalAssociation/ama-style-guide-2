---
el: '.ama__hero-story'
title: 'Hero Story'
---

Includes:
- Member's Name
- Featured quote
- Read More CTA
- 3:2 image or video (video will be playable from this point and not require a link away, since there is a Read More CTA)


### Variables
~~~
{
  heroStory: {
    memberName: {
      level: 
        string / required ("5")
      text: 
        string / required
      class: 
        string / required ("ama__h5--homepage ama__hero-story__member-name--purple")
    },
    featuredQuote: {
      level: 
        string / required ("2")
      text: 
        string / required
      class: 
        string / required ("ama__h2--homepage ama__hero-story__featured-quote")
    },
    button: {
      href: 
        string / required (url)
      info: 
        string / required
      text: 
        string / required
      type: 
        string / required ("button")
      style: 
        string / required ("homepage")      
    },
    image: {
      alt: 
        string / required
      src: 
        string / required (url)
      height: 
        string / required ("600")
      width: 
        string / required ("800")
    }
  }
}


~~~
