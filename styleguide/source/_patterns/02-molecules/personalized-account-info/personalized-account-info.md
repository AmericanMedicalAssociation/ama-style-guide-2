---
el: ".ama__personalized-account-info"
title: "Personalized Account Info"
---

Account info include name, membership info, and member card

[AWMEE-24](https://ama-it.atlassian.net/browse/AWMEE-24)
[AWMEE-25](https://ama-it.atlassian.net/browse/AWMEE-25)

### Variant options

* [General](?p=molecules-personalized-account-info)
* [Member](?p=molecules-personalized-account-info-member)
* [Non-Member](?p=molecules-personalized-account-info-non-member)
* [Non-Physician](?p=molecules-personalized-account-info-non-physician)

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
