### Description
RIGHT RAIL (3 articles)
- 3:2 image (if video, video icon will show in top right corner but will only link to article page where video is embedded)
- Member's Name (style)
- Article Title (style)

[EWL-5454](https://issues.ama-assn.org/browse/EWL-5454)


### Variables
~~~~
{
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

~~~~

