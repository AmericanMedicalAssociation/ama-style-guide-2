### Description
An `<ul>`  element with its child `<li>` elements and optional nested child `<ul>` and `<li>` elements.

[EWL-4201](https://issues.ama-assn.org/browse/EWL-4201)

### Variables:
~~~
unorderedList [{
  text:
    type: string / required
  sublist (optional) [{ 
    text:
      type: string / required
  }]
}]
~~~
~~~
