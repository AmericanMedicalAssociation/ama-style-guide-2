---
el: ".ama__personalized-account-hub"
title: "Personalized Account Hub"
---

This block allows for users to see personalized content such as their name, member card, relevant links

[AWMEE-24](https://ama-it.atlassian.net/browse/AWMEE-24)

### Variant options

* [Main](?p=organisms-personalized-account-hub)

### Variables

~~~
{
    "card_url":  type: string / required,
    "account": {
        "name":  type: string / required,
        "specialty":  type: string / optional
    },
    "membership": {
        "status": type: string / optional ("Valued Member" "Non-Member" or "Non-Physician")
        "start_year": type: string / optional
    }
    
}
~~~
