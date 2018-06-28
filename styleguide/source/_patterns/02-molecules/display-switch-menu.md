### Description
Allows the user to control which content is displayed. See @molecules/display-switch-menu

Elements:
– All (required and default)
– Additional switch terms

UI: A user can activate the switch by clicking on either the All switch or one of the others. Once selected, a switch has purple #46166B fill with white text

User Story
As a user I can control which content within the body of the page I want to see.

### Variables
~~~
  displaySwitchMenu:
    terms: [
      {
        text: 
          type: string / required
      },
      // add more terms here
    ]
  }
~~~
