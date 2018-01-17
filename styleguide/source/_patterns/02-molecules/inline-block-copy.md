### Description
Inline block copy

[EWL-4429](https://issues.ama-assn.org/browse/EWL-4429)

### Variables
~~~
  "inlineBlockCopy": {
      "heading": {
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
      },
      button: {
        href:
          type: string (url) / optional
        info: 
          type: string / optional
        text: 
          type: string / required
        type:
          type: string / optional (ex: "button", "submit")
        style:
          type: string / optional ("secondary" or "")
      }
    }
  }
~~~
