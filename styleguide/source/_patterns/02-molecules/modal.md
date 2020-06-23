---
title: Modal
---

### Description
Display image with a modal link to view image in full-screen modal display.

[EWL-8015](https://issues.ama-assn.org/browse/EWL-8015)

### Variant options
none

### Use Case
Modal can be embedded into text area, with a clickable icon to trigger a modal
display.

### Variables
~~~~
  modalImages: {
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
  }
~~~~
