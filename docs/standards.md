## SG2 Standards Checklist

Since SG2 is a living design library that is home to reusable patterns, it's important for all contributing developers to attempt to create patterns the same way. 

Any new work merged into SG2 must meet the following standards:

### PatternLab Organization

#### How patterns are organized:
- Patterns should be listed alphabetically in the pattern list. No numbers (explain what this means).
- Talk about where SCSS and JS files should go (in a separate .scss directory?), as well as Twig and .md files (no subdirectories?). We may still need to make a decision about this.

##### Atoms
- An atom should be the basic HTML elements

##### Molecules
- A molecule should include most of the markup and pull in atoms as necessary

##### Organisms
- Organisms should be very little markup, it should be mostly wrappers around molecules

##### Templates
- Layouts should be used for templates but not molecules

##### Pages
Add a description here.

##### Base
Add a description of the "base" patterns here. Do they always get reused, or no?

Contains:
- "Colors" atom showing variables and base color palette.

##### Meta
Add a description of the "meta" patterns here. This section still needs to be added to SG2.

### How to classify/name patterns
- [PROBLEM] Pattern classification in PL is inaccurate
- [PROBLEM] Pattern has some conceptual flaw (e.g. is too specific to be easily reusable)
- [PROBLEM] Pattern isn't consistent with other patterns
- [PROBLEM] Pattern code does not comply with BEM naming structure
- [PROBLEM] Pattern name isn't descriptive of what the pattern is
- [PROBLEM] text in smaller patterns should be descriptive of the pattern ("helper text for input above" for helper text)
- [PROBLEM] Pattern was not created according to plan
- [PROBLEM] Pattern needs more information/definition

#### Rules for naming:
- Keep it vague. Add a good and bad example here.
- Keep it conversational/human readable. Add a good and bad example here.

#### Naming pattern variants 
- Variants of patterns with the same data model should be pseudopatterns
- Variants should be named “[base item] as [variant]” (e.g. "Header as overlay" or "Button as Secondary Color")
- Icons should have "icon" in the pattern name. 
- "Article stub" could be a good way to name article previews 
- ATTN folks working on the styleguide (AMA-style-guide) – a .json file needs to accompany an element, and 
- we don't need to number elements under top level folder, like 00-atoms/10-forms/<this stuff> – (twig/json) they're named things, not numbered things – at this point these things are actual THINGS. lol 

### Documenting patterns
- We will create a template for the markdown files for SG2
- Variants should have their own MD files that point to the main item
- All patterns should have the following info in .md: x, y, z
- base colors have variables printed
- [PROBLEM] Pattern needs more useful presentation
- [PROBLEM] Pattern .md information is outdated

### Code standards
- [PROBLEM] Pattern needs DRYer code
- [PROBLEM] Pattern code is not correct/semantic/accessible/etc
- [PROBLEM] pattern code is missing 'alt' attributes

#### Add patterns using Twig and JSON

- When possible we should be using Twig blocks
- Even header number can be passed in `<h{{ header.level }} `, etc.
- [PROBLEM] Pattern Twig isn't integrated properly in d8
- [PROBLEM] pattern code needs longhand / Twig namespacing
- [PROBLEM] Pattern has hard coded or static data model
- [PROBLEM] pattern code should leverage json array and twig loops

#### CSS
- Class names should follow standard BEM naming and be prefixed with `ama`
- [PROBLEM] Pattern needs more specific code (replace ama_theme wrapper with ama- class prefix)
- Refrain from nesting things
- Utilize extends whenever possible
- Sass rules:
- A sass file for new patterns (?)
- Units of measurement
- Color names
- Globbing is fine as long as source maps are still included

#### Javascript
- JS approach
- JS functionality should be attached to js-<element> class (? We should double check if we really want to do this)