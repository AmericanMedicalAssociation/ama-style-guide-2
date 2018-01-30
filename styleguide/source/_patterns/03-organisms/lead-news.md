### Description
This pattern is a block that may include varying numbers of the article stub hero and article stub with a small image molecules.

[EWL-4388](https://issues.ama-assn.org/browse/EWL-4388)


### Variables
~~~
"label": string / optional
  "articles": [
    title_only: string / optional
    type: string / required
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
    video: string / optional
    related: string / optional
    small: string / optional
    class: string / optional
    paragraph {
      text:
        type: string
    }
  ]
}