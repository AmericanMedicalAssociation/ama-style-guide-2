### Description
An improved social module for the homepage that is easier to update which reflects the actions of our members and ambassadors on social media.

[EWL-9037](https://issues.ama-assn.org/browse/EWL-9037)


### Use Case
This produces an Artcle teaser for use if certain fields are present. Entices a user to click on a related article which exists on a separate page.

~~~
profile {
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
  heading {
    text:
      type: string / required
  }
  paragraph {
    text:
      type: string
  }
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
}
~~~
