---
title: Subcategory Hero
---

### Description
Links the user to another piece of content.

Elements:
– Image
- Subcategory name
- Article Title
- Publish date
- Read time

UI: A user can further explore content by clicking on Article Title or Article Image

[EWL-5311](https://issues.ama-assn.org/browse/EWL-5311)

### User Story
As a user I can preview a piece of content and then click on it to learn more.


### Variables
~~~~
  subcategoryHero: {
    link: {
      title: 
        type: string / required
      href: 
        type: string (url) / required 
      text: 
        type: string / required      
      target: 
        type: string / required ("self")
    }
    subheading: 
      type: string / optional    
    image: {
      alt: 
        type: string / required
      src: 
        type: string (url) / required 
      height: 
        type: string / required ("100%")
      width: 
        type: string / required ("100%")    
    }
    metadata: {
      date: 
        type: string / optional    
      readtime: 
        type: string / optional    
    }
  }
~~~~

