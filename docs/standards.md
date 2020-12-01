# SG2 Standards

Since SG2 is a living design library that is home to reusable patterns, it's important for all contributing developers to attempt to create patterns the same way.

Any new work contributed into SG2 must meet the following standards:

## Workflow standards
### Encapsulating work
- **Only work on what's in your assigned ticket**.
- If you find that your ticket requires functionality/styling/etc. that is defined in a different ticket, either coordinate with the developer to whom that ticket's assigned, or switch to working on the ticket if unassigned - _only work on the stuff in your assigned JIRA ticket_.
    - If the ticket is **not** assigned to you but you feel you may need to work on it (or need code from it or whatever) reach out to the developer and/or PM to notify them of the potential conflict.
    - If you find that you need to work on work assigned to someone else:
      1. Talk to the currently assigned developer to ensure they are aware of your conflict and you are aware of the status of the work
      1. Confirm with the lead or PM that you have discussed together and have decided to take over the work.
      1. Assign the ticket to yourself
      1. Leave a comment on the ticket explaining why you have taken over the assignment
      1. Begin work

### Pull or Fetch?
In order to get upstream changes that have been merged, you can use `git fetch` followed by `git merge`, or alternatively use `git pull`. A fetch allows you to see what has changed, and then to decide if you would like to add those changes in your branch with merge. Use `git fetch` then `git merge origin/branchname` to bring the branch up to date.

Using `git pull` is `git fetch` followed immediately by `git merge FETCH_HEAD` in one step. In some situations, `git pull` may be suitable.

### Merge or Rebase?
In order to maintain the traceability of our branches we **always** merge and **never** rebase branches. This helps keep information about the historical existence of a feature branch and groups together all commits part of the feature. This requires that branches are merged through a pull request for quality and code review.

#### Avoid Code Conflicts
- Avoid rebasing branches.
- Avoid branching off of unmerged branches. Instead, branch off of `develop` whenever possible.
- If you notice a bug that falls outside of the scope of your assigned JIRA ticket, log it as a new JIRA ticket and notify the lead and PM of the new bug.
    - Communicate to the PM that you have created a ticket with the explanation of the bug. Please also communicate to them that it may block another ticket (with the ticket information).
    - If it is blocking you, switch focus to that ticket or find another way for that ticket to get done (reach out to the team or PMs to see if anyone has bandwidth to work on that ticket) - _but avoid lumping in the fix with your current PR_.
* If you create a branch you own it; no one else should modify it without your permission.
* If you wish to make a change to someone else's PR, either suggest it in a comment or ask the PR owner to meet with you for a pair programming session/discussion. Talking first can solve the problem sooner and increase knowledge sharing which is important to our team.

### Team communication
- Before working on any unassigned work please refer to a project manager and also review the current backlog for additional work.
- If you find you are blocked on work, add the `blocked` label. Also, comment in the PR and in the JIRA ticket. Blocked tickets must be linked accordingly in JIRA (if they are not, add the link).
    - Notify the team of your blocker during the next scrum.
- Announce in Slack when you begin working on or reviewing a PR, in addition to adding the `ready for review` or `in review` label (respectively).
- If the Pull Request does not meet our standards please refrain from reviewing and instead add the `review standards` label and note that in a PM-friendly slack channel (#dtt-web-dev or #project-styleguide).
    - Please also provide links to written documentation of standards and ask that the person review them and consult you if there are any questions.
    - Ask the assignee to notify you when they're done.
    - Move the JIRA ticket from `Development Complete` to `In Progress`
        _This is the responsibility of the **reviewer**. The reviewer must also comment on the ticket with **why** they are moving it back._

### Guidelines for Contributing
- Follow the [Pull Request Template](../.github/PULL_REQUEST_TEMPLATE.md)
- Review the [Guidelines for Contributing](../.github/CONTRIBUTING.md)
- Leave clear and descriptive testing instructions; examples,
    - [Good PR](https://github.com/american-medical-association/AMA-Corporate-site/pull/1262)
- Run visual regression tests locally to ensure that the work does not introduce new bugs.

## PatternLab Standards
### How patterns are organized:
- Patterns must be listed alphabetically in the pattern list. No numbers (e.g. `atoms/forms/text-input` instead of `00-atoms/10-forms/05-text`).
- The directory structure inside each pattern type (atoms, etc) must be flat; patterns must _not_ go inside grouped subfolders
  - Bad: Atoms > Text > Heading
  - Good: Atoms > Heading
  - Good: Atoms > Link
- SCSS files must be in the `styleguide/source/assets/scss` directory. They should be in partials according to why type of atomic component that they are.
- JS files must be in the `styleguide/source/assets/js` directory. They should be named according to the pattern that they accompany.
- Twig and Markdown files must be in the `styleguide/source/_patterns` directory. They must be in the directory according to why type of atomic component that they are. They should not be nested further than their atomic identifier.

#### Atoms
An atom should be the basic HTML elements. They can sometimes be more than one element (e.g. an unordered list). Sometimes there may be multiple atoms of the same HTML element with different classes.

#### Molecules
A molecule should include most of the markup and pull in atoms as necessary. Not every element in a molecule needs to be an atom; examples,
    - [Article Stub](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=molecules-article-stub)

#### Organisms
An organism should be a section of a page, therefore if a component is visually a section of the page. Organisms should be very little markup, it should be mostly wrappers around molecules or atoms; examples,
    - [Masthead](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=organisms-masthead)

#### Templates
Templates will be used for the general layouts (e.g. regions of the page) but not molecules. These pages exist to show what a page layout will look like but does not include any patterns for any specific pages; examples,
    - [Three column](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=templates-three-column)

#### Pages
Pages are examples of a what a page (generally a node, although sometimes a view) will look like in the website. These are the fully prototyped version of a page that includes patterns that would be used on that page; examples,
    - [News Article](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=pages-news)

#### Base
Base patterns are elements that are global and useful to the styleguide process but will not be directly ingested as a component; examples
    - [Color palette](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=base-colors)
    - [Placeholder](https://americanmedicalassociation.github.io/ama-style-guide-2/?p=base-placeholder)

### How to classify/name patterns
All pattern class names must follow standard [BEM practices](http://getbem.com/naming/) and be prefixed according to their theme (e.g. `ama__`).

Below is an example of how a breadcrumb organism for the default AMA theme may appear:
```html
<section class="ama__breadcrumbs ">
  <nav class="ama__breadcrumbs__container">
    <ol class="ama__breadcrumbs__items">
      <li class="ama__breadcrumbs__item"><a href="#">Link 1</a></li>
      <li class="ama__breadcrumbs__item"><a href="#">Link 2</a></li>
    </ol>
  </nav>
</section>
```
This pattern shows that `breadcrumbs` is a block of the `ama` theme and has the elements `container`, `items` and `item`.

### Pattern scalability
It's important for patterns to be easily reusable.
- Patterns must use JSON data from an associated `.json` file for their content:
  - Bad: `<a href="link.html">I am a link</a>`
  - Good: `<a href="{{ link.url }}">{{ link.text }}</a>`

- Patterns must be named something that won't exclude them from being used somewhere else in the future.*
  - Bad: an atom named `login-form-password-field.twig`
  - Good: an atom named `password-field.twig`

  \* unless they are **not** intended to be reusable. This rule may apply more to smaller patterns (i.e. atoms).

- Patterns must be coded to accept CSS classes or other HTML attributes from the patterns that include them.
  - Bad: `<div class="foo">{{ div.content }}</div>`
  - Good: `<div class="foo {{ div.class }}">{{ div.content }}</div>`

- Patterns must not include hard-coded styles or classes that may not apply to all instances in which the pattern is used.
  - Bad: `<div class="dropdown__list-item dropdown__list-item-foo dropdown__list-item-bar"></div>`
  - Good: `<div class="dropdown__list-item {{class}}"></div>`

### Pattern consistency
- Patterns must generally adhere to the existing name/organization schema. File names, pattern organization within PatternLab, and code should appear in kind with the existing patterns in the library.

   - Bad: `<DIV><A HREF="{{ url }}"></A></ BR>`
  - Good: `<div><a href="{{ url }}"</a><br>`

### Pattern namespacing
Pattern code must comply with the BEM naming system.

  - Bad: `differentlyCapitalized.twig`  
  - Bad: `named-with-a-number2.twig`
  - Bad: `named_with_underscores.twig`
  - Bad: `atoms/our-special-project/header.twig`
  - Bad:
  ```twig
    <div class="header">
      <a href="{{ url }}" class="fancy-link">{{ content }}</a>
      <img src="{{ src }} class="fun-image">
    </div>
  ```
   - Good:
   ```twig
    <div class="header">
      <a href="{{ url }}" class="header__link--fancy">{{ content }}</a>
      <img src="{{ src }} class="header__image--fun">
    </div>
  ```
### Pattern definition in `.md`
PatternLab users can view information about each pattern using the "Pattern Info" feature, whose content is supplied by data provided in a `.md` file.

All `pattern.md` files must include the following elements:
* Description that details what the pattern is, what is included and how it is intended to be used.
* A list of variants (if applicable)
* The JIRA tickets (linked) that apply to that patterns
* An outline of the json data model that includes the variables and whether they are required or optional.

[Good pattern.md Example](ama-style-guide-2/styleguide/source/_patterns/02-molecules/article-stub.md)

## Checklist:
- [ ] classification: are the elements classified into patterns in a way that makes intuitive sense and aligns with our classification system? (See "PatternLab Organization" above.)
- [ ] scalability: is the pattern easily reusable if that is its intent, or is it too specific to be easily included elsewhere? Does the base pattern scale easily with the use of variants?
- [ ] consistency: is the pattern consistently classified, coded, and conceptualized with the existing patterns?
- [ ] namespacing: does the pattern code comply with the BEM naming system? Is it intuitively clear by looking at the markup what each element's purpose is?
- [ ] name descriptiveness: is the pattern named something that is, at a glance, recognizable? Is there an "official" (from the requirements) name for the pattern that must be used instead?
- [ ] content descriptiveness: is the placeholder content descriptive of the type of content that will go there (e.g. "helper text for input above" for helper text)?
- [ ] cohesion: was the pattern introduced to address an explicit feature, bug, or change request? Has the work followed the existing process for adding new work?
- [ ] definition: is the pattern fully documented in its `.md` file? Is it obvious from looking at the pattern what its purpose is and how it should be used?

### Rules for naming:
- Pattern names must be vague human-readable descriptions of the component. Generally, we should attempt to use the same plain language that the business would use when that language is not used in a different way elsewhere. (e.g. Don't say refer to a component as a "module" because that word has other meaning in the scope of these projects.)
- Good: `ama__breadcrumbs`
- Bad: `list--ordered--wayfinder`

### Naming pattern variants
- Variants of patterns with the same data model must be pseudo patterns. Add docs from code_conventions.md here.
- Variants must be named “[base item] as [variant]” (e.g. "Header as overlay" or "Button as Secondary Color"). Alternatively, sometimes the pattern variant will make more sense using "with" instead of "as"; example "Promo with CTA" instead of "Promo as with CTA".
- Icons must have "icon" in the pattern name.

### Documenting patterns
- Variants must have their own MD files that point to the main item
- All patterns must have the following info in .md: x, y, z
- base colors have variables printed
- Newly created or updated patterns include an updated screenshot for visual regression testing.
- Pattern names must be added to the [Glossary](https://issues.ama-assn.org:8446/confluence/display/DTD/Glossary)
- [PROBLEM] Pattern needs more useful presentation
- [PROBLEM] Pattern .md information is outdated

### Code standards
- [PROBLEM] Pattern needs DRYer code
- [PROBLEM] Pattern code is not correct/semantic/accessible/etc
- [PROBLEM] pattern code is missing 'alt' attributes
- All files include an empty line at the end of the file.

### Add patterns using Twig and JSON
- When possible we should be using and extending Twig blocks
- Even header number can be passed in `<h{{ header.level }} `, etc.
- [PROBLEM] Pattern Twig isn't integrated properly in d8
- [PROBLEM] pattern code needs longhand / Twig namespacing
- [PROBLEM] Pattern has hard coded or static data model
- [PROBLEM] pattern code should leverage json array and twig loops

### CSS
- Class names must follow standard BEM naming and be prefixed with `ama`
- [PROBLEM] Pattern needs more specific code (replace `.ama_theme` wrapper with `ama__` class prefix)
- Refrain from nesting things
- Utilize extends whenever possible
- Sass rules:
- A sass file for new patterns (?)
- Globbing is fine as long as source maps are still included

#### Color Naming
Upon changes to the color palette, color variables should be named according to the new color palette provided by the UX team (which should include names).

#### Units of Measurement
- Pixel dimensions are used for rules under five pixels
- Pixel dimensions are used for dimensions that are fixed.
- Font sizing is in `em`s

### Javascript
- Drupal requires that Javascript be encapsulated using `Drupal.behaviours`
- Refer to https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
- Use the Drupal community guidelines for Javascript https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards

***This a snippet from the Drupal JS coding standards doc***
- Indenting
  - All code MUST indent using two (2) space characters,
  - All code MUST NOT indent using tab characters,
  - All code MUST NOT end with trailing whitespace. 
  
- Semi-colons
  - JavaScript allows optional "semi-colon insertion". Drupal standards do not.
  - All statements (except for, function, if, switch, try, while) MUST be followed by a semi-colon (;),
  - Return values MUST start on the same line as the return keyword.
  
- CamelCasing
  - For variables that are not constants or constructors, multi-word variables and functions SHOULD be lowerCamelCased.
  - The first letter of each variable or function SHOULD be lowercase, and the first letter of subsequent words SHOULD be capitalized. There SHOULD NOT be underscores between the words.
  - In case a variable contains a jQuery object, the variable MUST start with a dollar sign ($):

## Community Guidelines

Development standards are the collective technical values and goals shared by all. Our hope and expectation is that everyone, no matter level of skill or experience, will feel welcome to own these standards. As owners, we hope you both challenge existing standards and establish new ones. Here are goals that we hope our community seeks to promote in our standards:

* **Integrity** - our standards should reflect the level of excellence we want to embody in practice.
* **Dialectic** - our conversations around standards should be a practice of dialectic rather than debate.
* **Efficiency** - our standards and conversations should be brief, factual, and to the point.
* **Completeness** - documentation of our standards should be concise, but comprehensive--explore and document edge cases.
* **Atomicity** - changes to standards should be the smallest set of coherent changes.
