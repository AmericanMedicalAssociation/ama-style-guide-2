### Description
Should contain a Content Grouping Header and load three article stubs by default, and include a sidebar.
The promotional real estate sidebar can include any partner promos or the subscribe promo or Membership, AMA Insurance, Email Sign-up, etc. 

[EWL-8714](https://issues.ama-assn.org/browse/EWL-8714)



### Variables
~~~
{
  categoryIndex: {
    contentGroupingHeader: {
      text: 
        string / optional
    },
    loadMoreButton: {
      href: 
        string / required (url)
      info: 
        string / required
      text: 
        string / required ("Load More")
      type: 
        string / required ("button")
      style: 
        string / required ("secondary")
      size: 
        string / optional
    },
    promotionalRealEstate: {
      membership: {
        heading: {
          level: 
            int / required
          text: 
            string / required
          class:
            string / required ("ama__h2")
        },
        link: 
          string / required
        paragraph: {
          text: 
            string / required
        },
        (optional) button: {
          text: 
            string / optional
          style: primary
        }
      },
      partnerPromo: {
        image: {
          alt: 
            string / required
          src: 
            string / required ("url")
          height:
            string / required ("100%")
          width:
            string / required ("100%")
        },
        heading: {
          level: 
            string / required ("2")
          text: 
            string / required
          class: 
            string / required ("ama__h2 ama__partner-promo__heading")
        },
        paragraph : {
          text: 
            string / required
          class: 
            string / required ("ama__partner-promo__paragraph)
        },
        button: {
          href:
            string / required (url)
          info: 
            string / optional
          text: 
            string / required
          type: 
            string / required ("button")
          style: 
            string / required ("primary")
          size: 
            string / optional
        }
      },
      subscribePromo: {
        subjectTitle:
          type: text / optional
        heading: 
          type: text / required
        paragraph:
          type: text / required
        email: {
          label: 
            type: text / required
          name: 
            type: text / required
          placeholder: 
            type: text / required
        },
        button: {
          href: 
            type: text (url) / required
          info: 
            type: text / required
          text: 
            type: text / required
          type: 
            type: text / required ("button")
          style: 
            type: text / required ("secondary")
          size: 
            type: text / optional (empty)
        }
      }
    }
  }
}

~~~
