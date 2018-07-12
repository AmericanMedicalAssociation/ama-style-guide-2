### Description
This is the standard button pattern

[EWL-4189](https://issues.ama-assn.org/browse/EWL-4189)
[EWL-5449](https://issues.ama-assn.org/browse/EWL-5449)

### Variant options
* [secondary](./?p=atoms-button-as-secondary)
* [reset](./?p=atoms-button-as-reset)
* [homepage](./?p=atoms-button-as-homepage)
* [homepage secondary](./?p=atoms-button-as-homepage-secondary)
* [promo](./?p=atoms-button-as-promo)

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
  style:
    type: string / optional ("secondary" or "")
   size:
    type: string / optional ("small", "block" or "")
}
~~~
