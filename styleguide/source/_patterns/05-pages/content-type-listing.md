### Content Type Listing Page

[EWL-8904](https://issues.ama-assn.org/browse/EWL-8904)

~~~
{
  content-type: {
      heading: {
        text: 
          string / required
      },
      subtitle:
          string / required
      social: [
        {
          text: 
            string / required ("facebook")
          icon: 
            string / required ("facebook")
          url: 
            string / required ("www.facebook.com\/AmericanMedicalAssociation")
        },
        {
          text: 
            string / required ("twitter")
          icon:
            string / required ("twitter")
          url:
            string / required ("twitter.com\/AmerMedicalAssn")
        },
        {
          text:
            string / required ("linkedin")
          icon:
            string / required ("linkedin")
          url:
            string / required ("www.linkedin.com\/company\/american-medical-association")
        },
        {
          text:
            string / required ("youtube")
          icon:
            string / required ("youtube")
          url: 
            string / required ("www.youtube.com\/user/AmerMedicalAssn")
        }
      ]
    },
    contentTypeIndex: {
      searchField: {
        label: 
          text / required ("Search")
        id: 
          text / required ("ama__search__input")
        name: 
          text / required
        placeholder: 
          text / required ("Search")
        helpText: 
          text / optional
      },
      articleStubs: [
        {
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
      ],
      loadMoreButton: {
        href:
          type: string (url) / optional
        info: 
          type: string / optional
        text: 
          type: string / required
        type:
          type: string / required ("button")
        style:
          type: string / required ("secondary")
         size:
          type: string / optional 
      }
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
          image: { // optional 
            alt: 
              type: string / required
            src: 
              type: string / required (url)
            height: 
              type: string / "100%"
            width: 
              type: string / "100%"
          }
          heading: 
            type: string / required
          paragraph:
            type: string / required
          button: {
            href: 
              type: string (url) / required
            info: 
              type: string / required
            text: 
              type: string / required
            type: 
              type: string / required ("button")
            style: 
              type: string / required ("primary")
            size: 
              type: string / optional (empty)
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
}

~~~
