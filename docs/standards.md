## SG2 Standards Checklist

Since SG2 is a living design library that is home to reusable patterns, it's important for all contributing developers to attempt to create patterns the same way. 

Any new work merged into SG2 must meet the following standards:

### PatternLab Organization

#### How patterns are organized:
- Patterns should be listed alphabetically in the pattern list. No numbers (explain what this means): we don't need to number elements under top level folder, like 00-atoms/10-forms/<this stuff> – (twig/json) they're named things, not numbered things – at this point these things are actual THINGS. lol 
- Talk about where SCSS and JS files should go (in a separate .scss directory?), as well as Twig and .md files (no subdirectories?). We may still need to make a decision about this.

##### Atoms
- An atom should be the basic HTML elements.
- They can sometimes be more than one element (e.g. an unordered list).

##### Molecules
- A molecule should include most of the markup and pull in atoms as necessary.
- Not every element in a molecule needs to be an atom. (?)

##### Organisms
- Organisms should be very little markup, it should be mostly wrappers around molecules or atoms.

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
@todo - put checklist items here and give examples

#### Pattern classification
See "PatternLab Organization" above. 
@todo - figure out a good/bad example.

#### Pattern scalability
It's important for patterns to be easily reusable.
- Patterns should use JSON data from an associated `.json` file for their content:
  - Bad: `<a href="link.html">I am a link</a>`
  - Good: `<a href="{{ link.url }}">{{ link.text }}</a>`

- Patterns should be named something that won't exclude them from being used somewhere else in the future.*
  - Bad: an atom named `login-form-password-field.twig`
  - Good: an atom named `password-field.twig`
  
  \* unless they aren't intended to be reusable. This rule may apply more to smaller patterns (i.e. atoms). 

- Patterns should be coded to accept CSS classes or other HTML attributes from the patterns that include them.
  - Bad: `<div class="foo">{{ div.content }}</div>`
  - Good: `<div class="foo {{ div.class }}">{{ div.content }}</div>`

- Patterns should not include hard-coded styles or classes that may not apply to all instances in which the pattern is used.
  - Bad: `<div class="dropdown__list-item dropdown__list-item-foo dropdown__list-item-bar"></div>`
  - Good: `<div class="dropdown__list-item {{class}}"></div>`
  
#### Pattern consistency


### Checklist for new work:
- [ ] Pattern classification: are the elements classified into patterns in a way that makes intuitive sense and aligns with our classification system? (See "PatternLab Organization" above.)
- [ ] Pattern scalability: is the pattern easily reusable if that is its intent, or is it too specific to be easily included elsewhere? Does the base pattern scale easily with the use of variants?
- [ ] Pattern consistency: is the pattern consistently classified, coded, and conceptualized with the existing patterns?
- [ ] Pattern namespacing: does the pattern code comply with the BEM naming system? Is it intuitively clear by looking at the markup what each element's purpose is?
- [ ] Pattern name descriptiveness: is the pattern named something that is, at a glance, recognizable? Is there an "official" (from the requirements) name for the pattern that should be used instead?
- [ ] Pattern content descriptiveness: is the placeholder content descriptive of the type of content that will go there (e.g. "helper text for input above" for helper text)?
- [ ] Pattern cohesion: was the pattern introduced to address an explicit feature, bug, or change request? Has the work followed the existing process for adding new work?
- [ ] Pattern definition: is the pattern fully documented in its `.md` file? Is it obvious from looking at the pattern what its purpose is and how it should be used?

#### Rules for naming:
- Keep it vague. Add a good and bad example here.
- Keep it conversational/human readable. Add a good and bad example here.

#### Naming pattern variants 
- Variants of patterns with the same data model should be pseudopatterns. Add docs from code_conventions.md here.
- Variants should be named “[base item] as [variant]” (e.g. "Header as overlay" or "Button as Secondary Color")
- Icons should have "icon" in the pattern name. 
- ATTN folks working on the styleguide (AMA-style-guide) – a .json file needs to accompany an element, and 

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