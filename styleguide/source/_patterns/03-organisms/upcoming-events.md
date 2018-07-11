---
el: ".ama__upcoming-events"
title: "Upcoming Events"
---

A collection of up to three upcoming events displayed in a column on the homepage.

[EWL-5462](https://issues.ama-assn.org/browse/EWL-5462)

### Use Case
Contains a list of upcoming events for promotion on the homepage, so that users can get a quick glance at the major details of any upcoming events or link over to the event page to get the full details.

### Variables
~~~
{
  sectionTitile: {
    text: Upcoming Events
  },
  link: {
    title: View all Events,
    href: string,
    text: View all Events,
    target: _self,
    class: ama__link--blue ama__upcoming-events__view-all-link
  },
  events: [
  {
    link: {
      title: string,
      href: string,
      text: string,
      target: _self,
      class: ama__link--icon,
      iconLeft: @atoms/media/icons/svg/icon-calendar.twig
    },
    location: {
      text: string,
      class: ama__upcoming-event__location
    },
    date: string/optional
  },
   ... # repeat for each item.
  ]
}
~~~
