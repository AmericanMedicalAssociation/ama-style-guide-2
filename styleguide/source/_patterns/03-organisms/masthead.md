---
el: ".ama__header--article"
title: "Masthead"
---

[Some desciption needs to be updated here]

[EWL-4421](https://issues.ama-assn.org/browse/EWL-4421)
[EWL-4485](https://issues.ama-assn.org/browse/EWL-4485)


### Variables
~~~
{
  {
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
      icon:
        type: string / optional
    },
    heading {
      level:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
    },
    "social": [
      {
        "text":  string / required
        "icon":  string / required
        "url":  string / required (url)
      }
    ],
    bio: {
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
      },
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
        icon:
          type: string / optional
      }
    }
  }
}
~~~
