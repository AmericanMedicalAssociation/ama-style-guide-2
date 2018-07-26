### Description
An Article Stub (renamed from Article Preview) molecule contains a topic label (optional), an article title, a description, and optionally either an image or a Youtube embed and metadata that includes data and read/playtime. Variants are defined based on what fields are needed in each variant, i.e. image or video. The order of elements is determined using flexbox where different from the base pattern.

Variants are managed by use of pseudo-patterns.

- ["Article Stub Video"](?p=molecules-article-stub-as-video) is the variant of this pattern that includes a video rather than an image.
- ["Article Stub Related"](?p=molecules-article-stub-as-related) is the variant of this pattern that includes an image and title.
- ["Article Stub Related No Image"](?p=molecules-article-stub-no-image) is the variant of this pattern that includes a linked title.
- ["Article Stub for Homepage"](?p=molecules-article-stub-for-homepage) is the variant of this pattern as it appears on the homepage.
- ["Article Stub as Hero for Homepage"](?p=molecules-article-stub-as-hero-for-homepage) is the variant of this pattern that appears as the hero on the hompage.
- ["Article Stub as Navigation"](?p=molecules-article-stub-as-for-navigation) is the variant of this pattern that appears in the global nav menu.

[EWL-4281](https://issues.ama-assn.org/browse/EWL-4281)
[EWL-4432](https://issues.ama-assn.org/browse/EWL-4432)
[EWL-5436](https://issues.ama-assn.org/browse/EWL-5436)
[EWL-5437](https://issues.ama-assn.org/browse/EWL-5437)
[EWL-5595](https://issues.ama-assn.org/browse/EWL-5595)

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
