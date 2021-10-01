### Description
An Homepage Hero Video stub (renamed from Article Preview) molecule contains a topic label (optional), an article title, a series tag (optional) and a video.

[EWL-8975](https://issues.ama-assn.org/browse/EWL-8975)

### Use Case
This produces an Artcle teaser for use if certain fields are present. Entices a user to click on a related article which exists on a separate page.

~~~
articleStub {
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
  "metadata": (see article stub metadata atom)
}
~~~
