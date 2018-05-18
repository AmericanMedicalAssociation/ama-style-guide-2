### Description
An Event Stub molecule contains an image (optional), an event title, an event location, a date, and a description. Optionally, the event stub may also include discount text and a CME icon.

Variants are managed by use of pseudo-patterns.

- "Event Stub as Sticky" is the variant of this pattern that appears when an event stub has been marked as "sticky at the top of lists".

[EWL-4605](https://issues.ama-assn.org/browse/EWL-4605)

### Use Case
This produces an Event teaser for use on the Event listing. Entices a user to click on an event which exists on a separate page.

~~~
### Variables
{
  "eventStub": {
    "link": {
      "title": string/optional
      "href": string/required
      "text": string/required
    },
    "location": {
      "text": string/optional
      "level": "3"
      "class": "ama__h3 ama__event-stub__location"
    },
    "date": string/optional,
    "image": {
      "alt": string/required
      "src": "string/required
      "height": "180"
      "width": "180"
    },
    "sticky": true/false
    "cme": true/false
    "discount": string/optional
    "paragraph": string/optional
  }
}
~~~
