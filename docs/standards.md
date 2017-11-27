### How to organize PatternLab
Add a meta section
Add a base section
Layouts should be used for templates but not molecules
An atom should be the basic HTML elements
A molecule should include most of the markup and pull in atoms as necessary
Organisms should be very little markup, it should be mostly wrappers around molecules
Patterns should be listed alphabetically in pattern list

### How to classify/name patterns
Rules for naming:
Keep it vague
Keep it conversational/human readable
Class names should follow standard BEM naming and be prefixed with `ama`
Variants should be named “[base item] as [variant]” (e.g.  Header as overlay)
- C. Pattern classification in PL is inaccurate
- D. Pattern has some conceptual flaw (e.g. is too specific to be easily reusable)
- E. Pattern isn't consistent with other patterns
- F. Pattern code doesn't comply with BEM naming structure
- G. Pattern name isn't descriptive of what the pattern is
naming - "Button as Secondary Color"
text in smaller patterns is descriptive of the pattern ("helper text for input above" for helper text)
- N. Pattern was not created according to plan
- O. Pattern needs more information/definition
Icons should have "icon" in the pattern name. 
"Article stub" could be a good way to name article previews 
ATTN folks working on the styleguide (AMA-style-guide) – a .json file needs to accompany an element, and 
we don't need to number elements under top level folder, like 00-atoms/10-forms/<this stuff> – (twig/json) they're named things, not numbered things – at this point these things are actual THINGS. lol 

### Documenting patterns
We will create a template for the markdown files for SG2
Variants should have their own MD files that point to the main item
All patterns should have the following info in .md: x, y, z
- I. Pattern needs more useful presentation
base colors have variables printed
- L. Pattern .md information is outdated

### Code standards
- J. Pattern needs DRYer code
- M. Pattern code is not correct/semantic/accessible/etc.
M1. pattern code is missing 'alt' attributes

#### Add patterns using Twig and JSON

When possible we should be using Twig blocks
Even header number can be passed in `<h{{ header.level }} `, etc.
- A. Pattern Twig isn't integrated properly in d8
A1. pattern code needs longhand / Twig namespacing
- H. Pattern has hard coded or static data model
J1. pattern code should leverage json array and twig loops

#### CSS
- K. Pattern needs more specific code (replace ama_theme wrapper with ama- class prefix)
Refrain from nesting things
Utilize extends whenever possible
Sass rules:
A sass file for new patterns (?)
Units of measurement
Color names
Globbing is fine as long as source maps are still included

#### Javascript
JS approach
JS functionality should be attached to js-<element> class (?)


### Graveyard
No numbers




