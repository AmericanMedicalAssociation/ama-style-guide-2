### Description
The tools organism includes a heading, the topic tools list, and learn more about. 

[EWL-3766](https://issues.ama-assn.org/browse/EWL-4165)

### Use Case
The full block for additional information, resources, content available to be added to a node. Includes related articles under Learn More.
  
  
### Variables
~~~
  {
  "heading": {
    "level": integer/required
    "class": string/required
    "text": string/required
    },
    "tools": [
      {
      "icon":  string/required
      "paragraph": {
      "text":  string/required
      },
      "type":  string/optional
      "size": string/optional
      "link": string/required
      }
    ],
    "learnMore": {
      "heading": {
      "level": integer/required
      "class": string/required
      "text": string/required
      },
    }
    "links": [
      {
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
    ]
  }
~~~
