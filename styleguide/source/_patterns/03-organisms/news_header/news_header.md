---
el: ".ama__news-article"
title: "News Header"
---

The Masthead includes a People Bio, a group of social icons/links, a date, a category link (?) and a heading.

[EWL-4421](https://issues.ama-assn.org/browse/EWL-4421)
[EWL-4485](https://issues.ama-assn.org/browse/EWL-4485)

### Use Case
Displays the title (and subtitle), the (sub)category, date of publication, and social media links of a page.

### Variants
- [Masthead with Subtitle](?p=organisms-masthead-with-subtitle)
- [Masthead as Indented](?p=organisms-masthead-as-indented)
- [Masthead as Simplified](?p=organisms-masthead-as-simplified)
- [Masthead with subtitle](?p=organisms-masthead-with-subtitle)
- [Masthead with Subtitle as Indented](?p=organisms-masthead-with-subtitle-as-indented)
- [Masthead with Subtitle as Centered](?p=organisms-masthead-with-subtitle-as-centered)
- [Masthead as Title Only](?p=organisms-masthead-as-title-only)

### Variables
~~~
{
  "news_article": {
    "link": {
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
      icon:
        type: string / optional
    },
    "heading": {
      level:
        type: string / required
      text:
        type: string / required
      class:
        type: string / optional
    },
    "social": [
      {
        "text": "facebook",
        "icon": "facebook",
        "url": "www.facebook.com\/AmericanMedicalAssociation"
      },
      {
        "text": "googleplus",
        "icon": "googleplus",
        "url": "plus.google.com\/+americanmedicalassociation"
      },
      {
        "text": "twitter",
        "icon": "twitter",
        "url": "twitter.com\/AmerMedicalAssn"
      },
      {
        "text": "linkedin",
        "icon": "linkedin",
        "url": "www.linkedin.com\/company\/american-medical-association"
      },
      {
        "text": "youtube",
        "icon": "youtube",
        "url": "www.youtube.com\/user/AmerMedicalAssn"
      }
    ],
    "bio": {
      "image": {
        alt:
          type: string / required
        src:
          type: string (url) / required
        height:
          type: string / required
        width:
          type: string / required
      },
      "heading": {
        level:
          type: string / required
        text:
          type: string / required
        class:
          type: string / optional
      },
      paragraphs {
        text:
          type: string
        class:
          type: string / optional
      },
        {
          "text": "Emergency Medicine",
          "class": "ama__inline-bio__meta"
        }],
      links: [{
        title:
          string / required
        href:
          string / required
        text:
          string / optional
        target:
          string / optional
        class:
          "ama__link--icon ama__inline-bio__link",
        icon:
          string / optional
      },
        {
          "title": "Bio link",
          "href": "#",
          "text": "Full Bio",
          "target": "_self",
          "class": "ama__inline-bio__link"
        }]
    }
  }
}

~~~
