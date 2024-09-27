---
el: ".ama__personalized-account-info"
title: "Personalized Account Info"
---

Account info include name, membership info, and member card

[AWMEE-24](https://ama-it.atlassian.net/browse/AWMEE-24)
[AWMEE-25](https://ama-it.atlassian.net/browse/AWMEE-25)

### Variant options

* [TBD](?p=TBD)

### Variables

~~~
{
    "cardSource":  type: string / required,
    "account": {
        "name":  type: string / required,
        "specialty":  type: string / optional
    },
    "membership": {
        "status": type: string / optional ("Valued Member" "Non-Member" or "Non-Physician")
        "startYear": type: string / optional
    }
    
}
~~~
