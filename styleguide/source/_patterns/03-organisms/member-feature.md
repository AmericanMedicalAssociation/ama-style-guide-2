### Description
These will link to an article page with content on the page relating to the Membership Moves Medicine campaign.

[EWL-5456](https://issues.ama-assn.org/browse/EWL-5456)

### Use Case
As a user, I want to learn more about current members' stories pertaining to being a part of the AMA.

### Variables
~~~
{
  "memberFeature":
      heroStory: {
        memberName: {
          level: 
            string / required ("5")
          text: 
            string / required
          class: 
            string / required ("ama__h5--homepage ama__hero-story__member-name--purple")
        },
        featuredQuote: {
          level: 
            string / required ("2")
          text: 
            string / required
          class: 
            string / required ("ama__h2--homepage ama__hero-story__featured-quote")
        },
        button: {
          href: 
            string / required (url)
          info: 
            string / required
          text: 
            string / required
          type: 
            string / required ("button")
          style: 
            string / required ("homepage")      
        },
        image: {
          alt: 
            string / required
          src: 
            string / required (url)
          height: 
            string / required ("600")
          width: 
            string / required ("800")
        }
      }
    "memberFeatureRail": {
    "articleStubs": [
      {
        "hasVideo": 
          string / required ("true")
        "link": {
          "title": 
            string / required
          "href": 
            string / required (url)
          "text": 
            string / required 
        },
        "image": 
          {
          "alt": 
            string / required 
          "src": 
            string / required (url)
          "height": 
            "600",
          "width": 
            "800"
        },
        "headingLevel": 
          string / required ("h5"),
        "homepage": 
          {
          "heading": 
            {
            "level": 
              string / required ("5")
            "text": 
              string / required 
            "class": 
              string / required  ("ama__h5 ama__h5--purple--homepage")
          }
        }
      },
      // Repeat for each link.
    ],
    "viewMoreLink": 
      {
      "title": 
        string / required 
      "href": 
        string / required (url)
      "text": 
        string / required ("View more from this series")
      "target": 
        string / required ("_self")
      "class": 
        string / required ("ama__link ama__member-feature-rail__view-all-link")
    }
    }
}
