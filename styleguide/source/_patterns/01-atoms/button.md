### Description
This is the standard button pattern
[EWL-4189](https://issues.ama-assn.org/browse/EWL-4189)

### Variant options
* Using a 
* [link](./?p=atoms-button-as-link) instead of a button
* [small](./?p=atoms-button-as-small)
* [solid](./?p=atoms-button-as-outline)
* [outline](./?p=atoms-button-as-outline)


### Variables
~~~
button: {
  href:
    type: string (url) / optional
  info: 
    type: string / optional
  text: 
    type: string / required
  type:
    type: string / optional (ex: "button", "submit")
  size:
    type: string / optional ("" or "small")
  style:
    type: string / optional ("solid" or "outline")
}
~~~
