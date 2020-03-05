---
el: '.ama__topic'
title: 'Forum Topic'
---

Includes:
- Heading
- Author's Name
- Date
- Print Link
- Body
- Resolution
- Downloads
- Comment link


### Variables
~~~
{
  ForumTopic: {
    heading: {
      level:
        string / required ("1")
      text:
        string / required
    },
    author: {
      href:
        string / required
      text:
        string / required
    },
    date: {
      text:
        string / required
    },
    print: {
      href:
        string / required
      text:
        string / required
      iconRight:
        string / optional (@atoms/media/icons/svg/icon-print.twig)
    },
    resolution: {
      text:
        string / required
    },
    body: {
      text:
        string / required
    },
    downloads: {
      href:
        string / required
      text:
        string / required
      icon:
        string / optional (@atoms/media/icons/svg/icon-pdf.twig)
    },
    commentLink: {
      title:
        string / optional
      alt:
        string / optional
      target:
        string / optional
      href:
        string / required
      text:
        string / required
    }
  }
}


~~~
