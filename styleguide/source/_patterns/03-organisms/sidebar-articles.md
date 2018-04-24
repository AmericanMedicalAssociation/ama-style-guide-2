### Description
This pattern is a block that may optionally include:

* Article Stub
* Article Stub as Small Image
* Article Stub (with no image)
* Article Stub as Title Only

[EWL-4389](https://issues.ama-assn.org/browse/EWL-4389)

### Use Case

### Variables
~~~
  "label": string / optional
  "articles": [
    {
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
    }
  ]
}
~~~
