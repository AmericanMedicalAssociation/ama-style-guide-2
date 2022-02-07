### Subcategory Page

[EWL-5319](https://issues.ama-assn.org/browse/EWL-5319)

~~~
{
  subcategory: {
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
            string / required ("googleplus")
          icon:
            string / required ("googleplus")
          url: 
            string / required ("plus.google.com\/+americanmedicalassociation")
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
  categoryArticleStub: {
     contentGroupingHeader: {
       text: string / optional
     },
     articleStubs: [
       {
       link: {
         title:         
           string / optional
         href:         
           string / optional
         text:          
           string / optional
       },
       image {
         alt: 
           string / required
         src: 
           string (url) / required
         height: 
           string / required
         width: 
           string / required
       },
       headingLevel: 
         string / required,
       video: 
         string / optional
       related: 
         string / optional
       small: 
         string / optional
       categoryPage: {
         headingLevel: 
           string / optional
         heading: {
           level: 
             integer / required
           text: 
              string / optional
           class: 
              string / optional
         }
       }     
    },
    subcategoryHero: {
      link: {
        title: 
          type: string / required
        href: 
          type: string (url) / required 
        text: 
          type: string / required      
        target: 
          type: string / required ("self")
      }
      subheading: 
        type: string / optional    
      image: {
        alt: 
          type: string / required
        src: 
          type: string (url) / required 
        height: 
          type: string / required ("100%")
        width: 
          type: string / required ("100%")    
      }
      metadata: {
        date: 
          type: string / optional    
        readtime: 
          type: string / optional    
      }    
    },
    subcategoryIndex: {
      searchField: {
        label: 
          text / required ("Search")
        id: 
          text / required ("ama__search__input")
        name: 
          text / required
        placeholder: 
          text / required ("Search Subcategory name")
        helpText: 
          text / optional
      },
      displaySwitchMenu:
        terms: [
          {
            text: 
              type: string / required
          },
          // add more terms here
        ]
      }
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
