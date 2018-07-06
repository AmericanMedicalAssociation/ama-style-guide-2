---
el: ".ama__bio-image-with-body"
title: "Bio Image with body"
---

The bio with image has the following components:
Gated atom
Multiple bio sections organism
Header atom
Paragraph atoms

### Variables
~~~
{
  "bioImageWithBody": {
    image {
      alt:
        type: string / required
      src:
        type: string (url) / required
      height:
        type: string / required
      width:
        type: string / required
    },
    "bioSections": [
      {
        "heading": type: string / optional
        "contentWithLabelList": [
          {
            "dt": type: string / optional
            "dd": type: string / optional
          }
        ]
      }
    ],
    "bio": {
      heading {
        level:
          type: string / required
        text:
          type: string / required
        class:
          type: string / optional
      },
      paragraph {
        text:
          type: string
        class:
          type: string / optional
      }
    }
  }
}
~~~
